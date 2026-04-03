import asyncio
from database import engine
from models import Base

async def init_db():
    print("🚀 Connecting to database to establish tables...")
    try:
        async with engine.begin() as conn:
            # Recreate all tables
            await conn.run_sync(Base.metadata.create_all)
        print("✅ Success! Database tables and constraints are established.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(init_db())
