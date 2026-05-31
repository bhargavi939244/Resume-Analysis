# AI Resume Analyzer and Job Matcher

A production-ready full-stack application that helps users optimize their resumes for Applicant Tracking Systems (ATS) by intelligently matching them against job descriptions.

## Features
- **Upload CVs**: Parse PDF and DOCX formats automatically.
- **AI Matching**: Connects with OpenAI to extract meaningful semantic value.
- **ATS Score Breakdown**: Visualize your skills gap vs. job needs.
- **Actionable AI Feedback**: Get direct suggestions to rewrite bullets and add keywords.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Recharts
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL (or local SQLite fallback)
- **NLP & Files**: OpenAI API, pdfplumber, python-docx
- **Auth**: JWT-based stateless authentication

## Running Locally

### Backend Setup
```sh
cd backend
pip install -r requirements.txt
# Set API Key for live AI responses (options):
# Option A: OpenAI Key
export OPENAI_API_KEY="sk-..."

# Option B: Google Gemini Key (Free Tier)
export GEMINI_API_KEY="your-gemini-key"

# Option C: Local Ollama Model (100% Free Offline)
# 1. Download Ollama from ollama.com and run it
# 2. Pull your model: ollama run llama3
# 3. Optional: Set OLLAMA_MODEL environment variable (defaults to llama3)
export OLLAMA_MODEL="llama3"

uvicorn app.main:app --reload
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## Deployment
This project is configured for deployment using GitHub. 
* See `.github/workflows/main.yml` for the CI pipeline.
* Deploy the frontend directly to Vercel by linking the `frontend/` directory.
* Deploy the backend to Render using a standard Python web service pointing to `backend/app/main.py` via gunicorn.
