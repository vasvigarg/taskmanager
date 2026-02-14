from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from ..models.models import PriorityEnum, StatusEnum

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.MEDIUM
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    due_date: Optional[datetime] = None

class TaskStatusUpdate(BaseModel):
    status: StatusEnum

class TaskResponse(TaskBase):
    id: int
    status: StatusEnum
    created_at: datetime
    updated_at: Optional[datetime] = None
    owner_id: int

    class Config:
        orm_mode = True
