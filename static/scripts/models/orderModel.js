export async function getPrime() {
    return new Promise((resolve, reject) => {
        TPDirect.card.getPrime((result) => {
            if (result.status === 0) {
                resolve(result.card.prime);
            } else {
                reject(result.msg || "無法取得 Prime");
            }
        });
    });
}

export async function fetchAddOrder(token, data){
    try {
        let res = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        return await res.json();
    } catch (err) {
        console.error(err)
    }
}

export function buildOrderData(prime, bookingList, contact) {
    let trips = bookingList.map((booking) => ({
        attraction: {
            id: booking.attraction.id,
            name: booking.attraction.name,
            address: booking.attraction.address,
            image: booking.attraction.image,
        },
        date: booking.date,
        time: booking.time,
    }));

    let totalPrice = bookingList.reduce((sum, data) => sum + data.price, 0);

    return {
        prime: prime,
        order: {
            price: totalPrice,
            trips: trips
        },
        contact: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
        }
    };
}