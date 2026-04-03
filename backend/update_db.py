import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

# Simplified connection string (sync or async)
DATABASE_URL = os.getenv("LOCAL_DATABASE_URL", "mysql+aiomysql://root:test%40123@localhost:3306/shive_travel")

async def update_database():
    print(f"Connecting to database: {DATABASE_URL}")
    engine = create_async_engine(DATABASE_URL, echo=True)
    try:
        async with engine.begin() as conn:
            # Check existing columns
            res = await conn.execute(text("DESCRIBE packages"))
            existing_columns = [r[0] for r in res.fetchall()]
            print(f"Existing columns: {existing_columns}")

            if 'duration' not in existing_columns:
                print("Adding 'duration' column...")
                await conn.execute(text("ALTER TABLE packages ADD COLUMN duration VARCHAR(100) AFTER exclusions"))
                print("✅ Added 'duration'")
            else:
                print("⚠️ 'duration' already exists")

            if 'group_size' not in existing_columns:
                print("Adding 'group_size' column...")
                await conn.execute(text("ALTER TABLE packages ADD COLUMN group_size VARCHAR(100) AFTER duration"))
                print("✅ Added 'group_size'")
            else:
                print("⚠️ 'group_size' already exists")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        await engine.dispose()
        print("Done.")

if __name__ == "__main__":
    asyncio.run(update_database())
