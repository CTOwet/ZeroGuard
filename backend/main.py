from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import pickle
import numpy as np
from pathlib import Path
from .model import ZeroDayClassifier, extract_features
from fastapi.middleware.cors import CORSMiddleware
import sys

# Add current directory to sys.path to ensure imports work
sys.path.append(str(Path(__file__).parent))

app = FastAPI(title="Zero-Day Scanner API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load resources
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
MODEL_PATH = DATA_DIR / "model_zero_day_final.pth"
SCALER_PATH = DATA_DIR / "scaler_final.pkl"

model = None
scaler = None

def load_resources():
    global model, scaler
    try:
        print(f"Loading resources from {DATA_DIR}...")
        if not SCALER_PATH.exists():
            print(f"Scaler not found at {SCALER_PATH}")
            return
        if not MODEL_PATH.exists():
            print(f"Model not found at {MODEL_PATH}")
            return

        # Load Scaler
        with open(SCALER_PATH, 'rb') as f:
            scaler = pickle.load(f)
        
        # Load Model
        # Input dim is 20 based on extract_features
        input_dim = 20
        model = ZeroDayClassifier(input_dim)
        model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
        model.eval()
        print("Model and Scaler loaded successfully.")
    except Exception as e:
        print(f"Error loading resources: {e}")
        import traceback
        traceback.print_exc()

# Load on startup
load_resources()

class CodeRequest(BaseModel):
    code: str

@app.post("/predict")
async def predict(request: CodeRequest):
    if not model or not scaler:
        # Try loading again if failed previously
        load_resources()
        if not model or not scaler:
            raise HTTPException(status_code=500, detail="Model or Scaler not available")
    
    try:
        # Extract features
        features = extract_features(request.code)
        
        # Reshape for scaler (1, 20)
        features = features.reshape(1, -1)
        
        # Scale
        features_scaled = scaler.transform(features)
        
        # Convert to tensor
        features_tensor = torch.tensor(features_scaled, dtype=torch.float32)
        
        # Predict
        with torch.no_grad():
            outputs = model(features_tensor)
            probs = torch.nn.functional.softmax(outputs, dim=1)
            confidence_safe = probs[0][0].item()
            confidence_vuln = probs[0][1].item()
            
            prediction = torch.argmax(probs, dim=1).item()
            
        result = {
            "is_vulnerable": bool(prediction == 1),
            "confidence": confidence_vuln if prediction == 1 else confidence_safe,
            "probabilities": {
                "safe": confidence_safe,
                "vulnerable": confidence_vuln
            },
            "status": "POTENTIAL ZERO-DAY" if prediction == 1 else "SAFE"
        }
        return result
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {
        "status": "ok", 
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }
