import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
from passlib.context import CryptContext
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

async def reset_admin():
    MONGODB_URL = os.getenv("MONGODB_URL")
    if not MONGODB_URL:
        print("❌ MONGODB_URL not found in .env")
        return

    print(f"🚀 Connecting to MongoDB to reset admin credentials...")
    client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
    
    # Use the same logic as database.py
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    # Collection
    admin_coll = db["admin_users"]
    
    # 1. Clear existing admin if any
    await admin_coll.delete_many({"username": "admin"})
    
    # 2. Add new admin user
    pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
    hashed_password = pwd_context.hash("admin")
    
    await admin_coll.insert_one({
        "username": "admin",
        "password": hashed_password,
        "created_at": datetime.now()
    })
    
    print(f"✅ SUCCESSFULLY RESET admin user to (admin/admin) in database: {db_name}")
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_admin())
