from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from datetime import datetime
from typing import Optional, List, Annotated, Union

# Helper to handle MongoDB ObjectId as a string
PyObjectId = Annotated[str, BeforeValidator(str)]

class PackageImageBase(BaseModel):
    image_url: str

class PackageImage(PackageImageBase):
    id: Union[int, PyObjectId]
    package_id: Union[int, PyObjectId]

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

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
    id: Union[int, PyObjectId] = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    gallery: List[PackageImage] = []

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        json_encoders={datetime: lambda v: v.isoformat()}
    )

class AdminUserBase(BaseModel):
    username: str

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUser(AdminUserBase):
    id: Union[int, PyObjectId] = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class EnquiryBase(BaseModel):
    package_id: Optional[Union[int, PyObjectId]] = None
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    status: Optional[str] = "New"

class EnquiryCreate(EnquiryBase):
    pass

class Enquiry(EnquiryBase):
    id: Union[int, PyObjectId] = Field(alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    package: Optional[Package] = None

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
