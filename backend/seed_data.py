import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import AsyncSessionLocal, engine
import models

async def seed():
    async with AsyncSessionLocal() as db:
        # Check if Admin exists
        admin_result = await db.execute(select(models.AdminUser).where(models.AdminUser.username == "admin"))
        if not admin_result.scalar_one_or_none():
            from passlib.context import CryptContext
            pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            hashed_password = pwd_context.hash("admin")
            admin = models.AdminUser(username="admin", password=hashed_password)
            db.add(admin)
            await db.commit()
            print("Seeded default admin user (admin/admin).")

        # Check if packages exist
        result = await db.execute(select(models.Package))
        if len(result.scalars().all()) == 0:
            packages = [
                models.Package(
                    title="Goa Beach Paradise",
                    location="Goa, India",
                    price=15000.0,
                    description="Enjoy the sun, sand and sea in the most vibrant state of India. Perfect for relaxation and party lovers alike.",
                    image="goa.png",
                    status=True
                ),
                models.Package(
                    title="Majestic Manali",
                    location="Manali, India",
                    price=25000.0,
                    description="Experience the snowy peaks and adventurous trails of the Himalayas in beautiful Manali.",
                    image="manali.png",
                    status=True
                ),
                models.Package(
                    title="Taj Mahal Heritage Tour",
                    location="Agra, India",
                    price=12000.0,
                    description="Witness one of the seven wonders of the world and explore the rich Mughal history of Agra.",
                    image="taj_mahal.png",
                    status=True
                )
            ]
            db.add_all(packages)
            await db.commit()
            print(f"Seeded {len(packages)} packages to PostgreSQL.")
        else:
            print("Database already has packages.")

async def main():
    # Ensure tables are created
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)
    await seed()

if __name__ == "__main__":
    asyncio.run(main())
