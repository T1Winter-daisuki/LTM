

Server chạy tại: `http://localhost:8080`

---

# 💬 Chat App Server (FastAPI)

Tài liệu này mô tả các điểm cuối (endpoints) và cấu trúc của phần Backend Server.

Server chạy tại: `http://localhost:8080`

---

## 🔗 API ENDPOINTS

| Endpoint | Protocol | Method | Input (Body/Params) | Output | Mô tả |
|:---|:---|:---|:---|:---|:---|
| `/health` | HTTP/1.1 | GET | — | `{"status":"ok"}` | Kiểm tra trạng thái hoạt động của server. |
| `/auth/register` | HTTP/1.1 | POST | JSON: `{"username": "...", "password": "..."}` | JSON: `{"status": 200, "data": {...}}` | Đăng ký người dùng. |
| `/auth/login` | HTTP/1.1 | POST | Form Data: `username`, `password` | JSON: `{"access_token": "...", "token_type": "bearer"}` | Đăng nhập và nhận JWT. |
| `/api/user/get_all` | HTTP/1.1 | GET | — | JSON Array: `[{... user data ...}]` | Lấy danh sách người dùng. |
| `/message/get_all` | HTTP/1.1 | GET | Header: `Authorization: Bearer <token>` | JSON Array: `[{... message data ...}]` | Lấy tin nhắn. |
| `/ws/{username}` | **WebSocket** | Connect | JSON: `{"content": "..."}` | JSON: `{"username": "...", "message": "..."}` | Kết nối và gửi/nhận tin nhắn. |

---

## 📦 CẤU TRÚC DỰ ÁN
server/ ├── README.md ├── main.py # File khởi động chính (FastAPI App và WebSockets) ├── requirements.txt # Danh sách thư viện Python ├── configs/ │ ├── database.py # Cấu hình MongoDB │ ├── hashing.py # Xử lý băm mật khẩu │ ├── jwt_token.py # Tạo và xác thực JWT │ └── websocket_manager.py # Quản lý kết nối WebSocket ├── models/ │ └── user_model.py # Pydantic Model cho User ├── routers/ │ ├── authentication.py # Route: Đăng ký, Đăng nhập, Xác thực │ ├── message_router.py # Route: Lấy tin nhắn, Tải file │ └── user_router.py # Route: Lấy danh sách người dùng ├── schemas/ │ └── token_data_schema.py # Schema cho dữ liệu JWT └── serializers/ ├── message_serializer.py # Chuyển đổi dữ liệu Message └── user_serializer.py # Chuyển đổi dữ liệu User

> **Lưu ý:** Bổ sung các endpoint của nhóm vào bảng trên.

---

## 📦 CẤU TRÚC
```
server/
├── README.md
├── app.py (hoặc server.js)
├── requirements.txt (hoặc package.json)
├── routes/
│   └── ...
└── utils/
    └── ...
```

---

## 🧪 TEST
```bash
# Test API bằng curl
curl http://localhost:8080/health
```

---

## 📝 GHI CHÚ

- Port mặc định: **8080**
- Có thể thay đổi trong file `.env` hoặc config