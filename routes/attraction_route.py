from models.attraction_model import get_attractions, get_attraction_by_id, get_mrts
from fastapi import *
from typing import Annotated
import json

router = APIRouter(prefix="/api", tags=["attractions"])

@router.get("/attractions")
async def get_attractions_route(
    request: Request,
    page: Annotated[int, Query(ge=0)] = 0,
    keyword: Annotated[str, Query()] = None
):
    try:
        data_count = 12
        datas = await get_attractions(page, keyword) # 回傳 result 和 table_len 字典
        # 解析 images JSON 格式
        for data in datas["result"]:
            data["images"] = json.loads(data["images"])

        # 處理 nextPage
        next_page = page + 1
        if data_count * (page + 1) >= datas["table_len"]:
            next_page = None
        return {"nextPage": next_page, "data": datas["result"]}

    except Exception as e:
        return {"error": True, "message": str(e)}
    

@router.get("/attraction/{attractionId}")
async def get_attraction_route(
    request: Request,
    attractionId: Annotated[int, Path()]
):
    try:
        attraction = await get_attraction_by_id(attractionId)
        attraction["images"] = json.loads(attraction["images"])
        if attraction == None:
            return {"error": True, "message": "景點編號不正確"}
        return {"data": attraction}

    except Exception as e:
        return {"error": True, "message": str(e)}


@router.get("/mrts")
async def get_mrts_route(request: Request):
    try:
        result = await get_mrts()
        mrts = [row["mrt"] for row in result if row["mrt"] is not None]
        return {"data": mrts}

    except Exception as e:
        return {"error": True, "message": str(e)}

    