from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
from ..database import get_db
from ..models import models
from ..schemas import task as task_schema
from ..utils.deps import get_current_user
from sqlalchemy import or_, and_

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("", response_model=task_schema.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task: task_schema.TaskCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    new_task = models.Task(**task.dict(), owner_id=current_user.id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.get("", response_model=List[task_schema.TaskResponse])
def get_tasks(
    skip: int = 0,
    limit: int = 10,
    status: Optional[models.StatusEnum] = None,
    priority: Optional[models.PriorityEnum] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    sort_by: str = Query("created_at", enum=["created_at", "due_date", "priority"]),
    order: str = Query("desc", enum=["asc", "desc"]),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    query = db.query(models.Task).filter(models.Task.owner_id == current_user.id, models.Task.is_deleted == False)
    
    if status:
        query = query.filter(models.Task.status == status)
    if priority:
        query = query.filter(models.Task.priority == priority)
    if start_date:
        query = query.filter(models.Task.created_at >= start_date)
    if end_date:
        query = query.filter(models.Task.created_at <= end_date)
    
    sort_attr = getattr(models.Task, sort_by)
    if order == "desc":
        query = query.order_by(sort_attr.desc())
    else:
        query = query.order_by(sort_attr.asc())
    
    return query.offset(skip).limit(limit).all()

@router.get("/{task_id}", response_model=task_schema.TaskResponse)
def get_task(
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    task = db.query(models.Task).filter(
        models.Task.id == task_id, 
        models.Task.owner_id == current_user.id,
        models.Task.is_deleted == False
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=task_schema.TaskResponse)
def update_task(
    task_id: int, 
    task_update: task_schema.TaskUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id, 
        models.Task.owner_id == current_user.id,
        models.Task.is_deleted == False
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_task, key, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task

@router.patch("/{task_id}/status", response_model=task_schema.TaskResponse)
def update_task_status(
    task_id: int, 
    status_update: task_schema.TaskStatusUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id, 
        models.Task.owner_id == current_user.id,
        models.Task.is_deleted == False
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.status = status_update.status
    db.commit()
    db.refresh(db_task)
    return db_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id, 
        models.Task.owner_id == current_user.id,
        models.Task.is_deleted == False
    ).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.is_deleted = True
    db.commit()
    return None
