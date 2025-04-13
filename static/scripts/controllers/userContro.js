import {$} from "../utils/selector.js" 
import {signup, signin} from "../models/userModel.js";
import {showSignupMessage, showSigninMessage} from "../views/userView.js";

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
    });
}
