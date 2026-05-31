from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .api import auth_router, resumes_router, jobs_router, analysis_router

# Create tables in sqlite if they don't exist (useful for quick local dev)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Resume Analyzer API",
    description="API for parsing, analyzing resumes, and matching to job descriptions.",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(resumes_router.router)
app.include_router(jobs_router.router)
app.include_router(analysis_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Resume Analyzer API"}
