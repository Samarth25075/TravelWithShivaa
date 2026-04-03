from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, func, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False, index=True)
    price = Column(Float, nullable=False, index=True)
    description = Column(Text, nullable=False)
    itinerary = Column(Text, nullable=True)
    inclusions = Column(Text, nullable=True)
    exclusions = Column(Text, nullable=True)
    duration = Column(String(100), nullable=True)
    group_size = Column(String(100), nullable=True)
    image = Column(String(255), nullable=False)
    status = Column(Boolean, default=True, index=True)
    created_at = Column(DateTime, default=func.now())

    # Relationship to multiple gallery images
    gallery = relationship("PackageImage", back_populates="package", cascade="all, delete-orphan", lazy="selectin")
    enquiries = relationship("Enquiry", back_populates="package", cascade="all, delete-orphan")

class PackageImage(Base):
    __tablename__ = "package_images"

    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("packages.id"))
    image_url = Column(String(255), nullable=False)
    
    package = relationship("Package", back_populates="gallery")

class Enquiry(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    package_id = Column(Integer, ForeignKey("packages.id"), nullable=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    subject = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(String(20), default="New") # New, Contacted, Completed
    created_at = Column(DateTime, default=func.now())

    package = relationship("Package", back_populates="enquiries")

class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
