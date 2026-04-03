# MySQL Automation Script
import asyncio
import aiomysql
import os
from dotenv import load_dotenv

load_dotenv()

async def create_database():
    print("Connecting to local MySQL (root)...")
    try:
        # Connect to MySQL (no DB name yet)
        conn = await aiomysql.connect(
            user="root",
            password="test@123",
            host="localhost",
            port=3306,
            autocommit=True # Important for CREATE DATABASE
        )
        
        async with conn.cursor() as cur:
            # Check if database exists
            db_name = "shive_travel"
            print(f"Creating/Verifying database: {db_name}")
            await cur.execute(f"SHOW DATABASES LIKE '{db_name}'")
            exists = await cur.fetchone()
            
            if not exists:
                await cur.execute(f"CREATE DATABASE {db_name}")
                print(f"✅ Successfully created '{db_name}' in MySQL!")
            else:
                print(f"ℹ️ Database '{db_name}' already exists.")
            
        conn.close()
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n💡 TIP: Please ensure your MySQL Workbench is running on port 3306 and your user is 'root'.")

if __name__ == "__main__":
    asyncio.run(create_database())
