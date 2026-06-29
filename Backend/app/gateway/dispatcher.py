from fastapi import HTTPException
from app.services import inbox_service

HANDLER_MAP = {
    "GET_INBOX_KPI":     inbox_service.get_kpi,
    "GET_INBOX_RECORDS": inbox_service.get_records,
}

async def dispatch(req_id: str, payload: dict, user: dict):
    handler = HANDLER_MAP.get(req_id)
    if not handler:
        raise HTTPException(status_code=400, detail=f"Unknown reqId: {req_id}")
    return await handler(payload, user)