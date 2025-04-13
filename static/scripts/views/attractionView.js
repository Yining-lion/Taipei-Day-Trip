import {$} from "../utils/selector.js"

// 取得 attraction ID
export function getAttractionId() {
    let pathname = location.pathname;
    let attractionId = pathname.split("/").pop();
    return attractionId;
}

// 處理上方 section
export function renderAttractionSection({ name, mrt, category }) {

    let sectionHTML = `
        <div class="section_left">
            <div class="attraction_images"></div>
            <img class="btn_leftArrow" src="/static/data/images/btn_leftArrow.png">
            <img class="btn_rightArrow" src="/static/data/images/btn_rightArrow.png">
            <div class="circles"></div>
        </div>
        <div class="profile">
            <p class="dialog-title-bold attraction_name">${name}</p>
            <p class="body-medium attraction_category_mrt">${category}${mrt ? ` at ${mrt}` : ""}</p>
            <form id="booking_form" class="booking_form">
                <p class="body-bold">訂購導覽行程</p>
                <p class="body-medium subtitle">以此景點為中心的一日行程，帶您探索城市角落故事</p>
                <div class="select_date">
                    <p class="body-bold">選擇日期：</p>
                    <input class="date_input body-medium" name="date" type="date">
                </div>
                <div class="select_time">
                    <p class="body-bold">選擇時間：</p>
                    <input class="body-medium" id="morning" name="time" type="radio" checked>
                    <label class="body-medium" for="morning">上半天</label>
                    <input class="body-medium" id="afternoon" name="time" type="radio">
                    <label class="body-medium" for="afternoon">下半天</label>
                </div>
                <div class="guide_cost">
                    <p class="body-bold">導覽費用：</p>
                    <p class="body-medium price">新台幣 2000 元</p>
                </div>
                <button class="booking_btn btn-booking button-regular">開始預約行程</button>
            </form>
        </div>
    `;
    $(".section").insertAdjacentHTML("afterbegin", sectionHTML);
}

export function renderAttractionImages(images, currentIndex) {
    $(".attraction_images").innerHTML = "";
    images.forEach((imgUrl, index) => {
        let img = document.createElement("img");
        img.src = imgUrl;
        img.className = `attraction_img attraction_img${index}`;
        img.style.opacity = index === 0 ? "1" : "0";
        $(".attraction_images").appendChild(img);
    });
    updateCircles(images, currentIndex)
}

// 處理下方 infors
export function renderAttractionInfors({ description, address, transport }) {

    let inforsHTML = `
    <p class="attraction_desctiption content-regular">${description}</p>
    <p class="body-bold">景點地址：</p>
    <p class="attraction_address content-regular">${address} </p>
    <p class="body-bold">交通方式：</p>
    <p class="attraction_transport content-regular">${transport} </p>`;

    $(".infors").insertAdjacentHTML("afterbegin", inforsHTML);

}

// 圖片切換邏輯
export function switchImage(direction, images, currentIndex) {
    let current = currentIndex.index
    $(`.attraction_img${current}`).style.opacity = "0";
    current = (current + direction + images.length) % images.length;
    currentIndex.index = current;
    $(`.attraction_img${current}`).style.opacity = "1";
    updateCircles(images, currentIndex);
}

export function updatePrice(){
    let price = $("#morning").checked ? "新台幣 2000 元" : "新台幣 2500 元";
    $(".price").textContent = price;
}

function updateCircles(images, currentIndex) {
    let current = currentIndex.index
    $(".circles").innerHTML = "";
    images.forEach((_, index) => {
        let circle = document.createElement("img");
        circle.src = index === current
            ? "/static/data/images/circle current.png"
            : "/static/data/images/circle.png";
        $(".circles").appendChild(circle);
    });
}