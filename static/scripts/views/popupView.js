import {$} from "../utils/selector.js" 

export const popupView = {
    showSignin: () => {
        $(".signin_container").style.display = "flex";
        $(".overlay").style.display = "block";
        setTimeout(() => {
            $(".signin_container").classList.add("show");
        }, 10);
    },

    showSignup: () => {
        $(".signin_container").classList.remove("show");
        $(".signup_container").style.display = "flex";
        setTimeout(() => {
            $(".signup_container").classList.add("show");
        }, 10);
    },

    hidePopupContainer: () => {
        $(".signin_container").classList.remove("show");
        $(".signup_container").classList.remove("show");
        $(".signin_container").style.display = "none";
        $(".signup_container").style.display = "none";
        $(".overlay").style.display = "none";
    },

    resetSigninForm: () => {
        $(".signin_email").value = "";
        $(".signin_password").value = "";
        $(".signin_container .message").style.display = "none";
    },

    resetSignupForm: () => {
        $(".signup_name").value = "";
        $(".signup_email").value = "";
        $(".signup_password").value = "";
        $(".signup_container .message").style.display = "none";
    }
};

