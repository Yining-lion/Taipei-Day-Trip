from fastapi import *
from fastapi.responses import FileResponse
import mysql.connector.pooling
from typing import Annotated
import json

app=FastAPI()

# 建立連線池
dbconfig = {
    "user": "root",
    "password": "1234",
    "host": "localhost",
    "database": "website"
}
cnxpool = mysql.connector.pooling.MySQLConnectionPool(
	pool_name="mypool",
	pool_size=10,
	**dbconfig
)
cnx = cnxpool.get_connection()

base_sql = "SELECT id, name, description, category, address, transport, mrt, lat, lng, images FROM taipei_attractions "

@app.get("/api/attractions")
async def getAttractions(
	request: Request,
	page: Annotated[int, Query(ge=0)] = 0,
	keyword: Annotated[str, Query()] = None
):
	try:
		cnx = cnxpool.get_connection()
		cursor = cnx.cursor(dictionary=True)
		# 處理 page：要取得的分頁，每頁 12 筆資料
		data_count = 12
		offset = data_count * page
		cursor.execute(base_sql + "LIMIT %s OFFSET %s",(data_count, offset))
		result = cursor.fetchall()
		# 計算符合 table 總數量
		cursor.execute("SELECT COUNT(*) FROM taipei_attractions")
		table_len = cursor.fetchone()["COUNT(*)"]

		# 處理 keyword：用來完全比對捷運站名稱、或模糊比對景點名稱的關鍵字，沒有給定則不做篩選
		if keyword:
			cursor.execute(base_sql + "WHERE mrt = %s OR name LIKE %s LIMIT %s OFFSET %s",(keyword, f"%{keyword}%", data_count, offset))
			result = cursor.fetchall()
			# 計算符合 keyword 條件的總數量
			cursor.execute("SELECT COUNT(*) FROM taipei_attractions WHERE mrt = %s OR name LIKE %s", (keyword, f"%{keyword}%"))
			table_len = cursor.fetchone()["COUNT(*)"]

		# 解析 images JSON 格式
		for row in result:
			row["images"] = json.loads(row["images"])
		
		# 處理 nextPage
		next_page = page + 1
		if data_count * (page+1) >= table_len:
			next_page = None
		return {"nextPage": next_page, "data": result}
	
	except Exception as e:
		return {"error": True, "message": str(e)}

	finally:
		cursor.close()
		cnx.close()

@app.get("/api/attraction/{attractionId}")
async def getAttraction(
	request: Request,
	attractionId: Annotated[int, Path()]
):
	try:
		cnx = cnxpool.get_connection()
		cursor = cnx.cursor(dictionary=True)
		cursor.execute(base_sql + "WHERE id = %s",(attractionId,))
		attraction = cursor.fetchone()
		if attraction == None:
			return {"error": True, "message": "景點編號不正確"}
		
		return {"data": attraction}
	
	except Exception as e:
		return {"error": True, "message": str(e)}

	finally:
		cursor.close()
		cnx.close()

@app.get("/api/mrts")
async def getMrts(request: Request,):
	try:
		cnx = cnxpool.get_connection()
		cursor = cnx.cursor(dictionary=True)
		cursor.execute("""SELECT mrt, COUNT(*) AS attraction_count FROM taipei_attractions
				 		  GROUP BY mrt ORDER BY attraction_count DESC""")
		result = cursor.fetchall() # [{'mrt': '新北投', 'attraction_count': 6}, ...]
		mrts = [row["mrt"]for row in result if row["mrt"] is not None]
		return {"data": mrts}
	
	except Exception as e:
		return {"error": True, "message": str(e)}

	finally:
		cursor.close()
		cnx.close()

# Static Pages (Never Modify Code in this Block)
@app.get("/", include_in_schema=False)
async def index(request: Request):
	return FileResponse("./static/index.html", media_type="text/html")
@app.get("/attraction/{id}", include_in_schema=False)
async def attraction(request: Request, id: int):
	return FileResponse("./static/attraction.html", media_type="text/html")
@app.get("/booking", include_in_schema=False)
async def booking(request: Request):
	return FileResponse("./static/booking.html", media_type="text/html")
@app.get("/thankyou", include_in_schema=False)
async def thankyou(request: Request):
	return FileResponse("./static/thankyou.html", media_type="text/html")