import { $ } from "../utils/selector.js";

export function renderContent(orderNumber) {
    let html = `
    <p class="body-bold" style="margin: 0;">行程預定成功</p>
    <p class="body-bold">您的訂單編號如下</p>
    <p class="body-medium">${orderNumber}</p>
    <p class="body-medium">請到 <a href="/member?tab=history">會員中心</a> 查詢歷史訂單</p>
    `
    
    $(".content").insertAdjacentHTML("afterbegin", html);
}