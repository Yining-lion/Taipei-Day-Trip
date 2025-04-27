import { $ } from "../utils/selector.js";
import { showLoading, hideLoading } from "../utils/loading.js";
import { showLoadingBtn, deleteLoadingBtn } from "../utils/loading.js";

export async function updateProfile(token, formData) {
    showLoadingBtn($(".update_btn"))
    try {
        let res = await fetch("/api/user", {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    } finally {
        deleteLoadingBtn($(".update_btn"));
    }
}

export async function getOrderNumbers(token) {
    showLoading();
    try {
        let res = await fetch("/api/order/numbers", {
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

export async function getOrders(token, ordetNum) {
    showLoading();
    try {
        let res = await fetch(`/api/order?number=${ordetNum}`, {
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