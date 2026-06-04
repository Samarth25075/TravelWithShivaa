import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
from dotenv import load_dotenv

load_dotenv()

async def main():
    MONGODB_URL = os.getenv("MONGODB_URL")
    client = AsyncIOMotorClient(MONGODB_URL, tlsCAFile=certifi.where())
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    pkg = await db["packages"].find_one({"slug": "kedarnath-spiritual"})
    if not pkg:
        print("Package 'kedarnath-spiritual' not found")
        # List all packages in DB
        all_pkgs = await db["packages"].find().to_list(None)
        for p in all_pkgs:
            print(f"Slug: {p.get('slug')} | Title: {p.get('title')} | Image: {p.get('image')} | Gallery: {p.get('gallery')}")
    else:
        print("Found Package 'kedarnath-spiritual':")
        print(f"Title: {pkg.get('title')}")
        print(f"Image: {pkg.get('image')}")
        print(f"Gallery: {pkg.get('gallery')}")
        
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
