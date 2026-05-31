import openai
import os
import json
import requests

# Setup API Keys from environment
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3") # Default to llama3 (or llama2, mistral, phi3, codellama)

openai.api_key = OPENAI_API_KEY

def is_ollama_available() -> bool:
    """Checks if a local Ollama instance is active on port 11434."""
    try:
        res = requests.get("http://localhost:11434", timeout=1)
        if res.status_code == 200:
            return True
    except Exception:
        pass
    return False

def parse_json_response(content: str) -> dict:
    """Helper to clean markdown wrapping and parse JSON output safely."""
    content = content.strip()
    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "")
    elif content.startswith("```"):
        content = content.replace("```", "")
    return json.loads(content.strip())

def analyze_locally(resume_text: str, job_text: str, error_message: str = "") -> dict:
    """Fallback offline local parser if no AI models are active."""
    common_keywords = [
        "python", "javascript", "typescript", "java", "c++", "ruby", "php", "go", "rust",
        "html", "css", "react", "angular", "vue", "node.js", "django", "flask", "spring",
        "sql", "postgres", "mongodb", "mysql", "docker", "kubernetes", "aws", "azure", "gcp",
        "git", "ci/cd", "linux", "agile", "scrum", "machine learning", "data science",
        "tailwind", "bootstrap", "system design", "rest api", "graphql", "devops",
        "software engineer", "frontend", "backend", "full stack"
    ]
    
    resume_lower = resume_text.lower()
    job_lower = job_text.lower()
    
    required_keywords = []
    for kw in common_keywords:
        if kw in job_lower:
            capitalized = kw.title() if kw not in ["ci/cd", "aws", "gcp", "sql", "html", "css", "rest api", "graphql", "api"] else kw.upper()
            if capitalized == "Node.Js":
                capitalized = "Node.js"
            required_keywords.append((kw, capitalized))
            
    if not required_keywords:
        return {
            "overall_score": 70.0,
            "skills_score": 75.0,
            "experience_score": 65.0,
            "missing_skills": ["Docker", "Kubernetes"],
            "suggestions": [
                "Ensure your experience bullet points include measurable results (e.g. 'reduced load time by 30%').",
                "Add more technical keywords to your job description to get a dynamic keywords match."
            ]
        }
        
    matched_skills = []
    missing_skills = []
    
    for kw, cap in required_keywords:
        if kw in resume_lower:
            matched_skills.append(cap)
        else:
            missing_skills.append(cap)
            
    total = len(required_keywords)
    matched_count = len(matched_skills)
    
    overall_score = round((matched_count / total) * 100, 1)
    skills_score = min(100.0, round(overall_score * 1.1, 1))
    experience_score = min(100.0, round(overall_score * 0.9, 1))
    
    # Log the fallback info silently on the server terminal console
    print(f"\n[AI PROVIDERS OFFLINE] Falling back to offline local parser. Status: {error_message or 'No keys configured'}\n")
    
    suggestions = []
    
    if missing_skills:
        suggestions.append(f"Add missing keywords to your resume: {', '.join(missing_skills[:4])}.")
      
    suggestions.extend([
        "Ensure your experience bullet points include measurable results (e.g. 'reduced load time by 30%' or 'increased engagement by 15%').",
        "Keep resume formatting clean; avoid placing critical details inside graphic text boxes, headers, or footers as ATS parsers might skip them.",
        "Tailor your profile summary to match the job's core technical focus and keywords.",
        "Check that your contact details (LinkedIn, GitHub, email) are clearly readable at the top of the resume."
    ])
    
    return {
        "overall_score": overall_score,
        "skills_score": skills_score,
        "experience_score": experience_score,
        "missing_skills": missing_skills,
        "suggestions": suggestions
    }

def analyze_resume_against_job(resume_text: str, job_text: str) -> dict:
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) and technical recruiter.
    Analyze the following resume against the job description.
    
    Job Description:
    {job_text}
    
    Resume:
    {resume_text}
    
    Provide a JSON response with the following keys exactly:
    - "overall_score": float between 0 and 100
    - "skills_score": float between 0 and 100
    - "experience_score": float between 0 and 100
    - "missing_skills": A list of strings of key skills missing from the resume
    - "suggestions": A list of strings with actionable advice to improve the resume
    
    Return ONLY valid JSON without markdown wrapping.
    """

    # --- Provider 1: OpenAI (If a valid key is provided) ---
    if OPENAI_API_KEY and OPENAI_API_KEY != "sk-..." and "YOUR_KEY" not in OPENAI_API_KEY:
        try:
            print("[PROVIDER SELECTED] Contacting OpenAI API...")
            client = openai.OpenAI(api_key=OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.2,
            )
            content = response.choices[0].message.content
            return parse_json_response(content)
        except Exception as e:
            print(f"[PROVIDER WARNING] OpenAI call failed: {e}. Trying next provider...")

    # --- Provider 2: Google Gemini Free Tier (If GEMINI_API_KEY is provided) ---
    if GEMINI_API_KEY and GEMINI_API_KEY != "YOUR_GEMINI_KEY":
        try:
            print("[PROVIDER SELECTED] Contacting Google Gemini API...")
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "contents": [{
                    "parts": [{"text": prompt}]
                }],
                "generationConfig": {
                    "responseMimeType": "application/json"
                }
            }
            res = requests.post(url, headers=headers, json=payload, timeout=10)
            if res.status_code == 200:
                data = res.json()
                content = data["candidates"][0]["content"]["parts"][0]["text"]
                return parse_json_response(content)
            else:
                print(f"[PROVIDER WARNING] Gemini API returned status {res.status_code}: {res.text}")
        except Exception as e:
            print(f"[PROVIDER WARNING] Gemini call failed: {e}. Trying next provider...")

    # --- Provider 3: Local Ollama (If local server is running) ---
    if is_ollama_available():
        try:
            print(f"[PROVIDER SELECTED] Contacting Local Ollama (Model: {OLLAMA_MODEL})...")
            url = "http://localhost:11434/api/chat"
            payload = {
                "model": OLLAMA_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "options": {"temperature": 0.2},
                "stream": False,
                "format": "json" # Ollama enforces structured JSON responses
            }
            res = requests.post(url, json=payload, timeout=30)
            if res.status_code == 200:
                content = res.json()["message"]["content"]
                return parse_json_response(content)
        except Exception as e:
            print(f"[PROVIDER WARNING] Ollama call failed: {e}. Falling back to offline...")

    # --- Fallback: Offline Local Keyword Matcher ---
    return analyze_locally(resume_text, job_text, "No active AI APIs or local models detected")
