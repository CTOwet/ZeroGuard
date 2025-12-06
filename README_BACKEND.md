# Zero-Day Vulnerability Scanner Backend

This backend uses FastAPI and PyTorch to predict zero-day vulnerabilities.

## Setup

The dependencies are installed in `backend/data/.venv`.

## Running the Server

From the project root directory (`/home/ctowet/Documents/Zero-Day Vulnerability`), run:

```bash
backend/data/.venv/bin/python -m uvicorn backend.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.
The documentation is at `http://localhost:8000/docs`.

## API Endpoints

- `POST /predict`: Accepts `{ "code": "string" }` and returns prediction.
- `GET /health`: Returns status.
