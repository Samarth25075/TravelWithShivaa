import asyncio
import aiomysql

async def verify():
    print("Checking MySQL tables and counts in 'shive_travel'...")
    try:
        conn = await aiomysql.connect(
            user="root",
            password="test@123",
            host="localhost",
            port=3306,
            db="shive_travel"
        )
        async with conn.cursor() as cur:
            await cur.execute("SHOW TABLES")
            tables = await cur.fetchall()
            print("Tables found:", tables)
            
            for table_tuple in tables:
                table_name = table_tuple[0]
                await cur.execute(f"SELECT COUNT(*) FROM {table_name}")
                count = await cur.fetchone()
                print(f"Table '{table_name}' has {count[0]} records.")
                
        conn.close()
    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(verify())
