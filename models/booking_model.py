from utils.database import get_connection
from pydantic import BaseModel

class BookingRequest(BaseModel):
    attractionId: int
    date: str
    time: str
    price: int

async def create_booking(user_id,  booking_data):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("INSERT INTO bookings (user_id, attraction_id, date, time, price) VALUES (%s, %s, %s, %s, %s)",
                        (user_id, booking_data.attractionId, booking_data.date, booking_data.time, booking_data.price))
        cnx.commit()
        
    finally:
        cursor.close()
        cnx.close()

async def get_booking(user_id):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("""SELECT bookings.id AS booking_id, taipei_attractions.id AS attraction_id, taipei_attractions.name, taipei_attractions.address, taipei_attractions.images,
                            bookings.date, bookings.time, bookings.price
                            FROM bookings
                            INNER JOIN taipei_attractions ON bookings.attraction_id = taipei_attractions.id
                            INNER JOIN users ON bookings.user_id = users.id
                            WHERE users.id = %s""", (user_id, )
                        )
        result = cursor.fetchall()
        return result
        
    finally:
        cursor.close()
        cnx.close()

async def delete_booking(user_id, booking_id):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("DELETE FROM bookings WHERE user_id = %s AND id = %s", (user_id, booking_id))
        cnx.commit()
        
    finally:
        cursor.close()
        cnx.close()

async def check_booking_for_user(user_id, booking_id):
    try:
        cnx = get_connection()
        cursor = cnx.cursor(dictionary=True)
        cursor.execute("SELECT * FROM bookings WHERE user_id = %s AND id = %s", (user_id, booking_id))
        booking = cursor.fetchone()
        return booking

    finally:
        cursor.close()
        cnx.close()