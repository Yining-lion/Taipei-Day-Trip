import { $ } from "../utils/selector.js";
import { getAttraction } from "../models/attractionModel.js";
import { escapeHTML } from "../utils/escapeHTML.js";
import { getAttractionId, renderAttractionSection, renderAttractionInfors, renderAttractionImages,
            switchImage, updatePrice
        } from "../views/attractionView.js";
import { verifyToken } from "../services/authService.js";
import { getBookings, fetchAddBooking, fetchDeleteBooking } from "../models/bookingModel.js";
import { popupView } from "../views/popupView.js";
import { popupEvents } from "../controllers/popupContro.js";

let currentIndex = { index: 0 }; // 包成物件以進行址拷貝 (pass-by-reference)，而非值拷貝 (pass-by-value)

export async function loadAttractionPage(){
    try{
        let attractionId = getAttractionId()
        let data = await getAttraction(attractionId)
        let attraction =  data.data;
        let {name = "", mrt = "", category = "", images = [], description = "", address = "", transport = ""} = attraction;
        let safe = (str) => escapeHTML(str || "");
        renderAttractionSection({
            name: safe(name),
            mrt: safe(mrt),
            category: safe(category)
        });
        renderAttractionInfors({
            description: safe(description),
            address: safe(address),
            transport: safe(transport)
        }
        );
        renderAttractionImages(images, currentIndex);
        imageSwitchEvents(images, currentIndex);
        updatePriceEvents();
        startBooking()
    }catch(error){
        console.log("加載景點數據出錯:", error)
    }
}

function startBooking(){
    try {
        $(".booking_btn").addEventListener("click", async (e) => {
            e.preventDefault();
            let attractionId = getAttractionId() 
            let date = $(".date_input").value;
            let time = $("#morning").checked ? "morning" : "afternoon"
            let price = $("#morning").checked ? 2000 : 2500
            let data = {attractionId, date, time, price} 

            if(!date){ 
                alert("請選擇日期");
                return;
            }

            let token = await verifyToken();
            if (!token) {
                popupView.showSignin();
                popupEvents();
                return;
            }

            let bookedDatas = await getBookings(token);

            // 檢查是否已有相同 date + time 的預約
            for (let bookedData of bookedDatas.data) {
                if (bookedData.date === date && bookedData.time === time) {
                    let isConfirmed = confirm("此時段已有預約，確定要改預約新景點嗎？");
                    if (!isConfirmed) return;

                    // 刪除同時段舊的預約
                    await fetchDeleteBooking(token, bookingId)
                    break; // 找到第一筆就停止
                }
            }

            // 新增新的預約
            await fetchAddBooking(token, data);

            location.href = "/booking";
        })

    } catch(error) {
        console.log("預約出錯:", error)
    };
}

function imageSwitchEvents(images, currentIndex) {
    $(".btn_rightArrow").addEventListener("click", () => {
        switchImage(1, images, currentIndex);
    });
    $(".btn_leftArrow").addEventListener("click", () => {
        switchImage(-1, images, currentIndex);
    });
}

function updatePriceEvents() {
    $("#morning").addEventListener("change", updatePrice)
    $("#afternoon").addEventListener("change", updatePrice)
}