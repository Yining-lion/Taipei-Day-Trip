import {$} from "../utils/selector.js" 
import { verifyToken, removeToken } from "../services/authService.js"

export async function checkSignInStatus() {
    let token = await verifyToken();
    if (token) {
        $(".signout_text").style.display = "block";
        $(".signin_signup_text").style.display = "none";
        $(".signout_text").onclick = signOut;
    }
}

function signOut() {
    removeToken();
    // 需要 token 才能進入的頁面按登出後會停留在原頁並跳出登入框，所以要讓它跳轉到首頁
    let needTokenPaths = ["/booking"]; 
    let currentPath = window.location.pathname;

    if (needTokenPaths.includes(currentPath)) {
        location.href = "/";
    } else {
        location.reload(); 
    }
}