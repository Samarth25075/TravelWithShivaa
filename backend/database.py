import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from dotenv import load_dotenv

load_dotenv()

# Choose URL based on environment
app_env = os.getenv("APP_ENV", "local")
if app_env == "production":
    DATABASE_URL = os.getenv("PRODUCTION_DATABASE_URL")
else:
    DATABASE_URL = os.getenv("LOCAL_DATABASE_URL")

# Fallback/Safety Check
if not DATABASE_URL:
    DATABASE_URL = os.getenv("DATABASE_URL", "mysql+aiomysql://root:test%40123@localhost:3306/shive_travel")

# Fix for Render (Postgres) vs Local (MySQL)
if DATABASE_URL.startswith("postgres://") or DATABASE_URL.startswith("postgresql://"):
    # Ensure it uses asyncpg for production
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Clean parameters
connection_url = DATABASE_URL.split("?")[0]

# Check if we are running locally to decide on SSL
is_local = "localhost" in connection_url or "127.0.0.1" in connection_url

engine = create_async_engine(
    connection_url, 
    connect_args={"ssl": not is_local},
    echo=True
)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

class Base(DeclarativeBase):
    pass

# Dependency to get async DB session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
