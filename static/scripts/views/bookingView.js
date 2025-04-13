import { $ } from "../utils/selector.js";

export function renderBookings(userName, bookingList){
    let headline = `<p class="button-bold headline">您好，${userName}，待預訂的行程如下：</p>`;
    document.body.insertAdjacentHTML("afterbegin", headline)

    // 若沒有待預定的行程
    if (bookingList.length === 0){
      let p = document.createElement("p")
      p.classList.add("body-medium")
      p.classList.add("no_booking_text")
      p.textContent = "目前沒有任何待預定的行程"
      $(".booking_list").appendChild(p);
    } 

    let html = ""
    bookingList.forEach((data) => {
      let time = data.time == "morning" ? "早上 9 點到下午 4 點" : "下午 2 點到晚上 9 點"

      html += `
      <div class="section">
        <img class="atttraction_img" src="${data.attraction.image}">
        <div class="infor">
          <h1 class="body-bold">台北一日遊：${data.attraction.name}</h1>
          <div class="field">
            <p class="body-bold" style="margin-right: 10px;">日期：</p>
            <p class="body-medium">${data.date}</p>
          </div>
          <div class="field">
            <p class="body-bold" style="margin-right: 10px;">時間：</p>
            <p class="body-medium">${time}</p>
          </div>
          <div class="field">
            <p class="body-bold" style="margin-right: 10px;">費用：</p>
            <p class="body-medium">新台幣 ${data.price} 元</p>
          </div>
          <div class="field">
            <p class="body-bold" style="margin-right: 10px;">地點：</p>
            <p class="body-medium">${data.attraction.address}</p>
          </div>
          <img class="delete" data-bookingid="${data.booking_id}" src="/static/data/images/delete.png">
        </div>
      </div>
        `
    })
    $(".booking_list").innerHTML = html;
}

export function renderPayment(bookingList){
  let totalPrice = bookingList.reduce((sum, data) => sum + data.price, 0);
  let paymentHTML = `
  <hr class="abc deperate_line">
    
    <div class="contact_form">
      <p class="button-bold title">您的聯絡資訊</p>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">聯絡姓名：</p>
        <input class="body-medium" name="contact_name" type="text">
      </div>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">連絡信箱：</p>
        <input class="body-medium" name="contact_email" type="email">
      </div>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">手機號碼：</p>
        <input class="body-medium" name="contact_phone" type="tel" pattern="[0-9]{10}">
      </div>
      <p class="note_text body-bold">請保持手機暢通，準時到達，導覽人員將用手機與您聯繫，務必留下正確的聯絡方式。</p>
    </div>
  
    <hr class="deperate_line">
  
    <div class="payment">
      <p class="button-bold title">信用卡付款資訊</p>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">卡片號碼：</p>
        <input class="body-medium" name="card_number" type="text">
      </div>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">過期時間：</p>
        <input class="body-medium" name="card_expiry" type="month">
      </div>
      <div class="field">
        <p class="body-medium" style="margin-right: 10px;">驗證密碼：</p>
        <input class="body-medium" name="card_cvc" type="password" maxlength="3">
      </div>
    </div>
  
    <hr class="deperate_line">
  
    <div class="confirm">
      <p class="body-bold">總價：新台幣 ${totalPrice} 元</p>
      <button class="pay_btn btn-booking">確認訂購並付款</button>
    </div>
  
    <div class="footer body-bold">
      <p>COPYRIGHT © 2021 台北一日遊</p>
    </div>
  `
  document.body.insertAdjacentHTML("afterend", paymentHTML);
}