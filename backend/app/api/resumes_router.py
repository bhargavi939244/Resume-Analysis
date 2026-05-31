from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .. import models, schemas, database
from .auth_router import get_current_user
from ..utils.parser import parse_resume
import os

router = APIRouter(prefix="/api/v1/resumes", tags=["resumes"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=schemas.ResumeResponse)
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    if not (file.filename.lower().endswith(".pdf") or file.filename.lower().endswith(".docx")):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed.")
    
    file_bytes = await file.read()
    parsed_text = parse_resume(file_bytes, file.filename)
    
    file_path = os.path.join(UPLOAD_DIR, f"{current_user.id}_{file.filename}")
    with open(file_path, "wb") as f:
        f.write(file_bytes)
    
    db_resume = models.Resume(
        user_id=current_user.id,
        filename=file.filename,
        file_url=file_path,
        parsed_content={"text": parsed_text}
    )
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    
    return db_resume

@router.get("", response_model=list[schemas.ResumeResponse])
def get_resumes(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    resumes = db.query(models.Resume).filter(models.Resume.user_id == current_user.id).order_by(models.Resume.created_at.desc()).all()
    return resumes
