import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv
import motor.motor_asyncio
import certifi

load_dotenv()

# Choose Environment
app_env = os.getenv("APP_ENV", "local")

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

# SQL Database settings (for legacy or local)
LOCAL_DATABASE_URL = os.getenv("LOCAL_DATABASE_URL", "mysql+aiomysql://root:test%40123@localhost:3306/shive_travel")
PRODUCTION_DATABASE_URL = os.getenv("PRODUCTION_DATABASE_URL")

if app_env == "production" and PRODUCTION_DATABASE_URL:
    DATABASE_URL = PRODUCTION_DATABASE_URL
else:
    DATABASE_URL = LOCAL_DATABASE_URL

# Fix for Render (Postgres) vs Local (MySQL)
if DATABASE_URL and (DATABASE_URL.startswith("postgres://") or DATABASE_URL.startswith("postgresql://")):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Clean parameters
connection_url = DATABASE_URL.split("?")[0] if DATABASE_URL else ""

# SQL Engine (keep for local)
engine = None
if connection_url:
    is_local = "localhost" in connection_url or "127.0.0.1" in connection_url
    engine = create_async_engine(
        connection_url, 
        connect_args={"ssl": not is_local} if not is_local else {},
        echo=True
    )
    AsyncSessionLocal = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )

class Base(DeclarativeBase):
    pass

# SQL Dependency
async def get_db():
    if AsyncSessionLocal:
        async with AsyncSessionLocal() as session:
            yield session

# MongoDB Dependency
def get_mongo_db():
    return db_mongo
