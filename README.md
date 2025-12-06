# 🛡️ ZeroGuard Scanner

<div align="center">

![ZeroGuard Scanner](https://img.shields.io/badge/ZeroGuard-Scanner-00ff9d?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-646cff?style=for-the-badge&logo=vite)

**Detect Zero-Day Before It's Too Late**

A stunning, AI-powered vulnerability scanner featuring glassmorphism and cyberpunk aesthetics.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Deployment](#-deployment)

</div>

---

## ✨ Features

### 🔍 **Advanced Vulnerability Detection**
- **10+ Vulnerability Patterns**: Buffer overflow, SQL injection, XSS, command injection, and more
- **CWE Database Integration**: Automatic CWE identification and classification
- **Multi-Language Support**: C, C++, Python, JavaScript, and SQL
- **Real-time Analysis**: Instant code scanning with intelligent pattern matching
- **Confidence Scoring**: AI-powered risk assessment with percentage confidence

### 🎨 **Premium Design**
- **Glassmorphism UI**: Frosted glass effects with backdrop blur
- **Cyberpunk Theme**: Neon cyan (#00ff9d) and pink (#ff006e) color scheme
- **Interactive Particles**: Dynamic floating particle background
- **Matrix Rain Animation**: Iconic digital rain effect during scanning
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions

### 📊 **Comprehensive Results**
- **Visual Status Badges**: SAFE / POTENTIAL ZERO-DAY / HIGH RISK indicators
- **Circular Progress**: Animated confidence score display
- **CWE Chips**: Tagged common weakness enumerations
- **Detailed Reports**: Vulnerability descriptions and severity levels
- **Smart Recommendations**: Actionable security advice
- **Export & Share**: Download JSON reports or share results

### 📱 **Fully Responsive**
- Mobile-first design
- Tablet and desktop optimized
- Adaptive layouts
- Touch-friendly controls

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ and npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone or navigate to the project directory
cd "/home/ctowet/Documents/Zero-Day Vulnerability"

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start at **http://localhost:5173**

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 💻 Usage

### 1. **Paste Your Code**
Copy and paste your C, C++, Python, or JavaScript code into the glassmorphic textarea.

### 2. **Start Scan**
Click the "Start Vulnerability Scan" button. Watch the Matrix rain animation as the AI analyzes your code.

### 3. **Review Results**
- **Status Badge**: See overall security status
- **Confidence Score**: Check AI confidence level (0-100%)
- **CWE Tags**: Identified common weakness enumerations
- **Vulnerabilities**: Detailed list with severity levels
- **Recommendations**: Security improvement suggestions

### 4. **Export or Share**
- Click the **Share** icon to share results
- Click the **Download** icon to export JSON report

### 5. **View History**
Click the floating history button (bottom-right) to view past scans.

---

## 🛠️ Tech Stack

### Core
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Vite](https://vitejs.dev/)** - Build tool & dev server

### Styling
- **[Tailwind CSS v3](https://tailwindcss.com/)** - Utility-first CSS
- **Custom Fonts**: Orbitron, Rajdhani, Inter (Google Fonts)
- **Glassmorphism**: Backdrop blur effects
- **Neon Gradients**: Custom color system

### Animations
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **Canvas API**: Matrix rain effect
- **CSS Animations**: Glow effects, floating elements

### Icons & Particles
- **[Lucide React](https://lucide.dev/)** - Modern icon set
- **[@tsparticles/react](https://particles.js.org/)** - Interactive particles background

### Utilities
- **clsx** - Conditional class names
- **tailwind-merge** - Tailwind class merging

---

## 📦 Project Structure

```
/home/ctowet/Documents/Zero-Day Vulnerability/
├── src/
│   ├── components/
│   │   ├── background/
│   │   │   └── ParticlesBackground.tsx    # Floating particles
│   │   ├── ui/
│   │   │   ├── GlassCard.tsx              # Reusable glass container
│   │   │   ├── NeonButton.tsx             # Neon glow button
│   │   │   ├── ProgressCircle.tsx         # Circular confidence meter
│   │   │   ├── StatusBadge.tsx            # Risk status indicator
│   │   │   └── CWEChip.tsx                # CWE tag component
│   │   ├── scanner/
│   │   │   ├── CodeInput.tsx              # Code textarea
│   │   │   ├── ScanButton.tsx             # Scan trigger button
│   │   │   ├── MatrixRain.tsx             # Matrix animation
│   │   │   └── ResultsCard.tsx            # Results display
│   │   ├── layout/
│   │   │   ├── Header.tsx                 # App header
│   │   │   ├── Footer.tsx                 # Footer with credits
│   │   │   └── ScanHistory.tsx            # Sidebar history
│   │   └── Hero.tsx                       # Landing hero section
│   ├── utils/
│   │   ├── scanEngine.ts                  # Vulnerability detection logic
│   │   └── cn.ts                          # Class name utility
│   ├── types/
│   │   └── index.ts                       # TypeScript definitions
│   ├── App.tsx                            # Main application
│   ├── main.tsx                           # Entry point
│   └── index.css                          # Global styles
├── public/                                # Static assets
├── index.html                             # HTML template
├── tailwind.config.js                     # Tailwind configuration
├── vite.config.ts                         # Vite configuration
├── package.json                           # Dependencies
└── README.md                              # This file
```

---

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the [Vercel Dashboard](https://vercel.com/new):
1. Import your Git repository
2. Framework preset: **Vite**
3. Deploy!

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
npx netlify-cli deploy --prod --dir=dist
```

Or use [Netlify Drop](https://app.netlify.com/drop):
1. Build: `npm run build`
2. Drag & drop the `dist` folder

---

## 🎓 Academic Information

**Powered by Neural Network**  
**Teknik Informatika UNSIQ 2026**

Created for educational purposes to demonstrate:
- Modern web development practices
- Security vulnerability awareness
- Advanced UI/UX design principles
- Full-stack application architecture

---

## ⚠️ Disclaimer

This is a **demonstration/educational tool** with simulated vulnerability detection. The scan engine uses pattern matching and does not perform actual deep security analysis. For production security auditing, use professional tools like:

- [Snyk](https://snyk.io/)
- [SonarQube](https://www.sonarqube.org/)
- [Checkmarx](https://checkmarx.com/)
- [Veracode](https://www.veracode.com/)

---

## 📄 License

Created for academic purposes. Free to use for educational demonstrations.

---

## 🤝 Contributing

This is an academic project, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Enhance the design

---

## 🌟 Showcase

Perfect for:
- **University presentations** and thesis defense
- **Security awareness** training
- **Web development** portfolio
- **UI/UX design** demonstrations

---

<div align="center">

**Made with 💚 for cybersecurity education.**

[⬆ Back to Top](#️-zeroguard-scanner)

</div>
