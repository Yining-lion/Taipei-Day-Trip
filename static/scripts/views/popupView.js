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
    },

    showMember: () => {
        let rect = $(".member_text").getBoundingClientRect(); // 抓元素位置
        let centerX = rect.left + rect.width / 2; // 找到會員中心文字的中心點
        $(".member_container").style.top = `${rect.bottom + window.scrollY}px`; // 把 top 設在文字下面
        $(".member_container").style.left = `${centerX}px`;
        $(".member_container").style.display = "block";
        setTimeout(() => {
            $(".member_container").classList.add("show");
        }, 10);
        window.isMemberMenuOpen = true;
    },

    hideMember: () => {
        $(".member_container").classList.remove("show");
        setTimeout(() => {
            $(".member_container").style.display = "none";
        }, 300); // 跟 CSS transition 的時間一樣
        window.isMemberMenuOpen = false;
    }
};


