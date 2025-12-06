import torch
import torch.nn as nn
import numpy as np

# ==================== FEATURE ENGINEERING ====================
def extract_features(code):
    if code is None: return np.zeros(20)
    s = str(code)
    return np.array([
        len(s), s.count('\n'), s.count('strcpy'), s.count('sprintf'), s.count('gets'),
        s.count('memcpy'), s.count('free'), s.count('malloc'), s.count('buffer'),
        s.count('overflow'), s.count('NULL'), s.count('== NULL'), 'system(' in s,
        'exec(' in s, 'popen(' in s, len(s.split()), s.count('char'), s.count('int'),
        s.count('void'), s.count('return')
    ], dtype=np.float32)

# ==================== MODEL ====================
class ZeroDayClassifier(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 128), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, 2)
        )
    def forward(self, x): return self.net(x)
