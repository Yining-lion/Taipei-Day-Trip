import { $ } from "../utils/selector.js";
import { showLoadingBtn, deleteLoadingBtn } from "../utils/loading.js";
import { showLoading, hideLoading } from "../utils/loading.js";

export async function signup({ name, email, password }) {
    showLoadingBtn($(".signup_btn"));
    try {
        let res = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    } finally {
        deleteLoadingBtn($(".signup_btn"));
    }
}

export async function signin({ email, password }) {
    showLoadingBtn($(".signin_btn"));
    try {
        let res = await fetch("/api/user/auth", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    } finally {
        deleteLoadingBtn($(".signin_btn"));
    }
}

export async function getCurrentUser(token) {
    showLoading();
    try {
        let res = await fetch("/api/user/auth", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        return await res.json();
    } catch (err) {
        console.error(err);
    } finally {
        hideLoading();
    }
}