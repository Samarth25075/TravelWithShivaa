from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, func
from typing import List, Union
import os
import shutil
from pydantic import BaseModel
from datetime import datetime

# Local imports
import models, schemas, database
from database import get_db, get_mongo_db, engine, app_env
from mongodb_utils import fix_id, fix_ids, to_object_id
from passlib.context import CryptContext
import re
import uuid

# Auth setup
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

app = FastAPI(title="Shiv Travel (Multi-DB) API")

@app.get("/")
async def health_check():
    return {"status": "ok", "message": f"Shiv Travel API is running in {app_env} mode!"}

# Simple Auth Schema
class LoginRequest(BaseModel):
    username: str
    password: str

# Allow CORS
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

# Startup event
@app.on_event("startup")
async def startup():
    if app_env == "production":
        print(f"🚀 [STARTUP] Running in PRODUCTION mode with MongoDB")
    else:
        print(f"🚀 [STARTUP] Initializing Local SQL database...")
        try:
            if engine:
                async with engine.begin() as conn:
                    await conn.run_sync(models.Base.metadata.create_all)
                print("✅ [STARTUP] SQL Database tables verified/created.")
        except Exception as e:
            print(f"❌ [STARTUP] SQL Error: {e}")

# --- Admin Login Route ---
@app.post("/api/admin/login")
async def login(request: LoginRequest, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    admin = None
    if app_env == "production" and db_mongo is not None:
        admin = await db_mongo["admin_users"].find_one({"username": request.username})
    else:
        # Use SQL for local
        result = await db_sql.execute(select(models.AdminUser).where(models.AdminUser.username == request.username))
        admin = result.scalar_one_or_none()
        if admin:
            # Convert model to dict for consistent handling
            admin = {"username": admin.username, "password": admin.password}
    
    if not admin or not verify_password(request.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid username or password")
        
    return {"status": "success", "token": "shiv_travel_token_secure_" + admin["username"]}

# Ensure uploads directory exists
UPLOAD_DIRECTORY = "../uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

app.mount("/api/uploads", StaticFiles(directory=UPLOAD_DIRECTORY), name="uploads")

# --- Routes for Packages ---

@app.get("/api/packages", response_model=List[schemas.Package])
async def get_packages(db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        packages = await db_mongo["packages"].find({"status": True}).to_list(None)
        return fix_ids(packages)
    else:
        result = await db_sql.execute(select(models.Package).where(models.Package.status == True))
        return result.scalars().all()

@app.get("/api/packages/featured", response_model=List[schemas.Package])
async def get_featured_packages(db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        packages = await db_mongo["packages"].find({"status": True}).limit(3).to_list(None)
        return fix_ids(packages)
    else:
        result = await db_sql.execute(select(models.Package).where(models.Package.status == True).limit(3))
        return result.scalars().all()

@app.get("/api/packages/{package_id}", response_model=schemas.Package)
async def get_package(package_id: str, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        package = await db_mongo["packages"].find_one({"_id": to_object_id(package_id)})
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")
        return fix_id(package)
    else:
        # SQL handles integer IDs
        try:
            int_id = int(package_id)
            result = await db_sql.execute(select(models.Package).where(models.Package.id == int_id))
            package = result.scalar_one_or_none()
        except:
            package = None
            
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")
        return package

# Enquiry Routes
@app.post("/api/enquiries", response_model=schemas.Enquiry)
async def create_enquiry(enquiry: schemas.EnquiryCreate, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        new_enquiry_data = enquiry.dict()
        new_enquiry_data["created_at"] = datetime.now()
        result = await db_mongo["enquiries"].insert_one(new_enquiry_data)
        new_enquiry_data["_id"] = result.inserted_id
        return fix_id(new_enquiry_data)
    else:
        new_enquiry = models.Enquiry(**enquiry.dict())
        db_sql.add(new_enquiry)
        await db_sql.commit()
        await db_sql.refresh(new_enquiry)
        return new_enquiry

# Admin Package Management
@app.get("/api/admin/packages", response_model=List[schemas.Package])
async def admin_get_all_packages(db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        packages = await db_mongo["packages"].find().to_list(None)
        return fix_ids(packages)
    else:
        result = await db_sql.execute(select(models.Package))
        return result.scalars().unique().all()

@app.post("/api/admin/packages", response_model=schemas.Package)
async def create_package(package: schemas.PackageCreate, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        new_pkg_data = package.dict()
        new_pkg_data["created_at"] = datetime.now()
        result = await db_mongo["packages"].insert_one(new_pkg_data)
        new_pkg_data["_id"] = result.inserted_id
        return fix_id(new_pkg_data)
    else:
        package_data = package.dict(exclude={"gallery"})
        gallery_images = package.gallery or []
        new_package = models.Package(**package_data)
        db_sql.add(new_package)
        await db_sql.flush()
        for img_url in gallery_images:
            db_sql.add(models.PackageImage(package_id=new_package.id, image_url=img_url))
        await db_sql.commit()
        await db_sql.refresh(new_package)
        return new_package

@app.put("/api/admin/packages/{package_id}", response_model=schemas.Package)
async def update_package(package_id: str, package_update: schemas.PackageUpdate, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        update_data = {k: v for k, v in package_update.dict(exclude_unset=True).items() if v is not None}
        result = await db_mongo["packages"].update_one(
            {"_id": to_object_id(package_id)},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        updated_pkg = await db_mongo["packages"].find_one({"_id": to_object_id(package_id)})
        return fix_id(updated_pkg)
    else:
        int_id = int(package_id)
        result = await db_sql.execute(select(models.Package).where(models.Package.id == int_id))
        db_package = result.scalar_one_or_none()
        if not db_package:
            raise HTTPException(status_code=404, detail="Package not found")
        update_data = package_update.dict(exclude_unset=True, exclude={"gallery"})
        for key, value in update_data.items():
            setattr(db_package, key, value)
        if package_update.gallery is not None:
            from sqlalchemy import delete as sa_delete
            await db_sql.execute(sa_delete(models.PackageImage).where(models.PackageImage.package_id == int_id))
            for img_url in package_update.gallery:
                db_sql.add(models.PackageImage(package_id=int_id, image_url=img_url))
        await db_sql.commit()
        await db_sql.refresh(db_package)
        return db_package

@app.delete("/api/admin/packages/{package_id}")
async def delete_package(package_id: str, db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        result = await db_mongo["packages"].delete_one({"_id": to_object_id(package_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Package not found")
        return {"message": "Package deleted successfully"}
    else:
        int_id = int(package_id)
        result = await db_sql.execute(select(models.Package).where(models.Package.id == int_id))
        db_package = result.scalar_one_or_none()
        if not db_package:
            raise HTTPException(status_code=404, detail="Package not found")
        await db_sql.delete(db_package)
        await db_sql.commit()
        return {"message": "Package deleted successfully"}

# Admin Enquiry Management
@app.get("/api/admin/enquiries", response_model=List[schemas.Enquiry])
async def get_all_enquiries(db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        enquiries = await db_mongo["enquiries"].find().sort("created_at", -1).to_list(None)
        # Populate package info if needed (manually for MongoDB simplicity)
        for enq in enquiries:
            if "package_id" in enq and enq["package_id"]:
                enq["package"] = await db_mongo["packages"].find_one({"_id": to_object_id(enq["package_id"])})
        return fix_ids(enquiries)
    else:
        result = await db_sql.execute(select(models.Enquiry).order_by(models.Enquiry.created_at.desc()))
        return result.scalars().all()

@app.get("/api/admin/stats")
async def get_admin_stats(db_sql: AsyncSession = Depends(get_db), db_mongo = Depends(get_mongo_db)):
    if app_env == "production" and db_mongo is not None:
        return {
            "total_packages": await db_mongo["packages"].count_documents({}),
            "total_enquiries": await db_mongo["enquiries"].count_documents({}),
            "active_packages": await db_mongo["packages"].count_documents({"status": True}),
            "new_enquiries": await db_mongo["enquiries"].count_documents({"status": "New"})
        }
    else:
        pkg_count = await db_sql.execute(select(func.count(models.Package.id)))
        enquiry_count = await db_sql.execute(select(func.count(models.Enquiry.id)))
        active_pkg_count = await db_sql.execute(select(func.count(models.Package.id)).where(models.Package.status == True))
        return {
            "total_packages": pkg_count.scalar(),
            "total_enquiries": enquiry_count.scalar(),
            "active_packages": active_pkg_count.scalar(),
            "new_enquiries": (await db_sql.execute(select(func.count(models.Enquiry.id)).where(models.Enquiry.status == "New"))).scalar()
        }

# Upload image
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    filename = file.filename
    name, ext = os.path.splitext(filename)
    clean_name = re.sub(r'[^a-zA-Z0-9_-]', '_', name)
    safe_filename = f"{clean_name}_{uuid.uuid4().hex[:8]}{ext}"
    file_path = os.path.join(UPLOAD_DIRECTORY, safe_filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": safe_filename}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
