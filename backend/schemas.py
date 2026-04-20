from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from datetime import datetime
from typing import Optional, List, Annotated, Union

# Helper to handle MongoDB ObjectId as a string
PyObjectId = Annotated[str, BeforeValidator(str)]

class PackageImageBase(BaseModel):
    image_url: str

class PackageImage(PackageImageBase):
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    package_id: Optional[PyObjectId] = None

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
    is_popular: Optional[bool] = False
    type: Optional[str] = "Mountain"
    difficulty: Optional[str] = "Moderate"
    rating: Optional[float] = 4.8
    tag: Optional[str] = "Trending"

class PackageCreate(PackageBase):
    gallery: Optional[List[str]] = []

class PackageUpdate(BaseModel):
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
    is_popular: Optional[bool] = None
    type: Optional[str] = None
    difficulty: Optional[str] = None
    rating: Optional[float] = None
    tag: Optional[str] = None
    gallery: Optional[List[str]] = None

class Package(PackageBase):
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    gallery: List[PackageImageBase] = []

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
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class EnquiryBase(BaseModel):
    package_id: Optional[PyObjectId] = None
    name: str
    email: str
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    status: Optional[str] = "New"

class EnquiryCreate(EnquiryBase):
    pass

class Enquiry(EnquiryBase):
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    package: Optional[Package] = None

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- Blog Schemas ---
class BlogBase(BaseModel):
    title: str
    category: str
    description: str
    content: Optional[str] = None
    image: str
    date: str
    reading_time: str

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    image: Optional[str] = None
    date: Optional[str] = None
    reading_time: Optional[str] = None

class Blog(BlogBase):
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

# --- Group Trip Schemas ---
class GroupTripBase(BaseModel):
    title: str
    date: str
    seats: int
    price: float
    image: str
    status: str = "upcoming"
    group_size: str = "12-15"

class GroupTripCreate(GroupTripBase):
    pass

class GroupTripUpdate(BaseModel):
    title: Optional[str] = None
    date: Optional[str] = None
    seats: Optional[int] = None
    price: Optional[float] = None
    image: Optional[str] = None
    status: Optional[str] = None
    group_size: Optional[str] = None

class GroupTrip(GroupTripBase):
    id: Optional[PyObjectId] = Field(None, validation_alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

class SiteLogoUpdate(BaseModel):
    logo_url: str