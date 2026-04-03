from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional, List

class PackageImageBase(BaseModel):
    image_url: str

class PackageImage(PackageImageBase):
    id: int
    package_id: int

    model_config = ConfigDict(from_attributes=True)

class PackageBase(BaseModel):
    title: str
    location: str
    price: float
    description: str
    itinerary: Optional[str] = None
    inclusions: Optional[str] = None
    exclusions: Optional[str] = None
    duration: Optional[str] = "5 Days / 4 Nights"
    group_size: Optional[str] = "Selectable"
    image: str
    status: Optional[bool] = True

class PackageCreate(PackageBase):
    gallery: Optional[List[str]] = []

class PackageUpdate(PackageBase):
    title: Optional[str] = None
    location: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    itinerary: Optional[str] = None
    inclusions: Optional[str] = None
    exclusions: Optional[str] = None
    duration: Optional[str] = None
    group_size: Optional[str] = None
    image: Optional[str] = None
    status: Optional[bool] = None
    gallery: Optional[List[str]] = None

class Package(PackageBase):
    id: int
    created_at: datetime
    gallery: List[PackageImage] = []

    model_config = ConfigDict(from_attributes=True)

class AdminUserBase(BaseModel):
    username: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class EnquiryBase(BaseModel):
    package_id: Optional[int] = None
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    status: Optional[str] = "New"

class EnquiryCreate(EnquiryBase):
    pass

class Enquiry(EnquiryBase):
    id: int
    created_at: datetime
    package: Optional[Package] = None

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
