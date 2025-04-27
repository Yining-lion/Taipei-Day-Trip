import { $ } from "../utils/selector.js"

export function renderProfile(user) {
    let picture = user.picture ? user.picture : "/static/data/images/profile.png"

    let profileHTML = `
    <div class="section_profile" style="display: flex;">
        <div class="profile_left">
            <div class="profile_picture" style="background-image: url(${picture});"></div>
            <input type="file" id="picture_upload" accept=".jpg,.png" style="display: none;" />
            <button class="btn_picture btn-member body-medium">上傳圖片</button>
        </div>

        <div class="profile_right">
            <div class="field">
                <p class="body-medium field_title">姓名：</p>
                <input class="body-medium" name="user_name" type="text">
            </div>
            <div class="field">
                <p class="body-medium field_title">信箱：</p>
                <input class="body-medium" name="user_email" type="email">
            </div>
            <div class="field">
                <p class="body-medium field_title">舊密碼：</p>
                <input class="body-medium" name="user_oldPassword" type="password">
            </div>
            <div class="field">
                <p class="body-medium field_title">新密碼：</p>
                <input class="body-medium" name="user_newPassword" type="password">
            </div>
            <div class="field">
                <p class="body-medium" style="color:brown">* 若要更新密碼，需先進行舊密碼驗證</p>
            </div>
        </div>

        <button class="update_btn btn-member">
            <span class="btn_text body-medium">更新</span>
            <div class="btn_spinner"></div>
        </button>
    </div>    
    ` 
    $(".detail_container").insertAdjacentHTML("afterbegin", profileHTML);
}

export function renderNoOrder() {
    $(".section_history").innerHTML = "";
    let html = `<p class="body-medium" style="margin: 200px auto;">尚無歷史訂單</p>`
    $(".section_history").insertAdjacentHTML("afterbegin", html);
}

export function renderOrderNumber(orderNumList) {
    $(".history_orders_left").innerHTML = "";
    let orderNumberHTML = ""
    orderNumList.forEach((data) => {
        orderNumberHTML += `
            <div class="order_wrapper" data-ordernum="${data.order_number}">
                <p class="order_number body-medium" data-ordernum="${data.order_number}">
                    ${data.order_number}
                </p>
                <div class="order_detail" data-ordernum="${data.order_number}"></div> <!-- 這裡先放空，之後點了再填資料 -->
            </div>
        `
    })
    $(".history_orders_left").insertAdjacentHTML("afterbegin", orderNumberHTML);
}

export function renderOrders(detail, price, orderList) {
    $(".history_orders_right").innerHTML = "";

    let orderHTML = ""

    orderList.forEach((order) => {
        let time = order.time == "morning" ? "早上 9 點到下午 4 點" : "下午 2 點到晚上 9 點"

        orderHTML += `
        <div class="section">
            <img class="atttraction_img" src="${order.attraction.image}">
            <div class="infor">
                <h1 class="body-bold">${order.attraction.name}</h1>
                <div class="field">
                    <p class="body-bold" style="margin-right: 10px;">日期：</p>
                    <p class="body-medium">${order.date}</p>
                </div>
                <div class="field">
                    <p class="body-bold" style="margin-right: 10px;">時間：</p>
                    <p class="body-medium">${time}</p>
                </div>
                <div class="field">
                    <p class="body-bold" style="margin-right: 10px;">費用：</p>
                    <p class="body-medium">新台幣 ${order.price} 元</p>
                </div>
                <div class="field">
                    <p class="body-bold" style="margin-right: 10px;">地點：</p>
                    <p class="body-medium">${order.attraction.address}</p>
                </div>
            </div>
        </div>
        `
    })
    $(".history_orders_right").insertAdjacentHTML("afterbegin", orderHTML);
    if (detail) {detail.insertAdjacentHTML("afterbegin", orderHTML)};
    
    renderTotalPrice(detail, price)
}

function renderTotalPrice(detail, price) {
    let totalPriceHTML = `
    <div class="confirm">
        <p class="body-bold">總價：新台幣 ${price} 元</p>
    </div>
    `
    $(".history_orders_right").insertAdjacentHTML("beforeend", totalPriceHTML);
    if (detail) {detail.insertAdjacentHTML("beforeend", totalPriceHTML)};
}
