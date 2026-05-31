from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database
from .auth_router import get_current_user

router = APIRouter(prefix="/api/v1/jobs", tags=["jobs"])

@router.post("", response_model=schemas.JobDescriptionResponse)
def create_job(
    job: schemas.JobDescriptionCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    db_job = models.JobDescription(
        user_id=current_user.id,
        title=job.title,
        content=job.content,
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    return db_job
