from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import shutil
from pydantic import BaseModel
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import BackgroundTasks

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

# --- Email Notification Logic ---
def send_admin_notification(enquiry_data: dict):
    mail_user = os.getenv("MAIL_USERNAME")
    mail_pass = os.getenv("MAIL_PASSWORD")
    admin_email = os.getenv("ADMIN_EMAIL", mail_user)
    
    if not mail_user or not mail_pass:
        print("⚠️ [MAIL] Skipping notification: Credentials not set in .env")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = mail_user
        msg['To'] = admin_email
        msg['Subject'] = f"🚀 New Enquiry: {enquiry_data.get('subject', 'General')}"

        body = f"""
        🔔 New Enquiry Received via Shiv Travel Website

        -------------------------------------------
        👤 Name: {enquiry_data.get('name')}
        📧 Email: {enquiry_data.get('email')}
        📞 Phone: {enquiry_data.get('phone')}
        📌 Subject: {enquiry_data.get('subject')}
        💬 Message:
        {enquiry_data.get('message')}
        -------------------------------------------

        *Sent automatically by Shiv Travel Backend*
        """
        msg.attach(MIMEText(body, 'plain'))

        # Standard Gmail SMTP configuration
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(mail_user, mail_pass)
            server.send_message(msg)
            print(f"✅ [MAIL] Notification sent to {admin_email}")

    except Exception as e:
        print(f"❌ [MAIL] Failed to send email: {e}")

# Ensure uploads directory exists
UPLOAD_DIRECTORY = "uploads"
if not os.path.exists(UPLOAD_DIRECTORY):
    os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

app.mount("/api/uploads", StaticFiles(directory=UPLOAD_DIRECTORY), name="uploads")

# Helper to format package for response
def format_package(pkg):
    if not pkg: return pkg
    pkg = fix_id(pkg)
    if "gallery" in pkg and pkg["gallery"]:
        # If gallery is a list of strings, convert to objects for the frontend
        if isinstance(pkg["gallery"][0], str):
            pkg["gallery"] = [{"image_url": img} for img in pkg["gallery"]]
        # If it's already objects but needs fixing/mapping (though here we expect it was just strings in DB)
    else:
        pkg["gallery"] = []
    return pkg

def format_packages(pkgs):
    return [format_package(pkg) for pkg in pkgs]

@app.get("/api/packages", response_model=List[schemas.Package])
async def get_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find({"status": True}).to_list(None)
    return format_packages(packages)

@app.get("/api/packages/featured", response_model=List[schemas.Package])
async def get_featured_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find({"status": True}).limit(3).to_list(None)
    return format_packages(packages)

@app.get("/api/packages/{package_id}", response_model=schemas.Package)
async def get_package(package_id: str, db_mongo = Depends(get_mongo_db)):
    package = await db_mongo["packages"].find_one({"_id": to_object_id(package_id)})
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    return format_package(package)

# Enquiry Routes
@app.post("/api/enquiries", response_model=schemas.Enquiry)
async def create_enquiry(enquiry: schemas.EnquiryCreate, background_tasks: BackgroundTasks, db_mongo = Depends(get_mongo_db)):
    new_enquiry_data = enquiry.dict()
    new_enquiry_data["created_at"] = datetime.now()
    result = await db_mongo["enquiries"].insert_one(new_enquiry_data)
    new_enquiry_data["_id"] = result.inserted_id
    
    # Send email notification in the background to avoid blocking the response
    background_tasks.add_task(send_admin_notification, new_enquiry_data)
    
    return fix_id(new_enquiry_data)

# Admin Package Management
@app.get("/api/admin/packages", response_model=List[schemas.Package])
async def admin_get_all_packages(db_mongo = Depends(get_mongo_db)):
    packages = await db_mongo["packages"].find().to_list(None)
    return format_packages(packages)

@app.post("/api/admin/packages", response_model=schemas.Package)
async def create_package(package: schemas.PackageCreate, db_mongo = Depends(get_mongo_db)):
    new_pkg_data = package.dict()
    new_pkg_data["created_at"] = datetime.now()
    result = await db_mongo["packages"].insert_one(new_pkg_data)
    new_pkg_data["_id"] = result.inserted_id
    return format_package(new_pkg_data)

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
    return format_package(updated_pkg)

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
            pkg = await db_mongo["packages"].find_one({"_id": to_object_id(enq["package_id"])})
            enq["package"] = format_package(pkg)
    return fix_ids(enquiries)

@app.get("/api/admin/stats")
async def get_admin_stats(db_mongo = Depends(get_mongo_db)):
    return {
        "total_packages": await db_mongo["packages"].count_documents({}),
        "total_enquiries": await db_mongo["enquiries"].count_documents({}),
        "active_packages": await db_mongo["packages"].count_documents({"status": True}),
        "new_enquiries": await db_mongo["enquiries"].count_documents({"status": "New"}),
        "total_blogs": await db_mongo["blogs"].count_documents({}),
        "total_group_trips": await db_mongo["group_trips"].count_documents({})
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
    
# --- Blog Management ---

@app.get("/api/blogs", response_model=List[schemas.Blog])
async def get_blogs(db_mongo = Depends(get_mongo_db)):
    blogs = await db_mongo["blogs"].find().sort("created_at", -1).to_list(None)
    return fix_ids(blogs)

@app.post("/api/admin/blogs", response_model=schemas.Blog)
async def create_blog(blog: schemas.BlogCreate, db_mongo = Depends(get_mongo_db)):
    new_blog_data = blog.dict()
    new_blog_data["created_at"] = datetime.now()
    result = await db_mongo["blogs"].insert_one(new_blog_data)
    new_blog_data["_id"] = result.inserted_id
    return fix_id(new_blog_data)

@app.put("/api/admin/blogs/{blog_id}", response_model=schemas.Blog)
async def update_blog(blog_id: str, blog_update: schemas.BlogUpdate, db_mongo = Depends(get_mongo_db)):
    update_data = {k: v for k, v in blog_update.dict(exclude_unset=True).items() if v is not None}
    result = await db_mongo["blogs"].update_one(
        {"_id": to_object_id(blog_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    updated_blog = await db_mongo["blogs"].find_one({"_id": to_object_id(blog_id)})
    return fix_id(updated_blog)

@app.delete("/api/admin/blogs/{blog_id}")
async def delete_blog(blog_id: str, db_mongo = Depends(get_mongo_db)):
    result = await db_mongo["blogs"].delete_one({"_id": to_object_id(blog_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"message": "Blog deleted successfully"}

# --- Group Trip Management ---

@app.get("/api/group-trips", response_model=List[schemas.GroupTrip])
async def get_group_trips(db_mongo = Depends(get_mongo_db)):
    trips = await db_mongo["group_trips"].find().sort("created_at", -1).to_list(None)
    return fix_ids(trips)

@app.post("/api/admin/group-trips", response_model=schemas.GroupTrip)
async def create_group_trip(trip: schemas.GroupTripCreate, db_mongo = Depends(get_mongo_db)):
    new_trip_data = trip.dict()
    new_trip_data["created_at"] = datetime.now()
    result = await db_mongo["group_trips"].insert_one(new_trip_data)
    new_trip_data["_id"] = result.inserted_id
    return fix_id(new_trip_data)

@app.put("/api/admin/group-trips/{trip_id}", response_model=schemas.GroupTrip)
async def update_group_trip(trip_id: str, trip_update: schemas.GroupTripUpdate, db_mongo = Depends(get_mongo_db)):
    update_data = {k: v for k, v in trip_update.dict(exclude_unset=True).items() if v is not None}
    result = await db_mongo["group_trips"].update_one(
        {"_id": to_object_id(trip_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Group trip not found")
    updated_trip = await db_mongo["group_trips"].find_one({"_id": to_object_id(trip_id)})
    return fix_id(updated_trip)

@app.delete("/api/admin/group-trips/{trip_id}")
async def delete_group_trip(trip_id: str, db_mongo = Depends(get_mongo_db)):
    result = await db_mongo["group_trips"].delete_one({"_id": to_object_id(trip_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Group trip not found")
    return {"message": "Group trip deleted successfully"}


# Settings & Configuration
@app.get("/api/settings/home-images")
async def get_home_images(db_mongo = Depends(get_mongo_db)):
    settings = await db_mongo["settings"].find_one({"key": "home_carousel"})
    if not settings:
        # Default images if not set
        defaults = [
            "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1920&q=80"
        ]
        return {"images": defaults}
    return {"images": settings["images"]}

@app.post("/api/settings/home-images")
async def update_home_images(images: List[str], db_mongo = Depends(get_mongo_db)):
    await db_mongo["settings"].update_one(
        {"key": "home_carousel"},
        {"$set": {"images": images, "updated_at": datetime.now()}},
        upsert=True
    )
    return {"status": "success", "images": images}

@app.get("/api/settings/insta-posts")
async def get_insta_posts(db_mongo = Depends(get_mongo_db)):
    settings = await db_mongo["settings"].find_one({"key": "insta_posts"})
    if not settings:
        # Default images if not set
        defaults = [
            "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
        ]
        return {"images": defaults}
    return {"images": settings["images"]}

@app.post("/api/settings/insta-posts")
async def update_insta_posts(images: List[str], db_mongo = Depends(get_mongo_db)):
    await db_mongo["settings"].update_one(
        {"key": "insta_posts"},
        {"$set": {"images": images, "updated_at": datetime.now()}},
        upsert=True
    )
    return {"status": "success", "images": images}

@app.get("/api/settings/logo")
async def get_site_logo(db_mongo = Depends(get_mongo_db)):
    settings = await db_mongo["settings"].find_one({"key": "site_logo"})
    if not settings:
        return {"logo_url": "/logo.png"} # Default fallback
    return {"logo_url": settings["logo_url"]}

@app.post("/api/settings/logo")
async def update_site_logo(data: schemas.SiteLogoUpdate, db_mongo = Depends(get_mongo_db)):
    await db_mongo["settings"].update_one(
        {"key": "site_logo"},
        {"$set": {"logo_url": data.logo_url, "updated_at": datetime.now()}},
        upsert=True
    )
    return {"status": "success", "logo_url": data.logo_url}

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
