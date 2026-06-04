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
            "slug": "spiti-9-days",
            "location": "Himachal Pradesh",
            "price": 24999.0,
            "description": "Uncover the magic of the 'Middle Land' with our comprehensive Spiti Valley expedition. High altitude lakes, ancient monasteries, and breathtaking mountain passes await.",
            "itinerary": "Day 1: Arrival in Manali & Rest. Check into your cozy alpine cottage, acclimatize to the weather, and explore local cafes on Mall Road.\nDay 2: Manali to Kaza via Rohtang & Kunzum Pass. Drive through dramatic landscapes, cross high mountain passes, and enter the quiet valley of Kaza.\nDay 3: Key Monastery & Kibber Expedition. Visit the iconic 11th-century Key Monastery perched on a hill, and walk the high-altitude bridge of Kibber.\nDay 4: Pin Valley National Park Exploration. Visit Kungri Monastery, see frozen rivers, and experience the cold desert wildlife of Mud village.\nDay 5: Tabo Monastery & Dhankar Fort. Discover the 'Ajanta of the Himalayas' in Tabo and hike up to the spectacular cliffside Dhankar Monastery.\nDay 6: Langza & Hikkim fossil hunting. Send a postcard from the world's highest post office in Hikkim and admire the giant Buddha statue in Langza.\nDay 7: Chandratal Lake Camping. Journey to the mythical Crescent Moon Lake, camp under a million stars, and enjoy a warm bonfire.\nDay 8: Chandratal to Manali return drive. Navigate the challenging yet breathtaking roads back to Manali for a celebration dinner.\nDay 9: Departure with beautiful memories. Bid farewell to the mountains and catch your Volvo bus back to Delhi.",
            "inclusions": "Shared Accommodation in Premium Homestays, Breakfast & Dinner, Oxygen Cylinders & First Aid, Expert Local Expedition Lead, Inner Line Permits & Green Tax, AC Private SUV Transfers",
            "exclusions": "Lunch & Personal Snacks, Adventure Sports Gear rental, Flight or Train Tickets to Manali, Personal Incidentals & Porterage",
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
            "hotel_options": "Diamond Tier: Grand Dewachen Kaza (5-Star Luxury Mountain Resort - Super Deluxe Room)\nGold Tier: Spiti Valley Hotel (4-Star Premium Alpine Hotel - Deluxe Valley View Room)\nSilver Tier: Nomadic Homestay Kaza (3-Star Boutique Homestay - Standard Alpine Room)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1596760411130-1011409f9845?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Ladakh Discovery",
            "slug": "ladakh-discovery",
            "location": "Leh Ladakh, India",
            "price": 32500.0,
            "description": "The ultimate Leh-Ladakh road trip. Experience the thrill of Khardung La, the serenity of Pangong Tso, and the cultural richness of Leh town.",
            "itinerary": "Day 1: Leh Arrival & Acclimatization. Complete rest is mandatory to adjust to the high altitude. Relax at your hotel in the evening.\nDay 2: Sham Valley Sightseeing. Visit the Hall of Fame, Magnetic Hill, Confluence of Indus and Zanskar rivers, and Gurudwara Pathar Sahib.\nDay 3: Leh to Nubra Valley via Khardung La. Cross one of the highest motorable roads in the world, descend to Nubra, and ride double-humped camels in Hunder Dunes.\nDay 4: Turtuk & Hunder Dunes Day Excursion. Visit the last village on the Indo-Pak border, learn about Balti culture, and walk the apricot orchards.\nDay 5: Nubra to Pangong Lake via Shyok River. Drive along the scenic Shyok river and reach the legendary Pangong Tso. Check into luxury lakeside camps.\nDay 6: Pangong Tso to Leh return. Wake up early for a spectacular sunrise over the blue waters, drive back to Leh crossing Chang La Pass.\nDay 7: Monasteries & Leh Palace Tour. Visit Thiksey Monastery, Hemis Monastery, and enjoy panoramic sunset views from Leh Palace.\nDay 8: Departure with Golden Memories. Drop off at Leh Airport for your return flight.",
            "inclusions": "4-Star Hotel Stay in Leh, Luxury Lakeside Glamping in Pangong, Private AC Innova/Scorpio transport, Inner Line Permits & Environment Fees, Buffet Breakfast & Dinner, Oxygen Cylinder backup",
            "exclusions": "Airfare to/from Leh, Camel Ride & Adventure Sports cost, Personal medical bills, Daily Lunch & Alcohol",
            "duration": "8 Days / 7 Nights",
            "group_size": "Batch of 20",
            "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Moderate",
            "rating": 4.9,
            "tag": "Best Seller",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: The Grand Dragon Ladakh (5-Star Luxury Palace Hotel - Premier Mountain Suite)\nGold Tier: Hotel Singge Palace (4-Star Premium Heritage Hotel - Deluxe Room)\nSilver Tier: Snow Land Ladakh (3-Star Premium Hotel - Standard Garden View)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Bali Paradise Escape",
            "slug": "bali-paradise",
            "location": "Bali, Indonesia",
            "price": 45000.0,
            "description": "Tropical bliss in the Island of Gods. From volcano treks to infinity pools and ancient temples, Bali offers the perfect vacation mix.",
            "itinerary": "Day 1: Arrival & Ubud Check-in. VIP airport pickup and transfer to your stunning rainforest villa in Ubud. Relax by the private pool.\nDay 2: Ubud Jungle Swing & Tegalalang Rice Terrace. Experience the famous swing, walk the cascading rice terraces, and visit Sacred Monkey Forest.\nDay 3: Kintamani Volcano Tour & Hot Springs. Watch Mount Batur sunrise, enjoy breakfast overlooking the caldera, and soak in natural hot springs.\nDay 4: Nusa Penida Tropical Day Trip. Take a speed boat to Nusa Penida, visit Kelingking T-Rex Cliff, Broken Beach, and snorkel in Crystal Bay.\nDay 5: Seminyak Beach Club Vibes. Transfer to your luxury beachfront resort in Seminyak, watch the sunset at Potato Head Beach Club.\nDay 6: Uluwatu Temple & Kecak Dance. Visit the cliffside Uluwatu Temple, watch the traditional fire dance, and enjoy a seafood dinner on Jimbaran Beach.\nDay 7: Departure from Denpasar. Enjoy a final Balinese spa session before your transfer to Ngurah Rai International Airport.",
            "inclusions": "Stay in 4-Star Private Pool Villa in Ubud, 5-Star Beach Resort in Seminyak, Private English-Speaking Driver & Car, Nusa Penida Fast Boat Tickets, Daily Buffet Breakfast & Jimbaran Seafood Dinner, All Entrance tickets",
            "exclusions": "Visa on Arrival (VoA), International Flight Tickets, Lunch & Dinner (except Jimbaran), Personal Spa treatments",
            "duration": "7 Days / 6 Nights",
            "group_size": "Private/Couple",
            "image": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Beach",
            "difficulty": "Easy",
            "rating": 4.7,
            "tag": "International",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: Hanging Gardens of Bali (5-Star Luxury Jungle Resort - Private Pool Villa)\nGold Tier: Alaya Resort Ubud (4-Star Premium Boutique Resort - Alaya Room)\nSilver Tier: Sens Hotel Ubud (3-Star Premium Hotel - Superior Garden Room)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Majestic Manali Escape",
            "slug": "manali-5-nights",
            "location": "Manali, Himachal Pradesh",
            "price": 25000.0,
            "description": "Experience the snowy peaks, cascading waterfalls, and adventurous trails of the Himalayas. Our premium Manali escape features top-tier mountain hospitality, exquisite excursions, and customized experiences.",
            "itinerary": "Day 1: Arrival in Manali & Local Exploration. Check into your premium mountain resort, relax, and explore the bustling Mall Road, Hadimba Temple, and Vashisht Hot Springs.\nDay 2: Solang Valley & High-Altitude Adventure. Indulge in paragliding, zorbing, and skiing in Solang Valley, surrounded by towering snow peaks.\nDay 3: Atal Tunnel & Sissu Valley Day Trip. Journey through the engineering marvel of Atal Tunnel to witness the raw, breathtaking beauty of Lahaul Valley and waterfalls.\nDay 4: Excursion to Rohtang Pass. Marvel at the mesmerizing high-altitude panoramic view of mountain ranges wrapped in sheets of snow (subject to availability/permits).\nDay 5: Kasol & Manikaran Spiritual Visit. Take a scenic drive to the Parvati Valley, trek to the quiet village of Chalal, and dip in the sacred hot springs of Manikaran Sahib.\nDay 6: Departure with Beautiful Memories. Enjoy a final hearty mountain breakfast, shop for local wooden crafts/shawls, and board your premium Volvo bus back to Delhi.",
            "inclusions": "5 Nights Stay in a Premium Mountain Resort with Valley Views, Daily Buffet Breakfast & Gourmet Dinners, AC Private SUV (Innova/Crysta) for all Sightseeing, Rohtang Pass Green Permit, Guided Treks & Welcome Drinks on Arrival",
            "exclusions": "Airfare or Train Tickets to Delhi/Chandigarh, Adventure Activities costs (Paragliding, Skiing), Lunch & Personal Expenses, Tipping to drivers and hotel staff",
            "duration": "6 Days / 5 Nights",
            "group_size": "Bespoke Private Group",
            "image": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Easy",
            "rating": 4.95,
            "tag": "Trending",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: Span Resort & Spa (5-Star Luxury Riverside Resort - River Facing Deluxe Room)\nGold Tier: Solang Valley Resort (4-Star Premium Valley View Resort - Deluxe Valley View Room)\nSilver Tier: Snow Valley Resorts (3-Star Premium Alpine Resort - Standard Alpine Room)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1596760411130-1011409f9845?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Kedarnath Spiritual",
            "slug": "kedarnath-spiritual",
            "location": "Uttarakhand, India",
            "price": 18999.0,
            "description": "A soul-stirring journey to one of the 12 Jyotirlingas. Experience the divine energy of Kedarnath Temple amidst the snow-capped Garhwal Himalayas.",
            "itinerary": "Day 1: Haridwar to Guptkashi. Drive along the scenic Ganges, see Devprayag confluence, and reach Guptkashi. Check in and relax.\nDay 2: Guptkashi to Kedarnath Temple Trek. Early morning drive to Sonprayag, then begin the holy 16km trek (or take helicopter/pony) to Kedarnath. Experience evening aarti.\nDay 3: Kedarnath Darshan & Return to Guptkashi. Attend early morning Abhishek darshan, trek back down to Sonprayag, and drive back to Guptkashi.\nDay 4: Visit Joshimath & Narasimha Temple. Drive to Joshimath, visit the ancient temples established by Adi Shankaracharya, and explore local markets.\nDay 5: Return to Haridwar. Drive back to Haridwar, attend the spectacular Ganga Aarti at Har Ki Pauri, and bid goodbye.",
            "inclusions": "Deluxe Hotel Stay in Guptkashi, Standard Lodge Stay near Kedarnath Temple, Biometric Yatra Registration help, Guided trekking support, Breakfast & Dinner, AC Transport from Haridwar",
            "exclusions": "Helicopter Tickets, Pony/Palki charges, Lunch & Personal medicines, Incidental expenses",
            "duration": "5 Days / 4 Nights",
            "group_size": "Pilgrim Batch",
            "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Spiritual",
            "difficulty": "Hard",
            "rating": 4.9,
            "tag": "Popular",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: Villa Kedar Guptkashi (5-Star Luxury Camps - Luxury Cottage)\nGold Tier: Hotel Kedar Haven (4-Star Premium Hotel - Premium Room)\nSilver Tier: GMVN Tourist Lodge Kedarnath (3-Star Government Guest House - Shared Cottage Room)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Dubai Highlights & Desert Safari",
            "slug": "dubai-highlights",
            "location": "Dubai, UAE",
            "price": 58000.0,
            "description": "Luxury meets innovation in the City of Gold. Experience Burj Khalifa, Desert Safari, and Expo City in one power-packed trip.",
            "itinerary": "Day 1: Arrival & Marina Dhow Cruise Dinner. VIP transfer to your hotel. In the evening, enjoy a 5-star international buffet on a traditional glass cruise.\nDay 2: City Tour & Burj Khalifa At the Top. Visit Dubai Frame, Jumeirah Beach, and ascend to the 124th floor of Burj Khalifa. Explore Dubai Mall.\nDay 3: Desert Safari with BBQ Dinner. Thrilling 4x4 dune bashing, camel riding, sandboarding, henna painting, and a premium BBQ dinner under the stars.\nDay 4: Abu Dhabi & Ferrari World Day Excursion. Visit the majestic Sheikh Zayed Grand Mosque and experience the thrill of the world's fastest roller coaster.\nDay 5: Museum of the Future & Departure. Visit the architectural wonder 'Museum of the Future' and enjoy last-minute shopping before your airport drop.",
            "inclusions": "4-Star Hotel Accommodation, UAE Entry Visa & Travel Insurance, All Sightseeing in Luxury AC Coaches, Burj Khalifa & Museum of the Future Entry Tickets, Desert Safari with BBQ, Daily Breakfast",
            "exclusions": "International Flights, Tourism Dirham Tax (approx. $5/night), Lunch & Personal Shopping, Tips to Guides",
            "duration": "5 Days / 4 Nights",
            "group_size": "Family/Friends",
            "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Adventure",
            "difficulty": "Easy",
            "rating": 4.6,
            "tag": "Limited Offer",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: Atlantis The Palm (5-Star Ultra Luxury Beach Resort - Ocean Deluxe Room)\nGold Tier: Radisson Blu Dubai Marina (4-Star Premium Hotel - Marina View Room)\nSilver Tier: Rove Downtown Dubai (3-Star Modern Lifestyle Hotel - Downtown View)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1549111451-40be357bd1b4?auto=format&fit=crop&w=800&q=80"}
            ]
        },
        {
            "title": "Kashmir Paradise Tour",
            "slug": "kashmir-paradise",
            "location": "Jammu & Kashmir, India",
            "price": 28999.0,
            "description": "Witness the heaven on earth. From Dal Lake houseboats to Gulmarg gondola rides, Kashmir is a dream come true for nature lovers.",
            "itinerary": "Day 1: Srinagar Arrival & Houseboat Stay. Arrive in Srinagar and check into a luxury hand-carved wooden Houseboat. Enjoy a peaceful Shikara ride on Dal Lake.\nDay 2: Sonamarg Day Trip. Visit the 'Meadow of Gold', hike up to the stunning Thajiwas Glacier, and enjoy trout fishing in the Sindh river.\nDay 3: Gulmarg Gondola Experience. Drive to Gulmarg, ride the famous two-phase high altitude Gondola, and walk the lush green golf course.\nDay 4: Pahalgam (Valley of Shepherds) Excursion. Drive through saffron fields, visit ancient ruins of Awantipora, and enjoy overnight stay next to the roaring Lidder River.\nDay 5: Pahalgam Local Sightseeing & Valley Exploration. Hike or take local ponies to Aru Valley, Betaab Valley, and Baisaran Valley (mini Switzerland).\nDay 6: Srinagar Mughal Gardens & Departure. Return to Srinagar, tour the grand Shalimar Bagh and Nishat Bagh, then transfer to Srinagar Airport.",
            "inclusions": "1 Night in Premium Dal Lake Houseboat, 4 Nights in 4-Star Mountain Resorts, Daily Buffet Breakfast & Dinner, AC Private SUV for transfers, Shikara Ride, Gondola Phase 1 Tickets",
            "exclusions": "Airfare, Phase 2 Gondola tickets, Local union vehicles in Pahalgam & Sonamarg, Lunch & Pony rentals",
            "duration": "6 Days / 5 Nights",
            "group_size": "Any Size",
            "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
            "status": True,
            "is_popular": True,
            "type": "Mountain",
            "difficulty": "Easy",
            "rating": 4.8,
            "tag": "Honeymoon",
            "created_at": datetime.now(),
            "hotel_options": "Diamond Tier: The Khyber Mountain Resort Gulmarg (5-Star Luxury Alpine Resort - Premier Room)\nGold Tier: Hotel Heevan Pahalgam (4-Star Premium Riverfront Hotel - Deluxe Room)\nSilver Tier: Luxury Houseboat Royal Group (3-Star Deluxe Houseboat - Maharaja Suite Room)",
            "gallery": [
                {"image_url": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"},
                {"image_url": "https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&w=800&q=80"}
            ]
        }
    ]

    # Clear existing packages to avoid duplicates and fix placeholders
    await db["packages"].delete_many({})
    
    # Insert into the database
    result = await db["packages"].insert_many(packages)
    print(f"✅ Successfully seeded {len(result.inserted_ids)} original packages into {db_name}!")

if __name__ == "__main__":
    asyncio.run(seed_packages())
