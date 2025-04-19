import { verifyToken } from "../services/authService.js";
import { getOrder } from "../models/thankyouModel.js"
import { renderContent } from "../views/thankuoyView.js"

export async function loadOrder() {
    let token = await verifyToken();
    if (!token) {
        location.href = "/";
        popupView.showSignin();
        popupEvents();
        return;
    }

    let params = new URLSearchParams(location.search);
    let orderNumber = params.get("number");

    let order = await getOrder(token, orderNumber)
    if (order.data !== null) {
        renderContent(orderNumber);
    } else {
        alert("沒有此訂單");
        location.href = "/";
    }
}
