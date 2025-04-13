from dotenv import load_dotenv
import mysql.connector.pooling
import os

# 載入環境變數
load_dotenv()

# 建立連線池
dbconfig = {
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "database": os.getenv("DB_NAME")
}
cnxpool = mysql.connector.pooling.MySQLConnectionPool(
    pool_name="mypool",
    pool_size=int(os.getenv("DB_POOL_SIZE")),
    **dbconfig
)

def get_connection():
    return cnxpool.get_connection()