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
                "itinerary": "Day 1: Arrival and Beach Walk\nDay 2: North Goa Sightseeing\nDay 3: Water Sports at Calangute\nDay 4: South Goa Heritage\nDay 5: Departure",
                "inclusions": "Stay in 3-star hotel, Breakfast, Airport transfers, Sightseeing in AC vehicle",
                "exclusions": "Flights, Lunch and Dinner, Personal expenses",
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
                "itinerary": "Day 1: Delhi to Manali (Overnight Journey)\nDay 2: Arrival and local exploration\nDay 3: Solang Valley and Rohtang Pass\nDay 4: Kullu and Manikaran\nDay 5: Shopping at Mall Road\nDay 6: Return to Delhi",
                "inclusions": "Volvo Bus tickets, Hotel stay, Half-board meals, Local guide",
                "exclusions": "Adventure activities cost, Personal insurance",
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
                "itinerary": "Day 1: Arrival in Agra and Sunset at Mehtab Bagh\nDay 2: Taj Mahal and Agra Fort Visit\nDay 3: Fatehpur Sikri and Departure",
                "inclusions": "Luxury stay, Breakfast, Private guide, Monument entries",
                "exclusions": "Camera fees, Lunch",
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

    # 3. Seed Blogs
    blog_coll = db["blogs"]
    blog_count = await blog_coll.count_documents({})
    if blog_count == 0:
        blogs = [
            {
                "title": "Top 10 Places to Visit in Spiti Valley",
                "category": "Mountains",
                "description": "Spiti Valley is a cold desert mountain valley located high in the Himalayas.",
                "content": "Full guide coming soon about the land between Tibet and India...",
                "image": "spiti_blog.jpg",
                "date": "May 15, 2024",
                "reading_time": "8 min read",
                "created_at": datetime.now()
            },
            {
                "title": "Why Solo Travel is Life Changing",
                "category": "Solo Travel",
                "description": "Exploring the world alone helps you discover yourself.",
                "content": "The freedom of solo travel is unmatched...",
                "image": "solo_travel.jpg",
                "date": "June 10, 2024",
                "reading_time": "5 min read",
                "created_at": datetime.now()
            }
        ]
        await blog_coll.insert_many(blogs)
        print(f"✅ Seeded {len(blogs)} blogs to MongoDB.")

    # 4. Seed Group Trips
    trip_coll = db["group_trips"]
    trip_count = await trip_coll.count_documents({})
    if trip_count == 0:
        trips = [
            {
                "title": "Lahaul-Spiti Summer Expedition",
                "date": "15-25 June",
                "seats": 10,
                "price": 28500.0,
                "image": "spiti_trip.jpg",
                "status": "upcoming",
                "group_size": "12-15",
                "created_at": datetime.now()
            },
            {
                "title": "Kerala Backwaters & Hills",
                "date": "10-20 July",
                "seats": 5,
                "price": 32000.0,
                "image": "kerala_trip.jpg",
                "status": "upcoming",
                "group_size": "12-15",
                "created_at": datetime.now()
            }
        ]
        await trip_coll.insert_many(trips)
        print(f"✅ Seeded {len(trips)} group trips to MongoDB.")

    print("🏁 MongoDB Seeding Complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_mongodb())
