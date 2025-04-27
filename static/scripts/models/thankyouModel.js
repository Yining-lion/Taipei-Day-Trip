import { showLoading, hideLoading } from "../utils/loading.js";

export async function getOrder(token, orderNumber) {
    showLoading();
    try {
        let res = await fetch(`/api/order?number=${orderNumber}`, {
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