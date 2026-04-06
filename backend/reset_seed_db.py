import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
from passlib.context import CryptContext
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

async def reset_and_seed_mongodb():
    MONGODB_URL = os.getenv("MONGODB_URL")
    if not MONGODB_URL:
        print("❌ MONGODB_URL not found in .env")
        return

    print(f"🚀 Connecting to MongoDB...")
    client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
    
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    # Collections
    admin_coll = db["admin_users"]
    package_coll = db["packages"]
    blog_coll = db["blogs"]
    trip_coll = db["group_trips"]
    enquiry_coll = db["enquiries"]

    print("🗑️ Clearing existing data...")
    # Keep admin user to avoid lockout, but clear others
    await package_coll.delete_many({})
    await blog_coll.delete_many({})
    await trip_coll.delete_many({})
    await enquiry_coll.delete_many({})

    # 1. Seed Admin User (if not exists)
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

    # 2. Seed Packages (with rich data)
    packages = [
        {
            "title": "Goa Beach Paradise",
            "location": "Goa, India",
            "price": 15000.0,
            "description": "Enjoy the sun, sand and sea in the most vibrant state of India. Perfect for relaxation and party lovers alike.",
            "duration": "5 Days / 4 Nights",
            "group_size": "Selectable",
            "itinerary": "Day 1: Arrival at Airport, Transfer to Hotel\nDay 2: North Goa exploration\nDay 3: South Goa exploration\nDay 4: Optional Water Sports\nDay 5: Departure",
            "inclusions": "Stay in 4-star hotel, Buffet Breakfast, AC Private Vehicle, All permits",
            "exclusions": "Airfare, Lunch & Dinner, Water Sports activities, Tipping",
            "image": "goa.png",
            "status": True,
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Majestic Manali Expedition",
            "location": "Manali, India",
            "price": 25000.0,
            "description": "Experience the snowy peaks and adventurous trails of the Himalayas.",
            "duration": "6 Days / 5 Nights",
            "group_size": "Selectable",
            "itinerary": "Day 1: Reach Delhi, Board Bus\nDay 2: Reach Manali and Relax\nDay 3: Solang Valley & Atal Tunnel\nDay 4: Kullu and Kasol sightseeing\nDay 5: Hadimba temple and local streets\nDay 6: Return journey",
            "inclusions": "Luxury Volvo Bus, Homestay/Hotel stay, Guided trekking, Breakfast and Dinner",
            "exclusions": "Paragliding and Snow activity costs, Lunch",
            "image": "manali.png",
            "status": True,
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Heavenly Kashmir Valley",
            "location": "Kashmir, India",
            "price": 38000.0,
            "description": "Paradise on earth. Experience the Shikara rides and houseboats.",
            "duration": "6 Days / 5 Nights",
            "group_size": "Selectable",
            "itinerary": "Day 1: Srinagar Arrival, Shikara Ride\nDay 2: Srinagar to Gulmarg\nDay 3: Gulmarg Gondola Ride, Srinagar return\nDay 4: Srinagar to Pahalgam\nDay 5: Pahalgam local exploration\nDay 6: Srinagar Airport Drop",
            "inclusions": "Luxury Houseboat stay, 4-star Hotel in Pahalgam, Shikara ride, Local tour guide",
            "exclusions": "Gondola ride tickets, Meals other than breakfast",
            "image": "hero.png",
            "status": True,
            "created_at": datetime.now(),
            "gallery": []
        }
    ]
    await package_coll.insert_many(packages)
    print(f"✅ Seeded {len(packages)} packages.")

    # 3. Seed Blogs
    blogs = [
        {
            "title": "Spiti Valley: The Complete Survival Guide",
            "category": "Mountains",
            "description": "How to prepare for one of the toughest yet most beautiful road trips in India.",
            "content": "# Preparation is Key\nSpiti requires patience and fitness. Pack heavy woolens even in summer!\n\n# Best Time\nJune to September is best for clear roads.",
            "image": "hero.png",
            "date": "April 06, 2024",
            "reading_time": "12 min read",
            "created_at": datetime.now()
        },
        {
            "title": "Why Solo Travel is Life Changing",
            "category": "Solo Travel",
            "description": "Exploring the world alone helps you discover yourself.",
            "content": "Solo travel is and always will be about the 'Me time'. Exploring new places without the influence of others...",
            "image": "manali.png",
            "date": "March 20, 2024",
            "reading_time": "5 min read",
            "created_at": datetime.now()
        }
    ]
    await blog_coll.insert_many(blogs)
    print(f"✅ Seeded {len(blogs)} blogs.")

    # 4. Seed Group Trips
    trips = [
        {
            "title": "Spiti Summer Bash 2024",
            "date": "10-19 June",
            "seats": 12,
            "price": 28500.0,
            "image": "hero.png",
            "status": "upcoming",
            "group_size": "12-15",
            "created_at": datetime.now()
        },
        {
            "title": "Kerala Backwaters & Hills Experience",
            "date": "July 12-18",
            "seats": 5,
            "price": 32000.0,
            "image": "kerala_trip.jpg",
            "status": "upcoming",
            "group_size": "15-20",
            "created_at": datetime.now()
        }
    ]
    await trip_coll.insert_many(trips)
    print(f"✅ Seeded {len(trips)} group trips.")

    print("🏁 MongoDB Full Reset & Seed Complete!")
    client.close()

if __name__ == "__main__":
    asyncio.run(reset_and_seed_mongodb())
