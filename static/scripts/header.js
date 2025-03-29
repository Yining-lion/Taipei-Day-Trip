export function renderHeader(){
    let headerHTML = `
    <div class="navigation_container">
        <div class="navigation">
            <div class="navigation_left headline">
                <a class="navigation_left_text" href="/">台北一日遊</a>
            </div>
            <div class="navigation_right body-medium">
                <p class="">預定行程</p>
                <p class="signin_signup_text">登入/註冊</p>
            </div>
        </div>
    </div>


    <div class="overlay"></div>

    <div class="dialog_container signin_container">
        <p class="dialog-title-bold">登入會員帳號</p>
        <img class="close" src="/static/data/images/close.png">
        <form id="signin_form" class="sign_form" action="" method="">
            <input class="signin_username body-medium" name="username" type="text" placeholder="輸入電子信箱">
            <input class="signin_password body-medium" name="password" type="password" placeholder="輸入密碼">
            <button class="signin_btn btn-dialog button-regular">登入帳戶</button>
        </form>
        <p class="signup_text body-medium">還沒有帳戶？點此註冊</p>
    </div>

    <div class="dialog_container signup_container">
        <p class="dialog-title-bold">註冊會員帳號</p>
        <img class="close" src="/static/data/images/close.png">
        <form id="signup_form" class="sign_form" action="" method="">
            <input class="signup_name body-medium" name="name" type="text" placeholder="輸入姓名">
            <input class="signup_username body-medium" name="username" type="text" placeholder="輸入電子信箱">
            <input class="signup_password body-medium" name="password" type="password" placeholder="輸入密碼">
            <button class="signup_btn btn-dialog button-regular">註冊新帳戶</button>
        </form>
        <p class="signin_text body-medium">已經有帳戶了？點此登入</p>
    </div>
    `
    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    const $ = (selector) => document.querySelector(selector);

    $(".signin_signup_text").addEventListener("click", () => {
        $(".signin_container").style.display = "flex"; // 先出現讓 show 動畫可以順利進行
        $(".overlay").style.display = "block";
        setTimeout(() => {
            $(".signin_container").classList.add("show");
        }, 10);
    })
    
    document.querySelectorAll(".close").forEach(button => {
        button.addEventListener("click", () => {
            $(".signin_container").classList.remove("show");
            $(".signup_container").classList.remove("show");
            $(".signin_container").style.display = "none";
            $(".signup_container").style.display = "none";
            $(".overlay").style.display = "none";
        });
    });
    
    $(".signup_text").addEventListener("click", () => {
        $(".signin_container").classList.remove("show");
        $(".signup_container").style.display = "flex"; // 先出現讓 show 動畫可以順利進行
        setTimeout(() => {
            $(".signup_container").classList.add("show");
        }, 10);
    })
    
    $(".signin_text").addEventListener("click", () => {
        $(".signin_container").classList.add("show");
        $(".signup_container").classList.remove("show");
    })
}