from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from app.models.user import UserLogin, UserCreate
from app.auth.jwt import create_access_token, create_refresh_token, decode_token
from app.repositories.mongo_client import get_db

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
async def login(body: UserLogin):
    db = get_db()
    user = await db["users"].find_one({"username": body.username})

    if not user or not pwd_context.verify(body.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token_data = {"sub": user["username"], "roles": user.get("roles", [])}
    return {
        "access_token": create_access_token(token_data),
        "refresh_token": create_refresh_token(token_data),
        "expires_in": 3600,
        "user": {
            "id": str(user["_id"]),
            "name": user["username"],
            "roles": user.get("roles", [])
        }
    }

@router.post("/refresh")
async def refresh(body: dict):
    payload = decode_token(body.get("refresh_token"))
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    return {
        "access_token": create_access_token({
            "sub": payload["sub"],
            "roles": payload["roles"]
        })
    }

@router.post("/register")
async def register(body: UserCreate):
    db = get_db()
    existing = await db["users"].find_one({"username": body.username})
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed = pwd_context.hash(body.password)
    await db["users"].insert_one({
        "username": body.username,
        "email": body.email,
        "password_hash": hashed,
        "roles": body.roles
    })
    return {"message": "User created successfully"}