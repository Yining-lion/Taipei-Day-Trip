from models.user_model import sign_up_user, sign_in_user, get_current_user
from utils.user_schema import UserSignUp, UserSignIn
from fastapi import *
from typing import Annotated

router = APIRouter(prefix="/api", tags=["user"])

# 註冊 API
@router.post("/user")
async def sign_up(user: UserSignUp):
    return await sign_up_user(user)

# 登入 API
@router.put("/user/auth")
async def sign_in(user: UserSignIn):
    return await sign_in_user(user)

# 取得當前登入的會員資訊
@router.get("/user/auth")
async def get_user(current_user: Annotated[dict, Depends(get_current_user)]):
    return {"data": current_user}