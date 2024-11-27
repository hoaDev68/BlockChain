// const express = require("express");
// const path = require("path");

// const app = express();
// const PORT = 3000;

// // Phục vụ các tệp tĩnh trong thư mục `public`
// app.use(express.static(path.join(__dirname, "public")));

// // Route chính để hiển thị trang quản lý người dùng
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Khởi động server
// app.listen(PORT, () => {
//     console.log(`Server đang chạy tại http://localhost:${PORT}`);
// });

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();

// Thêm CSP
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "script-src": ["'self'", "https://cdn.jsdelivr.net"],
                "style-src": ["'self'", "https://cdn.jsdelivr.net"],
                "img-src": ["'self'", "https://cdn2.fptshop.com.vn"],
                "style-src": ["'self'", "'unsafe-inline'"],
                "connect-src": ["'self'", "http://127.0.0.1:8545"],
            },
        },
    })
);

// Phục vụ các file tĩnh từ thư mục `public`
app.use(express.static(path.join(__dirname, 'public')));

// Điểm truy cập chính
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(9999, () => console.log('Server running at http://localhost:9999'));

