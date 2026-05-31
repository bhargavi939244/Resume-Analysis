from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database
from .auth_router import get_current_user
from ..utils.openai_service import analyze_resume_against_job

router = APIRouter(prefix="/api/v1/analyze", tags=["analysis"])

@router.get("", response_model=List[schemas.AnalysisResultResponse])
def list_analyses(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.AnalysisResult).join(models.Resume).filter(
        models.Resume.user_id == current_user.id
    ).all()

@router.post("", response_model=schemas.AnalysisResultResponse)
def trigger_analysis(
    resume_id: str,
    job_id: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Verify ownership
    resume = db.query(models.Resume).filter(models.Resume.id == resume_id, models.Resume.user_id == current_user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    job = db.query(models.JobDescription).filter(models.JobDescription.id == job_id, models.JobDescription.user_id == current_user.id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found")
        
    # Run analysis
    resume_text = resume.parsed_content.get("text", "")
    analysis_data = analyze_resume_against_job(resume_text, job.content)
    
    db_analysis = models.AnalysisResult(
        resume_id=resume.id,
        job_description_id=job.id,
        overall_score=analysis_data.get("overall_score", 0),
        skills_score=analysis_data.get("skills_score", 0),
        experience_score=analysis_data.get("experience_score", 0),
        missing_skills=analysis_data.get("missing_skills", []),
        suggestions=analysis_data.get("suggestions", [])
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return db_analysis

@router.get("/{analysis_id}", response_model=schemas.AnalysisResultResponse)
def get_analysis(
    analysis_id: str,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    analysis = db.query(models.AnalysisResult).join(models.Resume).filter(
        models.AnalysisResult.id == analysis_id,
        models.Resume.user_id == current_user.id
    ).first()
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
        
    return analysis
