import { showLoading, hideLoading } from "../utils/loading.js";

export async function getBookings(token) {
    showLoading();
    try {
        let res = await fetch("/api/booking", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
}

export async function fetchAddBooking(token, data) {
    try {
        let res = await fetch("/api/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function fetchDeleteBooking(token, bookingId) {
    try {
        let res = await fetch(`/api/booking/${bookingId}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`},
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}

