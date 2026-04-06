import asyncio
import os
import motor.motor_asyncio
import certifi
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def run_update():
    MONGODB_URL = os.getenv("MONGODB_URL")
    if not MONGODB_URL:
        print("MONGODB_URL not found in .env")
        return
        
    client = motor.motor_asyncio.AsyncIOMotorClient(
        MONGODB_URL, 
        tlsCAFile=certifi.where()
    )
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db = client[db_name]
    
    # Check if package exists
    pkg = await db['packages'].find_one({'title': 'Ladakh Discovery'})
    if pkg:
        print(f"Found package: {pkg['title']} in database: {db_name}")
        result = await db['packages'].update_one(
            {'title': 'Ladakh Discovery'},
            {'$set': {'image': 'ladakh_discovery.png'}}
        )
        print(f"Update status: {result.modified_count} documents modified.")
    else:
        print(f"Package 'Ladakh Discovery' not found in database: {db_name}")

if __name__ == '__main__':
    asyncio.run(run_update())
