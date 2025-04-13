from utils.database import get_connection

base_sql = "SELECT id, name, description, category, address, transport, mrt, images FROM taipei_attractions "

async def get_attractions(page: int, keyword: str):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        # 處理 page：要取得的分頁，每頁 12 筆資料
        data_count = 12
        offset = data_count * page
        cursor.execute(base_sql + "LIMIT %s OFFSET %s", (data_count, offset))
        result = cursor.fetchall()

        # 計算 table 總數量
        cursor.execute("SELECT COUNT(*) FROM taipei_attractions")
        table_len = cursor.fetchone()["COUNT(*)"]

        # 處理 keyword：用來完全比對捷運站名稱、或模糊比對景點名稱的關鍵字，沒有給定則不做篩選
        if keyword:
            cursor.execute(base_sql + "WHERE mrt = %s OR name LIKE %s LIMIT %s OFFSET %s", (keyword, f"%{keyword}%", data_count, offset))
            result = cursor.fetchall()
            # 計算符合 keyword 條件的總數量
            cursor.execute("SELECT COUNT(*) FROM taipei_attractions WHERE mrt = %s OR name LIKE %s", (keyword, f"%{keyword}%"))
            table_len = cursor.fetchone()["COUNT(*)"]

        return {"result": result, "table_len": table_len}

    finally:
        cursor.close()
        cnx.close()

async def get_attraction_by_id(attractionId: int):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(base_sql + "WHERE id = %s", (attractionId,))
        attraction = cursor.fetchone()
        return attraction

    finally:
        cursor.close()
        cnx.close()

async def get_mrts():
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT mrt, COUNT(*) AS attraction_count FROM taipei_attractions
                          GROUP BY mrt ORDER BY attraction_count DESC""")
        result = cursor.fetchall()  # [{'mrt': '新北投', 'attraction_count': 6}, ...]
        return result

    finally:
        cursor.close()
        cnx.close()