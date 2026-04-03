import asyncio
import os
import sys

# Ensure backend directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine
from models import Base

async def reset_database():
    print("🧹 [RESET] Connecting to database to wipe all data...")
    try:
        async with engine.begin() as conn:
            # DROP ALL TABLES
            print("🛑 Dropping all tables...")
            await conn.run_sync(Base.metadata.drop_all)
            
            # RECREATE ALL TABLES
            print("🏗️ Recreating empty tables...")
            await conn.run_sync(Base.metadata.create_all)
            
        print("✅ [RESET] SUCCESS! Your database (local or live) has been completely wiped.")
        print("💡 The next time you start your server, it will re-seed with only the default tours.")
    except Exception as e:
        print(f"❌ [RESET] FAILED: {e}")

if __name__ == "__main__":
    asyncio.run(reset_database())
