from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import shutil
from pydantic import BaseModel
from datetime import datetime

# Local imports
import schemas, database
from database import get_mongo_db, app_env
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

app = FastAPI(title="Shiv Travel API")

@app.get("/")
async def health_check():
    return {"status": "ok", "message": f"Shiv Travel API is running with MongoDB!"}

# Simple Auth Schema
class LoginRequest(BaseModel):
    username: str
    password: str

# Allow CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    os.getenv("ALLOWED_ORIGIN", "*"), # Default to * for easiest cloud deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False, # Must be False if using allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event
@app.on_event("startup")
async def startup():
    print(f"🚀 [STARTUP] Running in {app_env} mode with MongoDB")

# --- Admin Login Route ---
@app.post("/api/admin/login")
async def login(request: LoginRequest, db_mongo = Depends(get_mongo_db)):
    admin = await db_mongo["admin_users"].find_one({"username": request.username})
    
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
async def get_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find({"status": True}).to_list(None)
    return fix_ids(packages)

@app.get("/api/packages/featured", response_model=List[schemas.Package])
async def get_featured_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find({"status": True}).limit(3).to_list(None)
    return fix_ids(packages)

@app.get("/api/packages/{package_id}", response_model=schemas.Package)
async def get_package(package_id: str, db_mongo = Depends(get_mongo_db)):
    package = await db_mongo["packages"].find_one({"_id": to_object_id(package_id)})
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return fix_id(package)

# Enquiry Routes
@app.post("/api/enquiries", response_model=schemas.Enquiry)
async def create_enquiry(enquiry: schemas.EnquiryCreate, db_mongo = Depends(get_mongo_db)):
    new_enquiry_data = enquiry.dict()
    new_enquiry_data["created_at"] = datetime.now()
    result = await db_mongo["enquiries"].insert_one(new_enquiry_data)
    new_enquiry_data["_id"] = result.inserted_id
    return fix_id(new_enquiry_data)

# Admin Package Management
@app.get("/api/admin/packages", response_model=List[schemas.Package])
async def admin_get_all_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find().to_list(None)
    return fix_ids(packages)

@app.post("/api/admin/packages", response_model=schemas.Package)
async def create_package(package: schemas.PackageCreate, db_mongo = Depends(get_mongo_db)):
    new_pkg_data = package.dict()
    new_pkg_data["created_at"] = datetime.now()
    result = await db_mongo["packages"].insert_one(new_pkg_data)
    new_pkg_data["_id"] = result.inserted_id
    return fix_id(new_pkg_data)

@app.put("/api/admin/packages/{package_id}", response_model=schemas.Package)
async def update_package(package_id: str, package_update: schemas.PackageUpdate, db_mongo = Depends(get_mongo_db)):
    update_data = {k: v for k, v in package_update.dict(exclude_unset=True).items() if v is not None}
    result = await db_mongo["packages"].update_one(
        {"_id": to_object_id(package_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    updated_pkg = await db_mongo["packages"].find_one({"_id": to_object_id(package_id)})
    return fix_id(updated_pkg)

@app.delete("/api/admin/packages/{package_id}")
async def delete_package(package_id: str, db_mongo = Depends(get_mongo_db)):
    result = await db_mongo["packages"].delete_one({"_id": to_object_id(package_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"message": "Package deleted successfully"}

# Admin Enquiry Management
@app.get("/api/admin/enquiries", response_model=List[schemas.Enquiry])
async def get_all_enquiries(db_mongo = Depends(get_mongo_db)):
    enquiries = await db_mongo["enquiries"].find().sort("created_at", -1).to_list(None)
    for enq in enquiries:
        if "package_id" in enq and enq["package_id"]:
            enq["package"] = await db_mongo["packages"].find_one({"_id": to_object_id(enq["package_id"])})
    return fix_ids(enquiries)

@app.get("/api/admin/stats")
async def get_admin_stats(db_mongo = Depends(get_mongo_db)):
    return {
        "total_packages": await db_mongo["packages"].count_documents({}),
        "total_enquiries": await db_mongo["enquiries"].count_documents({}),
        "active_packages": await db_mongo["packages"].count_documents({"status": True}),
        "new_enquiries": await db_mongo["enquiries"].count_documents({"status": "New"})
    }

@app.put("/api/admin/enquiries/{enquiry_id}")
async def update_enquiry_status(enquiry_id: str, status: str, db_mongo = Depends(get_mongo_db)):
    result = await db_mongo["enquiries"].update_one(
        {"_id": to_object_id(enquiry_id)},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return {"message": "Enquiry status updated"}


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
