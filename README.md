# Taipei-Day-Trip

## 🔗成果展示連結
http://57.182.209.205:8000/

Test account：test@example.com / password：test

Test card：4242-4242-4242-4242 | 12/34 | CVV 123

## 🔹專案說明
台北一日遊是一個旅遊電商網站，提供以下功能：
- 使用者可瀏覽台北各大景點資訊
- 會員可一次預訂多筆行程
- 支援 TapPay 第三方支付完成付款
- 會員可編輯個人資訊（如：上傳大頭照、變更帳號密碼）
- 可查詢歷史訂單記錄

## 🔹技術特色
- 使用  HTML + SCSS + Javascript 建立前端，支援 RWD 響應式設計
- 前後端採 MVC 架構與分離式開發，使用 AJAX 串接 RESTful API 顯示景點資料
- 後端使用 FastAPI + MySQL 實作景點查詢、預約下單、會員系統等功能
- 串接 TapPay 第三方金流，完成付款流程與交易資料紀錄

## 🔹專案架構圖
```
Taipei-Day-Trip/
├── app.py
├── insert_data.py
│
├── models
│   ├── attraction_model.py
│   ├── booking_model.py
│   ├── order_model.py
│   └── user_model.py
│
├── routes
│   ├── attraction_route.py
│   ├── booking_route.py
│   ├── order_route.py
│   └── user_route.py
│
├── utils
│   ├── jwt_auth.py
│   ├── database.py
│   └── user_schema.py
│
└── static
    ├── attraction.html
    ├── booking.html
    ├── index.html
    ├── thankyou.html
    ├── styles/scss/
    │
    ├── scripts
    │   ├── attraction.js
    │   ├── booking.js
    │   ├── header.js
    │   ├── index.js
    │   ├── thankyou.js
    │   ├── controllers/
    │   ├── models/
    │   ├── services/
    │   ├── utils/
    │   └── views/
    │
    └── data
        ├── images/
        └── taipei-attractions.json
```

## 🔹RESTful API
![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/RESTful%20API%20%E6%96%87%E4%BB%B6.png)

## 🔹Demo
- 首頁
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/%E9%A6%96%E9%A0%81.png)
- 景點詳細內容
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/%E6%99%AF%E9%BB%9E%E8%A9%B3%E7%B4%B0%E5%85%A7%E5%AE%B9.png)
- 預定行程付款
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/0560f60d0778341a9751b73d074e7a07b33548f2/Readme/%E9%A0%90%E5%AE%9A%E8%A1%8C%E7%A8%8B%E4%BB%98%E6%AC%BE.png)
- 付款成功
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/%E4%BB%98%E6%AC%BE%E6%88%90%E5%8A%9F.png)
- 歷史訂單
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/%E6%AD%B7%E5%8F%B2%E8%A8%82%E5%96%AE.png)
- 個人資訊
  ![image](https://github.com/Yining-lion/Taipei-Day-Trip/blob/bff5fe47c2416ee793c98fc336b08e446ea22172/Readme/%E5%80%8B%E4%BA%BA%E8%B3%87%E8%A8%8A.png)
