from pydantic import BaseModel
from typing import Any

class GatewayRequest(BaseModel):
    req_id: str
    payload: dict[str, Any] = {}