from fastapi import APIRouter, Depends
from app.models.gateway import GatewayRequest
from app.gateway.dispatcher import dispatch
from app.auth.dependencies import get_current_user

router = APIRouter()

@router.post("/gateway")
async def gateway(request: GatewayRequest, user=Depends(get_current_user)):
    return await dispatch(request.req_id, request.payload, user)