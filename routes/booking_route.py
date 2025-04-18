
from models.booking_model import BookingRequest, create_booking, get_booking, delete_booking, check_booking_for_user
from models.user_model import get_current_user
from fastapi import *
from typing import Annotated
import json

router = APIRouter(prefix="/api", tags=["booking"])

# 建立新的預定行程資訊
@router.post("/booking")
async def create_booking_route(
    current_user: Annotated[dict, Depends(get_current_user)],
    booking_data: BookingRequest
):
    try: 
        if not booking_data.attractionId or not booking_data.date or not booking_data.time or not booking_data.price:
            return {"error": True, "message": "請輸入完整預定資訊"}
        
        await create_booking(current_user["id"], booking_data)
        return {"ok": True}
        
    except Exception as e:
        return {"error": True, "message": str(e)}

# 取得尚未確認下單的預定行程
@router.get("/booking")
async def get_booking_route(current_user: Annotated[dict, Depends(get_current_user)]):
    try: 
        datas = await get_booking(current_user["id"]) # 回傳多筆資料 
        # print(datas)
        # 解析 images JSON 格式
        for data in datas:
            data["images"] = json.loads(data["images"])

        return {
            "data": [
                {
                    "booking_id": data["booking_id"],
                    "attraction": {
                        "id": data["attraction_id"],
                        "name": data["name"],
                        "address": data["address"],
                        "image": data["images"][0]
                    }, 
                    "date": data["date"], 
                    "time": data["time"], 
                    "price": data["price"]
                } for data in datas
            ]
        }
        
    except Exception as e:
        return {"error": True, "message": str(e)}

@router.delete("/booking/{booking_id}")
async def delete_booking_route(
    current_user: Annotated[dict, Depends(get_current_user)],
    booking_id: Annotated[int, Path()]
    ):
    try:
        booking = await check_booking_for_user(current_user["id"], booking_id)
        
        if not booking:
            return {"error": True, "message": "你沒有此景點的預約，無法刪除"}

        await delete_booking(current_user["id"], booking_id)
        return {"ok": True}
        
    except Exception as e:
        return {"error": True, "message": str(e)}   