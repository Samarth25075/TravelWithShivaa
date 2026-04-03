import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
from passlib.context import CryptContext
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

async def seed_mongodb():
    MONGODB_URL = os.getenv("MONGODB_URL")
    if not MONGODB_URL:
        print("❌ MONGODB_URL not found in .env")
        return

    print(f"🚀 Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
    
    # Get database name from URL or fallback
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    # Collections
    admin_coll = db["admin_users"]
    package_coll = db["packages"]
    
    # 1. Seed Admin User
    admin = await admin_coll.find_one({"username": "admin"})
    if not admin:
        pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
        hashed_password = pwd_context.hash("admin")
        await admin_coll.insert_one({
            "username": "admin",
            "password": hashed_password,
            "created_at": datetime.now()
        })
        print("✅ Seeded default admin user (admin/admin)")
    else:
        print("ℹ️ Admin user already exists")

    # 2. Seed Packages
    pkg_count = await package_coll.count_documents({})
    if pkg_count == 0:
        packages = [
            {
                "title": "Goa Beach Paradise",
                "location": "Goa, India",
                "price": 15000.0,
                "description": "Enjoy the sun, sand and sea in the most vibrant state of India. Perfect for relaxation and party lovers alike.",
                "duration": "5 Days / 4 Nights",
                "group_size": "Selectable",
                "image": "goa.png",
                "status": True,
                "created_at": datetime.now(),
                "gallery": []
            },
            {
                "title": "Majestic Manali",
                "location": "Manali, India",
                "price": 25000.0,
                "description": "Experience the snowy peaks and adventurous trails of the Himalayas in beautiful Manali.",
                "duration": "6 Days / 5 Nights",
                "group_size": "Selectable",
                "image": "manali.png",
                "status": True,
                "created_at": datetime.now(),
                "gallery": []
            },
            {
                "title": "Taj Mahal Heritage Tour",
                "location": "Agra, India",
                "price": 12000.0,
                "description": "Witness one of the seven wonders of the world and explore the rich Mughal history of Agra.",
                "duration": "3 Days / 2 Nights",
                "group_size": "Selectable",
                "image": "taj_mahal.png",
                "status": True,
                "created_at": datetime.now(),
                "gallery": []
            }
        ]
        await package_coll.insert_many(packages)
        print(f"✅ Seeded {len(packages)} packages to MongoDB.")
    else:
        print(f"ℹ️ MongoDB already has {pkg_count} packages.")

    print("🏁 MongoDB Seeding Complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_mongodb())
