import asyncio
import os
from datetime import datetime
import motor.motor_asyncio
import certifi
from dotenv import load_dotenv

# Load environment variables from backend directory
load_dotenv(dotenv_path='backend/.env')

MONGODB_URL = os.getenv("MONGODB_URL")

async def seed_packages():
    print(f"Connecting to MongoDB...")
    # Use certifi for SSL handshakes with Atlas
    client = motor.motor_asyncio.AsyncIOMotorClient(
        MONGODB_URL, 
        tlsCAFile=certifi.where()
    )
    
    # Logic from database.py for fallback
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    packages = [
        {
            "title": "Spiti Explorer",
            "location": "Himachal Pradesh",
            "price": 24999.0,
            "description": "Uncover the magic of the 'Middle Land' with our comprehensive Spiti Valley expedition. High altitude lakes, ancient monasteries, and breathtaking mountain passes await.",
            "itinerary": "Day 1: Arrival in Manali\nDay 2: Manali to Kaza via Rohtang\nDay 3: Key Monastery & Kibber\nDay 4: Pin Valley Exploration\nDay 5: Tabo & Dhankar\nDay 6: Langza & Hikkim\nDay 7: Chandratal Lake Camping\nDay 8: Chandratal to Manali\nDay 9: Departure",
            "inclusions": "Shared Accommodation, Breakfast & Dinner, Oxygen Cylinders, Expert Guide, Inner Line Permits",
            "exclusions": "Lunch, Personal expenses, Adventure sports fees, Flight/Train tickets",
            "duration": "9 Days / 8 Nights",
            "group_size": "12-15 Travellers",
            "image": "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Moderate",
            "rating": 4.8,
            "tag": "Trending",
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Ladakh Discovery",
            "location": "Ladakh, India",
            "price": 32500.0,
            "description": "The ultimate Leh-Ladakh road trip. Experience the thrill of Khardung La, the serenity of Pangong Tso, and the cultural richness of Leh town.",
            "itinerary": "Day 1: Leh Arrival & Acclimatization\nDay 2: Sham Valley Sightseeing\nDay 3: Leh to Nubra Valley\nDay 4: Turtuk & Hunder Dunes\nDay 5: Nubra to Pangong via Shyok\nDay 6: Pangong to Leh\nDay 7: Monasteries & Hall of Fame\nDay 8: Departure",
            "inclusions": "Hotel Stay, Bike/SUV Transport, Inner Line Permits, Buffet Meals",
            "exclusions": "Airfare, Fuel for personal bikes, Personal snacks",
            "duration": "10 Days / 9 Nights",
            "group_size": "Batch of 20",
            "image": "ladakh_discovery.png",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Moderate",
            "rating": 4.9,
            "tag": "Best Seller",
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Bali Paradise",
            "location": "Bali, Indonesia",
            "price": 45000.0,
            "description": "Tropical bliss in the Island of Gods. From volcano treks to infinity pools and ancient temples, Bali offers the perfect vacation mix.",
            "itinerary": "Day 1: Arrival & Ubud Check-in\nDay 2: Ubud Swing & Tegalalang Rice Terrace\nDay 3: Kintamani Volcano Tour\nDay 4: Nusa Penida Day Trip\nDay 5: Seminyak Beach Club Vibes\nDay 6: Tanah Lot Sunset\nDay 7: Departure",
            "inclusions": "4-Star Villa with Pool, Private Car with Driver, Daily Breakfast, Nusa Penida Fast Boat",
            "exclusions": "Visa on Arrival, International Flights, Dinner",
            "duration": "7 Days / 6 Nights",
            "group_size": "Private/Couple",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
            "status": True,
            "is_popular": True,
            "type": "Beach",
            "difficulty": "Easy",
            "rating": 4.7,
            "tag": "International",
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Kedarnath Spiritual",
            "location": "Uttarakhand, India",
            "price": 18999.0,
            "description": "A soul-stirring journey to one of the 12 Jyotirlingas. Experience the divine energy of Kedarnath Temple amidst the snow-capped Garhwal Himalayas.",
            "itinerary": "Day 1: Haridwar to Guptkashi\nDay 2: Guptkashi to Kedarnath (Trek/Heli)\nDay 3: Kedarnath Darshan & Back to Guptkashi\nDay 4: Visit Joshimath\nDay 5: Return to Haridwar",
            "inclusions": "Homestay/Dharamshala Stay, Yatra Registration, Support Staff, Basic Meals",
            "exclusions": "Pony/Palki charges, Helicopter tickets, Personal medicines",
            "duration": "6 Days / 5 Nights",
            "group_size": "Pilgrim Batch",
            "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
            "status": True,
            "is_popular": True,
            "type": "Spiritual",
            "difficulty": "Moderate",
            "rating": 4.9,
            "tag": "Popular",
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Dubai Highlights",
            "location": "Dubai, UAE",
            "price": 58000.0,
            "description": "Luxury meets innovation in the City of Gold. Experience Burj Khalifa, Desert Safari, and Expo City in one power-packed trip.",
            "itinerary": "Day 1: Arrival & Dhow Cruise Dinner\nDay 2: City Tour & Burj Khalifa At the Top\nDay 3: Desert Safari with BBQ Dinner\nDay 4: Abu Dhabi & Ferrari World\nDay 5: Museum of the Future & Departure",
            "inclusions": "Visa & Insurance, 3-Star/4-Star Hotels, All Sightseeing Transfers, Desert Safari",
            "exclusions": "Airfare, Tourism Dirham Tax, Tips",
            "duration": "5 Days / 4 Nights",
            "group_size": "Family/Friends",
            "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
            "status": True,
            "is_popular": True,
            "type": "Adventure",
            "difficulty": "Easy",
            "rating": 4.6,
            "tag": "Limited Offer",
            "created_at": datetime.now(),
            "gallery": []
        },
        {
            "title": "Kashmir Paradise",
            "location": "Jammu & Kashmir",
            "price": 28999.0,
            "description": "Witness the heaven on earth. From Dal Lake houseboats to Gulmarg gondola rides, Kashmir is a dream come true for nature lovers.",
            "itinerary": "Day 1: Srinagar Arrival & Houseboat Stay\nDay 2: Sonamarg Day Trip\nDay 3: Gulmarg Gondola Experience\nDay 4: Pahalgam (Valley of Shepherds)\nDay 5: Local Sightseeing (Mughal Gardens)\nDay 6: Departure",
            "inclusions": "Houseboat Experience, Shikara Ride, AC Transport, Full Board Meals (Srinagar)",
            "exclusions": "Gondola tickets, Pony rides, Local Union cars in Pahalgam",
            "duration": "8 Days / 7 Nights",
            "group_size": "Any Size",
            "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Easy",
            "rating": 4.8,
            "tag": "Honeymoon",
            "created_at": datetime.now(),
            "gallery": []
        }
    ]

    # Clear existing packages to avoid duplicates and fix placeholders
    await db["packages"].delete_many({})
    
    # Insert into the database
    result = await db["packages"].insert_many(packages)
    print(f"✅ Successfully seeded {len(result.inserted_ids)} original packages into {db_name}!")

if __name__ == "__main__":
    asyncio.run(seed_packages())
