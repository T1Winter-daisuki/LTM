

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



## 📦 CẤU TRÚC
```
server/ 
├── README.md 
├── main.py (hoặc app.py) 
├── requirements.txt (hoặc package.json) 
├── routes/ 
│   ├── authentication.py 
│   ├── message_router.py 
│   └── user_router.py 
└── utils/    
├── configs/     
│ ├── database.py     
│ ├── hashing.py     
│ ├── jwt_token.py     
│ └── websocket_manager.py     
├── models/     
│ └── user_model.py     
├── schemas/     
│ └── token_data_schema.py     
└── serializers/    
    ├── message_serializer.py         
    └── user_serializer.py

---

## 🧪 TEST

Sử dụng lệnh `curl` trong terminal để kiểm tra nhanh các API HTTP:

```bash
# 1. Test trạng thái hoạt động của Server (Health Check)
curl http://localhost:8080/health

# 2. Test Đăng ký người dùng (Register)
# Thay thế 'username', 'password', 'full_name' bằng dữ liệu thực
curl -X POST http://localhost:8080/auth/register \
-H "Content-Type: application/json" \
-d '{
    "username": "testuser",
    "password": "securepassword",
    "full_name": "Test User"
}'

# 3. Test Đăng nhập (Login) và lấy Token
# Lưu ý: API này dùng Form Data, không dùng JSON
curl -X POST http://localhost:8080/auth/login \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "username=testuser&password=securepassword"

# 4. Test API yêu cầu xác thực (Lấy danh sách tin nhắn)
# THAY THẾ <YOUR_ACCESS_TOKEN> bằng token nhận được từ bước 3
# curl http://localhost:8080/message/get_all \
# -H "Authorization: Bearer <YOUR_ACCESS_TOKEN>"
## 📝 GHI CHÚ

- Port mặc định: **8080**
- Có thể thay đổi trong file `.env` hoặc config