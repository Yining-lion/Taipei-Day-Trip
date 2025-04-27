import {$} from "../utils/selector.js" 
import {popupView} from "../views/popupView.js"

export function popupEvents() {
    openSignin();
    closeButtons();
    switchToSignup();
    switchToSignin();
}

function openSignin() {
    $(".signin_signup_text").addEventListener("click", () => {
        popupView.showSignin();
    });
}

function closeButtons() {
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", () => {
            popupView.hidePopupContainer();
            popupView.resetSigninForm();
            popupView.resetSignupForm();
        });
    });
}

function switchToSignin() {
    $(".signin_text").addEventListener("click", () => {
        $(".signin_container").classList.add("show");
        $(".signup_container").classList.remove("show");
        popupView.resetSignupForm()
    });
}

function switchToSignup() {
    $(".signup_text").addEventListener("click", () => {
        popupView.showSignup()
        popupView.resetSigninForm()
    });
}