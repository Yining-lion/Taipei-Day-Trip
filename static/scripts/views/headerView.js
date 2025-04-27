export function renderHeader(){
    let headerHTML = `
    <div class="navigation_container">
        <div class="navigation">
            <div class="navigation_left headline">
                <a class="navigation_left_text" href="/">台北一日遊</a>
            </div>
            <div class="navigation_right body-medium">
                <p class="booking_text">預定行程</p>
                <p class="signin_signup_text">登入/註冊</p>
                <p class="member_text" style="display: none">會員中心</p>
            </div>         
        </div>
    </div>

    <div class="member_container body-medium">
        <div class="member_menu">
            <p class="profile_text menu_item">個人資訊</p>
            <p class="order_text menu_item">歷史訂單</p>
            <p class="signout_text menu_item">登出</p>
        </div>  
    </div>

    <div class="overlay"></div>

    <div class="dialog_container signin_container">
        <p class="dialog-title-bold">登入會員帳號</p>
        <img class="close" src="/static/data/images/close.png">
        <form id="signin_form" class="sign_form">
            <input class="signin_email body-medium" name="email" type="email" placeholder="輸入電子信箱">
            <div class="password-wrapper">
                <input class="signin_password body-medium" name="password" type="password" placeholder="輸入密碼">
                <div class="eye signin_eye"></div>
            </div>
            <button class="signin_btn btn-dialog button-regular">
                <span class="btn_text">登入帳戶</span>
                <div class="btn_spinner"></div>
            </button>
        </form>
        <p class="message body-medium"></p>
        <p class="signup_text body-medium">還沒有帳戶？點此註冊</p>
    </div>

    <div class="dialog_container signup_container">
        <p class="dialog-title-bold">註冊會員帳號</p>
        <img class="close" src="/static/data/images/close.png">
        <form id="signup_form" class="sign_form">
            <input class="signup_name body-medium" name="name" type="text" placeholder="輸入姓名">
            <input class="signup_email body-medium" name="email" type="email" placeholder="輸入電子信箱">
            <div class="password-wrapper">
                <input class="signup_password body-medium" name="password" type="password" placeholder="輸入密碼">
                <div class="eye signup_eye"></div>
            </div>
            <button class="signup_btn btn-dialog button-regular">
                <span class="btn_text">註冊新帳戶</span>
                <div class="btn_spinner"></div>
            </button>
        </form>
        <p class="message body-medium"></p>
        <p class="signin_text body-medium">已經有帳戶了？點此登入</p>
    </div>
    `
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
}