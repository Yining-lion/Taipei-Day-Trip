import { $ } from "../utils/selector.js"
import { verifyToken } from "../services/authService.js";
import { popupView } from "../views/popupView.js"
import { popupEvents } from "../controllers/popupContro.js"
import { renderProfile, renderNoOrder, renderOrderNumber, renderOrders } from "../views/memberView.js";
import { getCurrentUser } from "../models/userModel.js"; 
import { fillUserInfo } from "../utils/fillUserInfor.js";
import { setupImagePreview } from "../utils/imagePreview.js";
import { updateProfile, getOrderNumbers, getOrders } from "../models/memberModel.js";

let token;
let profileTab, historyTab;

export async function loadMember() {
    token = await verifyToken();
    if (!token) {
        location.href = "/";
        popupView.showSignin();
        popupEvents();
        return;
    }

    let user = await getCurrentUser(token);
    renderProfile(user.data);
    fillUserInfo($("input[name='user_name']"), $("input[name='user_email']"), user.data);

    profileTab = document.querySelectorAll(".header_item")[0];
    historyTab = document.querySelectorAll(".header_item")[1];

    bindTabEvents();
    await renderSectionFromUrl();

    // 支援返回鍵
    window.addEventListener("popstate", async () => {
        await renderSectionFromUrl(); 
    });
}

// 綁定 tab 點擊
function bindTabEvents() {
    profileTab.addEventListener("click", async () => {
        history.pushState(null, "", "/member?tab=profile");
        await renderProfileSection();
    });

    historyTab.addEventListener("click", async () => {
        history.pushState(null, "", "/member?tab=history");
        await renderHistorySection();
    });
}

// 根據網址來 render
async function renderSectionFromUrl() {
    let params = new URLSearchParams(window.location.search);
    let tab = params.get("tab");

    if (tab === "history") {
        await renderHistorySection();
    } else {
        await renderProfileSection();
    }
}

// 渲染個人資料頁
async function renderProfileSection() {
    profileTab.classList.add("select");
    historyTab.classList.remove("select");

    $(".section_profile").style.display = "flex";
    $(".section_history").style.display = "none";

    // 設定圖片預覽跟更新會員資料
    setupProfileForm();
}

// 渲染歷史訂單頁
async function renderHistorySection() {
    historyTab.classList.add("select");
    profileTab.classList.remove("select");

    $(".section_history").style.display = "flex";
    $(".section_profile").style.display = "none";

    let number = await getOrderNumbers(token);
    if (!number.data) {
        renderNoOrder();
        return;
    }
    renderOrderNumber(number.data);
    setupOrderSelect();
}

// 處理個人資料表單 (圖片、更新資料)
function setupProfileForm() {
    let selectedFile = null;

    setupImagePreview($("#picture_upload"), $(".profile_picture"), (file) => {
        selectedFile = file;
    });

    $(".btn_picture").addEventListener("click", () => {
        $("#picture_upload").click();
    });

    $(".update_btn").addEventListener("click", async () => {
        let name = $("input[name='user_name']").value.trim();
        let email = $("input[name='user_email']").value.trim();
        let oldPassword = $("input[name='user_oldPassword']").value.trim();
        let newPassword = $("input[name='user_newPassword']").value.trim();
        if (!name || !email) {
            alert("請填寫姓名及信箱");
            return;
        }

        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("old_password", oldPassword || "");
        formData.append("new_password", newPassword || "");
        if (selectedFile) formData.append("picture", selectedFile);

        let result = await updateProfile(token, formData);
        if (result.ok) {
            alert("更新成功！");
        } else {
            alert(result.message || "更新失敗");
        }
    });
}

// 處理歷史訂單選單
function setupOrderSelect() {
    let orderBtns = document.querySelectorAll(".order_number");

    orderBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            orderBtns.forEach(b => b.classList.remove("select"));
            btn.classList.add("select");
            e.preventDefault();
            let orderNum = btn.dataset.ordernum;
            let order = await getOrders(token, orderNum);
            
            let detail = document.querySelector(`.order_detail[data-ordernum="${orderNum}"]`);

            if (window.innerWidth > 900) {
                renderOrders(detail="", order.data.price, order.data.trips);
            } else {
                document.querySelectorAll(".order_detail").forEach(d => {
                    d.style.display = "none";
                    d.innerHTML = "";
                });
    
                detail.style.display = "block";
                renderOrders(detail, order.data.price, order.data.trips);
            }
        });
    });

    if (orderBtns.length > 0) {
        orderBtns[0].click();
        orderBtns[0].classList.add("select");
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            document.querySelectorAll(".order_detail").forEach(d => {
                d.style.display = "none";
            });
        }
    });
}
