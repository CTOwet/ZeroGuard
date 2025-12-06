import json
import pandas as pd
from pathlib import Path
import time
import traceback
import sys

def process_cve_files():
    # Setup paths
    # base_dir = Path.home() / 'Documents/Zero-Day Vulnerability/cve'
    # Adjusted for current environment
    base_dir = Path('/home/ctowet/Documents/data/cves')
    if not base_dir.exists():
        print(f"Error: Directory {base_dir} does not exist.")
        return

    print(f"Scanning files in {base_dir}...")
    
    # Lists to store data
    all_cves = []
    zero_day_candidates = []
    
    # Zero-day criteria
    target_cwes = {
        'CWE-787', 'CWE-125', 'CWE-119', 'CWE-20', 'CWE-89', 
        'CWE-78', 'CWE-22', 'CWE-416', 'CWE-476'
    }
    
    start_time = time.time()
    count = 0
    
    # Iterate through all JSON files
    try:
        files = list(base_dir.rglob('*.json'))
        total_files = len(files)
        print(f"Found {total_files} files. Starting processing...")
        
        for file_path in files:
            count += 1
            if count % 10000 == 0:
                elapsed = time.time() - start_time
                print(f"Processed {count}/{total_files} files ({elapsed:.2f}s)")
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Extract Basic Info
                cve_meta = data.get('cveMetadata', {})
                cve_id = cve_meta.get('cveId', 'UNKNOWN')
                date_published = cve_meta.get('datePublished', '')
                
                # Extract Containers
                cna = data.get('containers', {}).get('cna', {})
                
                # Description
                descriptions = cna.get('descriptions', [])
                desc_en = next((d.get('value', '') for d in descriptions if d.get('lang') == 'en'), '')
                if not desc_en and descriptions:
                    desc_en = descriptions[0].get('value', '')
                
                # CVSS Score
                cvss_score = None
                metrics = cna.get('metrics', [])
                for metric in metrics:
                    # Try to find CVSS v3.1, v3.0, or v2.0
                    for key in ['cvssV3_1', 'cvssV3_0', 'cvssV2_0']:
                        if key in metric:
                            score = metric[key].get('baseScore')
                            if score is not None:
                                cvss_score = float(score)
                                break
                    if cvss_score is not None:
                        break
                
                # CWE IDs
                cwe_ids = set()
                problem_types = cna.get('problemTypes', [])
                for pt in problem_types:
                    for desc in pt.get('descriptions', []):
                        cwe = desc.get('cweId')
                        if cwe:
                            cwe_ids.add(cwe)
                        # Fallback: check if description text contains CWE
                        text = desc.get('description', '')
                        if text.startswith('CWE-'):
                            cwe_ids.add(text.split()[0])
                
                # References (GitHub)
                github_links = []
                references = cna.get('references', [])
                for ref in references:
                    url = ref.get('url', '')
                    if 'github.com' in url:
                        github_links.append(url)
                
                # Affected Products
                affected = cna.get('affected', [])
                products = [p.get('product', 'UNKNOWN') for p in affected]
                
                # Prepare Row
                row = {
                    'cve_id': cve_id,
                    'date_published': date_published,
                    'description_en': desc_en,
                    'cvss_score': cvss_score if cvss_score is not None else '',
                    'cwe_ids': ';'.join(sorted(cwe_ids)),
                    'github_links': ';'.join(github_links),
                    'affected_products': ';'.join(products)
                }
                
                all_cves.append(row)
                
                # Filter for Zero-Day Candidates
                # 1. Year >= 2018
                year_valid = False
                if date_published:
                    try:
                        year = int(date_published[:4])
                        if year >= 2018:
                            year_valid = True
                    except:
                        pass
                
                # 2. Dangerous CWE
                has_dangerous_cwe = bool(cwe_ids & target_cwes)
                
                # 3. Has GitHub links
                has_github = bool(github_links)
                
                # 4. CVSS >= 5.0 (if exists)
                cvss_valid = True
                if cvss_score is not None and cvss_score < 5.0:
                    cvss_valid = False
                
                if year_valid and has_dangerous_cwe and has_github and cvss_valid:
                    zero_day_candidates.append(row)
                    
            except Exception as e:
                # Skip file on error
                continue

    except Exception as e:
        print(f"Critical Error: {e}")
        traceback.print_exc()
        return

    # Create DataFrames
    print("Creating DataFrames...")
    df_all = pd.DataFrame(all_cves)
    df_zero_day = pd.DataFrame(zero_day_candidates)
    
    # Save to CSV
    print("Saving CSV files...")
    output_dir = Path('/home/ctowet/Documents/data/datasets')
    output_dir.mkdir(exist_ok=True)
    
    output_all = output_dir / 'cve_full_clean.csv'
    output_zero = output_dir / 'zero_day_candidates.csv'
    
    df_all.to_csv(output_all, index=False)
    df_zero_day.to_csv(output_zero, index=False)
    
    print(f"Done!")
    print(f"Total CVEs processed: {len(df_all)}")
    print(f"Zero-Day Candidates found: {len(df_zero_day)}")
    print(f"Files saved to: {output_dir}")

if __name__ == "__main__":
    process_cve_files()
