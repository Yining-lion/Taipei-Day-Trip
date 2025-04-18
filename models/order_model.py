from utils.database import get_connection
from pydantic import BaseModel
from typing import List


class Contact(BaseModel):
    name: str
    email: str
    phone: str

class Attraction(BaseModel):
    id: int
    name: str
    address: str
    image: str

class Trip(BaseModel):
    attraction: Attraction
    date: str
    time: str

class OrderDetail(BaseModel):
    trips: List[Trip]
    price: int

class OrderRequest(BaseModel):
    prime: str
    order: OrderDetail
    contact: Contact

async def save_order(order_number, user_id,  order_data):
    order_price = order_data.order.price
    contact = order_data.contact
    trips = order_data.order.trips
    order_status = "1"

    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)

        insert_order = """INSERT INTO orders (order_number, user_id, price, status, contact_name, contact_email, contact_phone)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        cursor.execute(insert_order, (order_number, user_id, order_price, order_status, contact.name, contact.email, contact.phone))

        order_id = cursor.lastrowid  # 使用自動生成的 id
        print(order_id)

        # 插入每一筆行程細節
        insert_detail = """INSERT INTO order_details (order_id, attraction_id, date, time) VALUES (%s, %s, %s, %s)"""

        for trip in trips:
            cursor.execute(insert_detail, (order_id, trip.attraction.id, trip.date, trip.time))

        cursor.execute("DELETE FROM bookings WHERE user_id = %s", (user_id,))

        cnx.commit()
        return order_number

    except Exception as e:
        cnx.rollback()
        raise e
        
    finally:
        cursor.close()
        cnx.close()

async def get_order(order_number):

    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)

        select_order = """SELECT orders.order_number, orders.price, orders.status, orders.contact_name ,orders.contact_email ,orders.contact_phone,
                            order_details.attraction_id ,order_details.date ,order_details.time,
                            taipei_attractions.name ,taipei_attractions.address ,taipei_attractions.images
                            FROM orders
                            INNER JOIN order_details ON orders.id = order_details.order_id
                            INNER JOIN taipei_attractions ON order_details.attraction_id = taipei_attractions.id
                            WHERE order_number = %s"""
        cursor.execute(select_order, (order_number, ))
        result = cursor.fetchall()

        return result
        
    finally:
        cursor.close()
        cnx.close()