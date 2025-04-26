import { $ } from "../utils/selector.js"
import { verifyToken } from "../services/authService.js";
import { popupView } from "../views/popupView.js"
import { popupEvents } from "../controllers/popupContro.js"
import { getCurrentUser } from "../models/userModel.js"; 
import { getBookings, fetchDeleteBooking } from "../models/bookingModel.js";
import { renderBookings } from "../views/bookingView.js";
import { fillUserInfo } from "../utils/fillUserInfor.js";
import { handleTappay } from "./orderContro.js";


export function JumpToBooking(){
    $(".booking_text").addEventListener("click", async () => {
        let token = await verifyToken()
        if (!token) {
            popupView.showSignin();
            popupEvents();
            return;
        };
        location.href = "/booking";
    })
}

export async function loadBookings() {
    let token = await verifyToken();
    if (!token) {
        location.href = "/";
        popupView.showSignin();
        popupEvents();
        return;
    }
    let user = await getCurrentUser(token);
    let data = await getBookings(token);
    renderBookings(user.data.name, data.data);
    fillUserInfo($("input[name='contact_name']"), $("input[name='contact_email']"), user.data);
    bindDeleteBookingEvent();
    handleTappay();
    localStorage.setItem("bookingList", JSON.stringify(data.data));
}

function bindDeleteBookingEvent() {
    document.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            let bookingId = btn.dataset.bookingid;
            await deleteBooking(bookingId);
        });
    });
}

async function deleteBooking(bookingId){
    try {
        let token = await verifyToken();
        if (!token) {
            popupView.showSignin();
            popupEvents();
            return;
        }
        await fetchDeleteBooking(token, bookingId)
        location.reload();

    } catch(error) {
        console.log("預約刪除出錯:", error)
    };
}

