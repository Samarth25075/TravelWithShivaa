import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
from dotenv import load_dotenv

load_dotenv()

async def verify_mongo_data():
    MONGODB_URL = os.getenv("MONGODB_URL")
    if not MONGODB_URL:
        print("❌ MONGODB_URL not found in .env")
        return

    print(f"🔍 Connecting to MongoDB to verify data...")
    client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
    
    # Same logic as main.py and seed_mongodb.py
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    print(f"📁 Using Database: {db_name}")
    
    # Check Admin
    admin = await db["admin_users"].find_one({"username": "admin"})
    if admin:
        print(f"✅ Admin user 'admin' FOUND in collection 'admin_users'")
    else:
        print(f"❌ Admin user 'admin' NOT FOUND in collection 'admin_users'")
        # Let's list some collection names to see what's there
        colls = await db.list_collection_names()
        print(f"📂 Available collections in '{db_name}': {colls}")

    # Check Packages
    pkgs = await db["packages"].count_documents({})
    print(f"📦 Packages found: {pkgs}")

    client.close()

if __name__ == "__main__":
    asyncio.run(verify_mongo_data())
