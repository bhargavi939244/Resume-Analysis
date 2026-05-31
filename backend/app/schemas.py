from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ResumeBase(BaseModel):
    filename: str
    
class ResumeResponse(ResumeBase):
    id: str
    user_id: str
    file_url: str
    parsed_content: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class JobDescriptionCreate(BaseModel):
    title: str
    content: str
    
class JobDescriptionResponse(JobDescriptionCreate):
    id: str
    user_id: str
    extracted_keywords: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class AnalysisResultResponse(BaseModel):
    id: str
    resume_id: str
    job_description_id: str
    overall_score: float
    skills_score: float
    experience_score: float
    missing_skills: Optional[List[str]] = None
    suggestions: Optional[List[str]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    password: str

class GoogleLoginRequest(BaseModel):
    credential: str

