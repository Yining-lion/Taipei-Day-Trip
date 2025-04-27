from models.user_model import sign_up_user, sign_in_user, get_current_user, update_user
from utils.user_schema import UserSignUp, UserSignIn
from fastapi import *
from typing import Annotated, Optional

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

# 更新會員資訊
@router.patch("/user")
async def update_user_router(
    current_user: Annotated[dict, Depends(get_current_user)],
    name: str = Form(...),
    email: str = Form(...),
    old_password: Optional[str] = Form(None),
    new_password: Optional[str] = Form(None),
    picture: Optional[UploadFile] = File(None)
    ):
    
    try:
        print("收到：", name, email, old_password, new_password, picture)
        if not name.strip() or not email.strip():
            return {"error": True, "message": "請輸入姓名及信箱"}
        
        user_data = {
            "name": name.strip(),
            "email": email.strip(),
            "old_password": old_password.strip() if old_password else None, # 直接呼叫 old_password.strip()，若它是 None 會報錯
            "new_password": new_password.strip() if new_password else None,
            "picture": picture  # UploadFile or None
        }
        
        await update_user(current_user["id"], user_data)
        return {"ok": True}
    
    except HTTPException as e:
        return {"error": True, "message": str(e)}

    except Exception as e:
        return {"error": True, "message": str(e)}