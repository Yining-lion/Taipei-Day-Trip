from utils.database import get_connection
from utils.jwt_auth import create_access_token, verify_token
from utils.user_schema import UserSignUp, UserSignIn
from fastapi import *
from passlib.context import CryptContext

# 密碼使用 bcrypt 加鹽雜湊加密
pwd_context = CryptContext(
    schemes=["bcrypt"],
    bcrypt__rounds=10,
    deprecated="auto"
)

async def sign_up_user(user: UserSignUp):
    try:
        cnx = get_connection()
        cursor = cnx.cursor()
        cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            return {"error": True, "message": "註冊失敗，Email已被註冊過"}

        hashed_password = pwd_context.hash(user.password)
        cursor.execute("INSERT INTO users (name, email, hashed_password) VALUES (%s, %s, %s)", (user.name, user.email, hashed_password))
        cnx.commit()
        return {"ok": True}

    except Exception as e:
        return {"error": True, "message": str(e)}

    finally:
        cursor.close()
        cnx.close()

async def sign_in_user(user: UserSignIn):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, hashed_password FROM users WHERE email = %s", (user.email,))
        user_data = cursor.fetchone()
        if user_data == None or pwd_context.verify(user.password, user_data['hashed_password']) == False:
            return {"error": True, "message": "登入失敗，帳號或密碼輸入錯誤"}
        token = create_access_token({"id": user_data["id"], "name": user_data["name"], "email": user_data["email"]})
        return {"token": token}

    except Exception as e:
        return {"error": True, "message": str(e)}

    finally:
        cursor.close()
        cnx.close()

async def get_current_user(user_id: int = Depends(verify_token)): 
    # 成功解析 token 後，從資料庫取得使用者資訊
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="使用者不存在")
        return user
    finally:
        cursor.close()
        cnx.close()