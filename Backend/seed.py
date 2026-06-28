import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

load_dotenv()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed():
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db = client[os.getenv("DB_NAME")]

    existing = await db["users"].find_one({"username": "admin"})
    if existing:
        print("Admin user already exists")
        return

    await db["users"].insert_one({
        "username": "admin",
        "email": "admin@pzeon.com",
        "password_hash": pwd_context.hash("admin123"),
        "roles": ["admin", "designer", "viewer"]
    })
    print("✅ Admin created — username: admin | password: admin123")

asyncio.run(seed())