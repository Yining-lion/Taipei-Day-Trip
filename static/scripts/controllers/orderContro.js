import { $ } from "../utils/selector.js";
import { verifyToken } from "../services/authService.js";
import { popupView } from "../views/popupView.js";
import { popupEvents } from "./popupContro.js";
import { getPrime, fetchAddOrder, buildOrderData } from "../models/orderModel.js";
import { setupTapPay } from "../views/orderView.js";

export function handleTappay(){
    TPDirect.setupSDK(159819, "app_LVeUQx9NbGKI7qRUb5yeWVksakIhaSyrEUOUqLfHvQcZ7YBDrgFtSOl3ffBH", "sandbox")
    setupTapPay();
    paymentListener();
}


export function paymentListener() {
    $(".pay_btn").addEventListener("click", async (e) => {
        e.preventDefault();

        let token = await verifyToken();
        if (!token) {
            popupView.showSignin();
            popupEvents();
            return;
        }

        await onSubmit(token);
    });
}


async function onSubmit(token) {

    // 取得 TapPay Fields 的 status
    let tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (!tappayStatus.canGetPrime) {
        alert("請正確填寫信用卡資訊");
        return;
    }

    try {
    // Get prime
    let prime = await getPrime();

    // 處理聯絡資訊
    let contactName  = $("input[name='contact_name']").value.trim();
    let contactEmail  = $("input[name='contact_email']").value.trim();
    let contactPhone  = $("input[name='contact_phone']").value.trim();
    if (!contactName || !contactEmail || !contactPhone) {
        alert("請完整填寫聯絡資訊");
        return;
    }
    let contact = {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
    };
    // 處理待預訂的行程
    let bookingList = JSON.parse(localStorage.getItem("bookingList"));
    if (bookingList.length === 0) {
        alert("沒有可付款的行程");
        return;
    }
    // 送資料至後端
    let orderData = buildOrderData(prime, bookingList, contact);
    let res = await fetchAddOrder(token, orderData);
    console.log(res)
    // if (res !== undefined && res.data !== undefined && res.data.number !== undefined) 同等以下
    if (res?.data?.number) { 
        localStorage.removeItem("bookingList");
        location.href = `/thankyou?number=${res.data.number}`;
    } else {
        alert("付款失敗，請稍後再試");
    }

    } catch(err) {
        console.error("付款錯誤：", err);
        alert("付款失敗，請稍後再試");
    }
}