from app.repositories.mongo_client import get_db
from math import ceil

async def get_kpi(payload: dict, user: dict):
    db = get_db()
    app_id = payload.get("appId", 1)
    collection = f"records_{app_id}"

    total = await db[collection].count_documents({})
    new = await db[collection].count_documents({"status": "New"})
    processed = await db[collection].count_documents({"status": "Processed"})
    archived = await db[collection].count_documents({"status": "Archived"})
    misrouted = await db[collection].count_documents({"status": "Misrouted"})

    return {
        "total": total,
        "new": new,
        "processed": processed,
        "archived": archived,
        "misrouted": misrouted,
    }

async def get_records(payload: dict, user: dict):
    db = get_db()
    app_id = payload.get("appId", 1)
    page = payload.get("page", 1)
    page_size = payload.get("pageSize", 10)
    status_filter = payload.get("status")
    search = payload.get("search")

    collection = f"records_{app_id}"
    query = {}

    if status_filter:
        query["status"] = status_filter
    if search:
        query["$or"] = [
            {"record_id": {"$regex": search, "$options": "i"}},
            {"data.template_name": {"$regex": search, "$options": "i"}},
        ]

    total = await db[collection].count_documents(query)
    skip = (page - 1) * page_size

    cursor = db[collection].find(query).sort("created_at", -1).skip(skip).limit(page_size)
    records = []

    async for r in cursor:
        r["_id"] = str(r["_id"])
        records.append(r)

    return {
        "records": records,
        "total": total,
        "page": page,
        "pageSize": page_size,
        "totalPages": ceil(total / page_size) if total > 0 else 1,
    }