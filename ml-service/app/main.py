from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, predict
import os

app = FastAPI(title="WebGuard AI ML Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["Health"])
app.include_router(predict.router, tags=["Prediction"])

@app.on_event("startup")
async def startup_event():
    # Attempt to load model on startup to fail fast
    try:
        from app.api.predict import get_models
        get_models()
        print("Model loaded successfully")
    except Exception as e:
        print(f"Warning: Model could not be loaded at startup: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
