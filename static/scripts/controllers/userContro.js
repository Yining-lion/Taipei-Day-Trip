import {$} from "../utils/selector.js" 
import {signup, signin} from "../models/userModel.js"
import {showSignupMessage, showSigninMessage} from "../views/userView.js"
import { popupView } from "../views/popupView.js";

export function userContro() {
    userAuthEvents();
    handlePasswordEye();
    clickAndCleanMsg();
    handleMemberEvents();
}

export function userAuthEvents() {
    $("#signup_form").addEventListener("submit", async (e) => {
        e.preventDefault();

        let name = $(".signup_name").value.trim();
        let email = $(".signup_email").value.trim();
        let password = $(".signup_password").value.trim();

        if (!name || !email || !password) {
            alert("請輸入姓名、信箱、密碼");
            return;
        }

        let result = await signup({ name, email, password });
        if (result.ok) {
            showSignupMessage("註冊成功，請登入系統", true);
        } else {
            showSignupMessage(result.message, false);
        }
        clickAndCleanMsg();
    });

    $("#signin_form").addEventListener("submit", async (e) => {
        e.preventDefault();

        let email = $(".signin_email").value.trim();
        let password = $(".signin_password").value.trim();

        if (!email || !password) {
            alert("請輸入信箱、密碼");
            return;
        }

        let result = await signin({ email, password });
        if (result.token) {
            localStorage.setItem("token", result.token);
            location.reload();
        } else {
            showSigninMessage(result.message, false);
        }
        clickAndCleanMsg();
    });
}

export function handlePasswordEye() {
    $(".signin_eye").addEventListener("click", () => {
        let isPassword = $(".signin_password").type === "password";
        $(".signin_password").type = isPassword ? "text" : "password";
        $(".signin_eye").classList.toggle("open", isPassword);
    })

    $(".signup_eye").addEventListener("click", () => {
        let isPassword = $(".signup_password").type === "password";
        $(".signup_password").type = isPassword ? "text" : "password";
        $(".signup_eye").classList.toggle("open", isPassword);
    })
}

export function clickAndCleanMsg() {

    [$(".signin_email"), $(".signin_password")].forEach(input => {
        input.addEventListener("focus", () => {
            $(".signin_container .message").style.display = "none";
        });
    });

    [$(".signup_name"), $(".signup_email"), $(".signup_password")].forEach(input => {
        input.addEventListener("focus", () => {
            $(".signup_container .message").style.display = "none";
        });
    });
}

window.isMemberMenuOpen = false;

function handleMemberEvents() {
    // 點擊會員中心
    $(".member_text").addEventListener("click", (event) => {
        event.stopPropagation(); // 不讓點擊冒泡到 document
        if (!isMemberMenuOpen) {
            popupView.showMember();
        } else {
            popupView.hideMember();
        }
    });

    // 點擊其他地方關閉
    document.addEventListener("click", (event) => {
        if (isMemberMenuOpen && !$(".member_container").contains(event.target) && !$(".member_text").contains(event.target)) {
            popupView.hideMember();
        }
    });

    // 視窗 resize 時重新定位
    window.addEventListener("resize", repositionMember);

    // 滾動時關閉
    window.addEventListener("scroll", () => {
        if (isMemberMenuOpen) {
            popupView.hideMember();
        }
    });

    $(".profile_text").addEventListener("click", () => {
        location.href = "/member?tab=profile";
    })

    $(".order_text").addEventListener("click", () => {
        location.href = "/member?tab=history";
    });
}

// 重新定位 member_container 的位置，可參考 popupView.showMember()
function repositionMember() {
    if (!isMemberMenuOpen) return; 
    popupView.showMember();
}