from fastapi import *
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from jwt.exceptions import InvalidTokenError
import jwt
import os

# 從 HTTP Header 的 Authorization 抓出 token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/auth")

# 設置 JWT 參數
SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_DAYS = 7

# 產生 JWT Token
def create_access_token(data: dict):
    to_encode = data.copy()  # 創建一個 data 字典的淺拷貝，避免修改原始 data 字典
    expire = datetime.now(timezone.utc) + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)  # 計算過期時間
    to_encode.update({"exp": expire})  # 更新過期時間
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # 編碼 JWT
    return encoded_jwt  # print 出 Header.Payload.Signature

# 驗證 token 並回傳使用者資料
async def verify_token(token: str = Depends(oauth2_scheme)):
    # 建立例外錯誤物件
    credentials_exception = HTTPException(
        status_code=401,
        detail="無效的驗證憑證",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)  # 解碼 JWT token，驗證它的 signature 是否正確
        user_id = payload.get("id")  # 取得登入時 create_access_token() 傳入至 payload 的 data id
        if user_id is None:
            raise credentials_exception
        return user_id
    except InvalidTokenError:
        raise credentials_exception