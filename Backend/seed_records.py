import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
import os

load_dotenv()

statuses = ["New", "Processed", "Archived", "Misrouted"]
templates = ["Claims Letter", "Acknowledgement", "Policy Update", "Renewal Notice", "Welcome Letter"]
modules = ["Claims", "Policy", "Customer", "Finance"]

async def seed():
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db = client[os.getenv("DB_NAME")]

    collection = "records_1"
    existing = await db[collection].count_documents({})
    if existing > 0:
        print(f"Records already exist ({existing} found), skipping.")
        return

    records = []
    for i in range(1, 26):
        records.append({
            "record_id": f"INC_2026_{400 + i}",
            "app_id": 1,
            "status": random.choice(statuses),
            "created_by": "admin",
            "created_at": datetime.utcnow() - timedelta(days=random.randint(0, 30)),
            "data": {
                "template_name": random.choice(templates),
                "module": random.choice(modules),
                "letter_group": "Acknowledgement",
            }
        })

    await db[collection].insert_many(records)
    print(f"✅ Seeded 25 sample records into {collection}")

asyncio.run(seed())