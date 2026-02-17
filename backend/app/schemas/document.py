from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DocumentBase(BaseModel):
    filename: str

class DocumentCreate(DocumentBase):
    file_path: str
    owner_id: int

class Document(DocumentBase):
    id: int
    file_path: str
    uploaded_at: datetime
    owner_id: int

    class Config:
        from_attributes = True
