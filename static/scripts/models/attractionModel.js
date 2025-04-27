import { showLoading, hideLoading } from "../utils/loading.js";

export async function getAttraction(attractionId) {
    showLoading();
    try {
        const res = await fetch(`/api/attraction/${attractionId}`);
        const result = await res.json();
        return result;
    } catch (error) {
        console.log("加載景點數據出錯:", error)
    } finally {
        hideLoading();
    }
}