# Local Data Checker
import asyncio
import aiomysql
import os
from dotenv import load_dotenv

load_dotenv()

async def check_data():
    print("🔍 Checking MySQL 'shiv_travel_db' contents...")
    try:
        conn = await aiomysql.connect(
            user="root",
            password="test@123",
            host="127.0.0.1",
            db="shiv_travel_db"
        )
        
        async with conn.cursor() as cur:
            # Check Admin table
            await cur.execute("SELECT COUNT(*) FROM admin_users")
            admin_count = await cur.fetchone()
            print(f"👤 Admin Users found: {admin_count[0]}")
            
            # Check Packages table
            await cur.execute("SELECT id, title, status FROM packages")
            packages = await cur.fetchall()
            print(f"📦 Packages found: {len(packages)}")
            for pkg in packages:
                print(f"   - #{pkg[0]} {pkg[1]} (Status: {pkg[2]})")
            
        conn.close()
        
    except Exception as e:
        print(f"❌ Error checking data: {e}")

if __name__ == "__main__":
    asyncio.run(check_data())
