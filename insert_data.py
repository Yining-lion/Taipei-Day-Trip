import json
import mysql.connector

con = mysql.connector.connect(
    user = "root",
    password = "1234",
    host = "localhost",
    database = "website"
)
cursor = con.cursor()

with open("./data/taipei-attractions.json", mode="r", encoding="utf-8") as response:
	file = json.load(response)
	attractions = file["result"]["results"]
      
# 準備 sql 語句	
sql = """
    INSERT INTO taipei_attractions 
    (id, name, description, category, address, transport, mrt, lat, lng, images)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
data = []
for attraction in attractions:
    id = attraction["_id"]
    name = attraction["name"]
    description = attraction["description"]
    category = attraction["CAT"]
    address = attraction["address"]
    transport= attraction["direction"]
    mrt = attraction["MRT"]
    lat = attraction["latitude"]
    lng = attraction["longitude"]
    images_list = attraction["file"].split("https") # ['', '://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D0/E197/F323/522aa425-345c-4ac4-96b8-b21a33f165ca.JPG', ...]
    filtered_list = list(filter(None, images_list)) # 去除空字串
    filtered_images = ["https" + img for img in filtered_list if img.lower().endswith((".jpg", ".png"))] # ['https://www.travel.taipei/d_upload_ttn/sceneadmin/image/A0/B0/C0/D0/E197/F323/522aa425-345c-4ac4-96b8-b21a33f165ca.JPG', ...]
    images = json.dumps(filtered_images)
    data.append((id, name, description, category, address, transport, mrt, lat, lng, images))
# print(data)

cursor.executemany(sql, data)
# con.commit()
cursor.close()
con.close()