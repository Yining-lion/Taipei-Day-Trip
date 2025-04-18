from models.user_model import get_current_user
from models.order_model import save_order, get_order
from models.order_model import OrderRequest
from fastapi import *
from typing import Annotated
import os
import httpx
from datetime import datetime
import random, string

router = APIRouter(prefix="/api", tags=["order"])

TAPPAY_PARTNER_KEY = os.getenv("TAPPAY_PARTNER_KEY")
TAPPAY_API_URL = "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"

# 建立新訂單，並完成付款程序
@router.post("/orders")
async def create_order(
    current_user: Annotated[dict, Depends(get_current_user)],
    order: OrderRequest
):
    try:
        # 建立 TapPay 請求資料
        tappay_payload = {
            "prime": order.prime,
            "partner_key": TAPPAY_PARTNER_KEY,
            "merchant_id": "Yining7_CTBC",
            "details": "TapPay Test",
            "amount": order.order.price,
            "cardholder": {
                "phone_number": order.contact.phone,
                "name": order.contact.name,
                "email": order.contact.email,
            },
            "remember": False
        }

        async with httpx.AsyncClient() as client:
            tappay_response = await client.post(
                TAPPAY_API_URL,
                json=tappay_payload,
                headers={
                    "Content-Type": "application/json",
                    "x-api-key": TAPPAY_PARTNER_KEY
                }
            )

        tappay_data = tappay_response.json()

        if tappay_data.get("status") == 0:
            order_number = generate_order_number()

            await save_order(order_number, current_user["id"],  order)
            return {
                "data": {
                    "number": order_number,
                    "payment": {
                        "status": 0,
                        "message": "付款成功"
                    }
                }
            }
        
        else:
            return {
                "data": {
                    "number": None,
                    "payment": {
                        "status": tappay_data.get("status"),
                        "message": tappay_data.get("msg", "付款失敗")
                    }
                }
            }

    except Exception as e:
        return {"error": True, "message": str(e)}

@router.get("/order")
async def get_order_route(
    current_user: Annotated[dict, Depends(get_current_user)],
    number: Annotated[str, Query()],
):
    try:

        orders = await get_order(number)

        if not orders:
            return {"data": None}

        # contact 與訂單資訊：每一筆都一樣，取第一筆即可
        first = orders[0]
        contact = {
            "name": first["contact_name"],
            "email": first["contact_email"],
            "phone": first["contact_phone"]
        }

        # 多筆行程
        trips = []
        for order in orders:
            images = order.loads(order["images"])
            trips.append({
                "attraction": {
                    "id": order["attraction_id"],
                    "name": order["name"],
                    "address": order["address"],
                    "image": images[0]
                },
                "date": order["date"],
                "time": order["time"]
            })

        return {
            "data": {
                "number": first["order_number"],
                "price": first["price"],
                "trips": trips,
                "contact": contact,
                "status": first["status"]
            }
        }
    
    except Exception as e:
        return {"error": True, "message": str(e)}
    
def generate_order_number():
    date_str = datetime.now().strftime("%Y%m%d%H%M%S%f")[:-3]  # 到毫秒 (刪掉最後3位微秒)
    rand_str = "".join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"{date_str}-{rand_str}"