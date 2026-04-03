import asyncio
from sqlalchemy import text
from database import engine

async def check():
    async with engine.begin() as conn:
        res = await conn.execute(text("SELECT id, title, duration FROM packages"))
        pkgs = res.fetchall()
        print(f"Total Packages: {len(pkgs)}")
        for pkg in pkgs:
            print(f"Package: {pkg.id} - {pkg.title} - Duration: {pkg.duration}")

if __name__ == "__main__":
    asyncio.run(check())
