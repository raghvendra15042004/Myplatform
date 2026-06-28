from fastapi import HTTPException

HANDLER_MAP = {
    # handlers will be added here as we build services
}

async def dispatch(req_id: str, payload: dict, user: dict):
    handler = HANDLER_MAP.get(req_id)
    if not handler:
        raise HTTPException(status_code=400, detail=f"Unknown reqId: {req_id}")
    return await handler(payload, user)