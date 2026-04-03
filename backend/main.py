from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, func
from typing import List
import os
import shutil
from pydantic import BaseModel

# Local imports
import models, schemas, database
from database import get_db, engine
from passlib.context import CryptContext
import re
import uuid

# Auth setup - Using pbkdf2_sha256 for better compatibility on Render
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

app = FastAPI(title="Shiv Travel (PostgreSQL) API")

@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Shiv Travel API is running!"}

# Simple Auth Schema
class LoginRequest(BaseModel):
    username: str
    password: str

# Allow CORS for React frontend
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    ALLOWED_ORIGIN,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to create tables if they don't exist
@app.on_event("startup")
async def startup():
    print(f"🚀 [STARTUP] Initializing database...")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(models.Base.metadata.create_all)
        print("✅ [STARTUP] Database tables verified/created.")
    except Exception as e:
        print(f"❌ [STARTUP] ERROR creating tables: {e}")


# Admin Login Route
@app.post("/api/admin/login")
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.AdminUser).where(models.AdminUser.username == request.username))
    admin = result.scalar_one_or_none()
    
    if not admin or not verify_password(request.password, admin.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
        
    return {"status": "success", "token": "shiv_travel_token_secure_" + admin.username}

# Ensure uploads directory exists and is mounted
UPLOAD_DIRECTORY = "../uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

app.mount("/api/uploads", StaticFiles(directory=UPLOAD_DIRECTORY), name="uploads")

# Routes for Packages

@app.get("/api/packages", response_model=List[schemas.Package])
async def get_packages(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package).where(models.Package.status == True))
    return result.scalars().all()

@app.get("/api/packages/featured", response_model=List[schemas.Package])
async def get_featured_packages(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package).where(models.Package.status == True).limit(3))
    return result.scalars().all()

@app.get("/api/packages/{package_id}", response_model=schemas.Package)
async def get_package(package_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package).where(models.Package.id == package_id))
    package = result.scalar_one_or_none()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return package

# Enquiry Routes
@app.post("/api/enquiries", response_model=schemas.Enquiry)
async def create_enquiry(enquiry: schemas.EnquiryCreate, db: AsyncSession = Depends(get_db)):
    new_enquiry = models.Enquiry(**enquiry.dict())
    db.add(new_enquiry)
    await db.commit()
    await db.refresh(new_enquiry)
    return new_enquiry

# Admin Package Management
@app.get("/api/admin/packages", response_model=List[schemas.Package])
async def admin_get_all_packages(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package))
    return result.scalars().unique().all()

@app.post("/api/admin/packages", response_model=schemas.Package)
async def create_package(package: schemas.PackageCreate, db: AsyncSession = Depends(get_db)):
    # Extract gallery separate from the rest of the package data
    package_data = package.dict(exclude={"gallery"})
    gallery_images = package.gallery or []
    
    new_package = models.Package(**package_data)
    db.add(new_package)
    await db.flush() # Get the new_package.id
    
    # Add gallery images
    for img_url in gallery_images:
        db.add(models.PackageImage(package_id=new_package.id, image_url=img_url))
    
    await db.commit()
    await db.refresh(new_package)
    return new_package

@app.put("/api/admin/packages/{package_id}", response_model=schemas.Package)
async def update_package(package_id: int, package_update: schemas.PackageUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package).where(models.Package.id == package_id))
    db_package = result.scalar_one_or_none()
    if not db_package:
        raise HTTPException(status_code=404, detail="Package not found")

    # Update basic fields
    update_data = package_update.dict(exclude_unset=True, exclude={"gallery"})
    for key, value in update_data.items():
        setattr(db_package, key, value)
    
    # Update gallery if provided
    if package_update.gallery is not None:
        # Simple approach: clear old and add new
        from sqlalchemy import delete as sa_delete
        await db.execute(sa_delete(models.PackageImage).where(models.PackageImage.package_id == package_id))
        
        for img_url in package_update.gallery:
            db.add(models.PackageImage(package_id=package_id, image_url=img_url))
        
    await db.commit()
    await db.refresh(db_package)
    return db_package

@app.delete("/api/admin/packages/{package_id}")
async def delete_package(package_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Package).where(models.Package.id == package_id))
    db_package = result.scalar_one_or_none()
    if not db_package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    await db.delete(db_package)
    await db.commit()
    return {"message": "Package deleted successfully"}

# Admin Enquiry Management
@app.get("/api/admin/enquiries", response_model=List[schemas.Enquiry])
async def get_all_enquiries(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Enquiry).order_by(models.Enquiry.created_at.desc()))
    return result.scalars().all()

@app.put("/api/admin/enquiries/{enquiry_id}", response_model=schemas.Enquiry)
async def update_enquiry_status(enquiry_id: int, status: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Enquiry).where(models.Enquiry.id == enquiry_id))
    enquiry = result.scalar_one_or_none()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    
    enquiry.status = status
    await db.commit()
    await db.refresh(enquiry)
    return enquiry

@app.get("/api/admin/stats")
async def get_admin_stats(db: AsyncSession = Depends(get_db)):
    pkg_count = await db.execute(select(func.count(models.Package.id)))
    enquiry_count = await db.execute(select(func.count(models.Enquiry.id)))
    active_pkg_count = await db.execute(select(func.count(models.Package.id)).where(models.Package.status == True))
    
    return {
        "total_packages": pkg_count.scalar(),
        "total_enquiries": enquiry_count.scalar(),
        "active_packages": active_pkg_count.scalar(),
        "new_enquiries": (await db.execute(select(func.count(models.Enquiry.id)).where(models.Enquiry.status == "New"))).scalar()
    }

# Static file serving
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    # Sanitize filename
    filename = file.filename
    # Get extension
    name, ext = os.path.splitext(filename)
    # Keep only alphanumeric and underscores
    clean_name = re.sub(r'[^a-zA-Z0-9_-]', '_', name)
    # Ensure uniqueness
    safe_filename = f"{clean_name}_{uuid.uuid4().hex[:8]}{ext}"
    
    file_path = os.path.join(UPLOAD_DIRECTORY, safe_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"filename": safe_filename}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
