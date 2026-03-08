from fastapi import FastAPI
from api.routes import router

app = FastAPI()

@app.get("/")
def root():
    return {"message": "AI Lead SaaS backend running"}

app.include_router(router)