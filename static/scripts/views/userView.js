import {$} from "../utils/selector.js" 

export function showSignupMessage(message, success) {
    const msgEl = $(".signup_container .message");
    msgEl.style.display = "block";
    msgEl.style.color = success ? "#36BF36" : "#8B0000";
    msgEl.textContent = message;
}

export function showSigninMessage(message, success) {
    const msgEl = $(".signin_container .message");
    msgEl.style.display = "block";
    msgEl.style.color = success ? "#36BF36" : "#8B0000";
    msgEl.textContent = message;
}