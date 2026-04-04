import os
from dotenv import load_dotenv
import motor.motor_asyncio
import certifi

load_dotenv()

# Choose Environment
app_env = os.getenv("APP_ENV", "production")

# MongoDB initialization
MONGODB_URL = os.getenv("MONGODB_URL")
client = None
db_mongo = None

if MONGODB_URL:
    client = motor.motor_asyncio.AsyncIOMotorClient(
        MONGODB_URL, 
        tlsCAFile=certifi.where()
    )
    # Default database name from URL if possible, or fallback
    db_name = MONGODB_URL.split("/")[-1].split("?")[0] or "shiv_travel"
    db_mongo = client[db_name]

# MongoDB Dependency
def get_mongo_db():
    if db_mongo is None:
        raise Exception("MongoDB is not initialized. Please check MONGODB_URL in .env")
    return db_mongo

