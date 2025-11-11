# BÀI TẬP LỚN: LẬP TRÌNH MẠNG

## ChatApp

## 🧑‍💻 THÔNG TIN NHÓM

| STT | Họ và Tên       | MSSV       | Email                       | Đóng góp                                        |
| --- | --------------- | ---------- | --------------------------- | ----------------------------------------------- |
| 1   | Nguyễn Hữu Hưng | B22DCCN412 | hungnguyencva2004@gmail.com | Dev Back-end: Xác thực, Bảo mật & Quản lý Hồ sơ |
| 2   | Lê Hải Đăng     | B22DCCN207 | ledang18102004@gmail.com    | Dev Back-end: Logic Chat & WebSocket            |
| 3   | Bùi Hoàng Sơn   | B22DCCN687 | hoangsonbui.hp@gmail.com    | Dev Front-end, Cơ sở dữ liệu                    |

**Tên nhóm:** Nhóm 01 – Lập trình mạng  
**Chủ đề đã đăng ký:** CHAT APP

## 🧠 MÔ TẢ HỆ THỐNG

#### 1. Giới thiệu

Ứng dụng Chat App là một ứng dụng cho phép người dùng trò chuyện với nhau trong thời gian thực. Ứng dụng này được phát triển để cung cấp trải nghiệm trò chuyện dễ dàng và nhanh chóng, cho phép người dùng gửi tin nhắn, hình ảnh và tệp đính kèm một cách nhanh chóng.

#### 2. Các tính năng chính

**Đăng nhập và đăng ký:** Ứng dụng cho phép người dùng đăng nhập bằng tên đăng nhập và mật khẩu hoặc đăng ký tài khoản mới.

**Trò chuyện Real-time:** Người dùng có thể trò chuyện với nhau một cách trong thời gian thực, không cần phải làm mới trang hoặc tải lại. Khi không có kết nối internet, vẫn có thể gửi được tin nhắn, tin nhắn sẽ được đồng bộ khi online.

**Gửi Tệp Đính Kèm** **:** Người dùng có thể gửi tệp đính kèm như tài liệu, hồ sơ và tệp âm thanh bất đồng bộ.

## ⚙️ CÔNG NGHỆ SỬ DỤNG

Bảng này liệt kê các công nghệ và thư viện chính được sử dụng trong dự án.

|       Thành phần        |   Công nghệ    | Ghi chú                                                                                       |
| :---------------------: | :------------: | :-------------------------------------------------------------------------------------------- |
| **Back-end Framework**  |  **FastAPI**   | REST API, hiệu năng cao, dễ học, sẵn sàng cho production.                                     |
|      **Database**       |  **MongoDB**   | NoSQL Database để lưu trữ dữ liệu.                                                            |
| **Front-end Framework** |  **ReactJS**   | Thư viện JavaScript hàng đầu để xây dựng giao diện người dùng động.                           |
|    **UI Components**    | **Ant Design** | Thư viện cung cấp các thành phần UI phong phú (Cần điều chỉnh nếu sử dụng React thay vì Vue). |

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### 1. Clone repository

```bash
git clone <https://github.com/jnp2018/mid-project-207412687.git>
cd assignment-network-project
```

### 2. Chạy server

````bash
cd source/server
```
- Cài đặt thư viện
	```
	pip install -r requirements.txt
	```
- Chạy chương trình
	 ```
	 uvicorn main:app --reload
	```

### 3. Chạy client

```bash
cd source/client/Chat
```

- Cài đặt thư viện
  ```
  npm install
  ```
- Chạy chương trình:
  ```
  npm run dev
  ```

```
## 🔗 GIAO TIẾP (GIAO THỨC SỬ DỤNG)

| Endpoint                    | Protocol      | Method      | Input (Request Body/Params)                                                             | Output (Response Body)                                                                | Mô tả                                                                                    |
| :-------------------------- | :------------ | :---------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------- |
| `/auth/register`            | **HTTP/1.1**  | **POST**    | **JSON** (User Model): `{"username": "...", "password": "...", "full_name": "..."}`     | **JSON:** `{"status": 200, "data": {...}}` hoặc Lỗi **203**                           | Đăng ký người dùng mới. Lưu mật khẩu đã hash vào MongoDB.                                |
| `/auth/login`               | **HTTP/1.1**  | **POST**    | **Form Data** (OAuth2RequestForm): `username`, `password`                               | **JSON:** `{"access_token": "...", "token_type": "bearer"}` hoặc Lỗi **401**          | Đăng nhập và trả về **JWT Access Token**.                                                |
| `/auth/get_current_user`    | **HTTP/1.1**  | **GET**     | **Header**: `Authorization: Bearer <token>`                                             | **JSON** (TokenData Schema): `{"username": "..."}` hoặc Lỗi **401**                   | Xác thực token và lấy thông tin người dùng.                                              |
| `/api/user/get_all`         | **HTTP/1.1**  | **GET**     | —                                                                                       | **JSON Array:** `[{... user data ...}, ...]`                                          | Lấy danh sách người dùng và cập nhật trạng thái (`afk` nếu không hoạt động 5 phút).      |
| `/message/get_all`          | **HTTP/1.1**  | **GET**     | **Header**: `Authorization: Bearer <token>`                                             | **JSON Array:** `[{... message data ...}, ...]`                                       | Lấy tất cả tin nhắn đã lưu trong MongoDB (cần xác thực).                                 |
| `/message/file/{file_name}` | **HTTP/1.1**  | **GET**     | **Path Param**: `file_name`                                                             | **File** (Binary data)                                                                | Tải xuống file theo tên từ thư mục `files/`.                                             |
| `/ws/{username}`            | **WebSocket** | **Connect** | **JSON** (Text Message): `{"content": "...", "type": "text"}`                           | **JSON** (Broadcast): `{"username": "...", "message": "...", "type": "text"}`         | Kết nối/Ngắt kết nối, gửi/nhận **tin nhắn văn bản** thời gian thực, cập nhật trạng thái. |
| `/ws/file/{username}`       | **WebSocket** | **Connect** | **JSON** (File Chunk): `{"name": "...", "content": "...", "offset": 0, "totalSize": 0}` | **JSON** (Broadcast): `{"username": "...", "message": "<file_name>", "type": "file"}` | Kết nối và xử lý **tải lên file** theo từng đoạn. Broadcast khi hoàn tất.                |

## 📊 KẾT QUẢ THỰC NGHIỆM

_Màn hình chính và giao diện login_

![main](source/giao%20diện.jpg)

![Login](source/login.jpg)
![Signin](source/signin.png)

_Chatspace_

![Chatspace](source/chat.jpg)

_Gửi file bất đồng bộ_

![sendfile](source/gửi%20file.jpg)

## 🧩 CẤU TRÚC DỰ ÁN

```
assignment-network-project/
├── README.md
├── INSTRUCTION.md
├── statics/
│   ├── diagram.png
│   └── dataset_sample.csv
└── source/
    ├── .gitignore
    ├── client/
    │   ├── README.md
        └── src/
           │       ├── assets/             # Tài nguyên tĩnh
           │       │   └── main.css
           │       ├── components/         # Các thành phần tái sử dụng
           │       │   ├── icons/          # Các icon
           │       │   ├── stores/         # Quản lý trạng thái (ví dụ: Redux/Zustand stores)
           │       │   ├── AuthModal.jsx
           │       │   ├── AuthModal.module.css
           │       │   ├── ChatSpace.jsx
           │       │   ├── ChatSpace.module.css
           │       │   ├── Home.jsx
           │       │   ├── Home.module.css
           │       │   ├── Nav.jsx
           │       │   └── Nav.module.css
           │        ── views/              # Các trang/khung nhìn chính
           │        │   └── HomeView.jsx
           │        ├── App.css
           │        ├── App.jsx           # Component gốc của ứng dụng
           │        ├── index.css
           │        └── main.jsx          # Điểm khởi đầu của Client
    ├── server/
    │   ├── README.md
    │   └── .
        ├── configs/
        │   ├── database.py       # Cấu hình kết nối MongoDB
        │   ├── hashing.py        # Xử lý băm (hash) mật khẩu (chưa thấy code)
        │   ├── jwt_token.py      # Tạo và xác thực JWT
        │   └── websocket_manager.py # Quản lý kết nối WebSocket
        ├── models/
        │   └── user_model.py     # Định nghĩa cấu trúc User (Pydantic Model)
        ├── routers/
        │   ├── authentication.py # API đăng ký, đăng nhập, xác thực
        │   ├── message_router.py # API tin nhắn và tải file
        │   └── user_router.py    # API người dùng
        ├── schemas/
        │   └── token_data_schema.py # Định nghĩa cấu trúc dữ liệu Token
        ├── serializers/
        │   ├── message_serializer.py # Chuyển đổi dữ liệu Message từ MongoDB
        │   └── user_serializer.py    # Chuyển đổi dữ liệu User từ MongoDB
        └── main.py                 # Hàm main và các điểm cuối WebSocket chính
```

## 🧩 HƯỚNG PHÁT TRIỂN THÊM

> Nêu ý tưởng mở rộng hoặc cải tiến hệ thống.

- Cải thiện giao diện người dùng

Phát triển giao diện người dùng (Client-side) thân thiện, hiện đại (ví dụ: dùng React/Vue/Flutter), hỗ trợ hiển thị tin nhắn, file, và trạng thái người dùng một cách trực quan.

- Thêm tính năng xác thực và phân quyền

Yêu cầu JWT Authentication cho kết nối WebSocket (/ws/{username} và /ws/file/{username}) bằng cách gửi token qua tham số truy vấn.

- Tối ưu hóa hiệu suất

Triển khai Redis Pub/Sub để quản lý các kết nối WebSocket, cho phép hệ thống mở rộng sang kiến trúc đa máy chủ (clustering). Điều này đảm bảo tin nhắn 1-1 và broadcast hoạt động chính xác ngay cả khi có nhiều server FastAPI.

- Triển khai trên cloud

Chuyển đổi chuỗi kết nối MongoDB sang MongoDB Atlas hoặc dịch vụ DB cloud khác, và triển khai ứng dụng FastAPI trên các nền tảng đám mây (ví dụ: AWS ECS/EC2, Google Cloud Run) để đảm bảo khả năng mở rộng và tính sẵn sàng cao.

- Hỗ trợ Tải File Lớn

Thay vì truyền toàn bộ file qua WebSocket, tích hợp với dịch vụ lưu trữ đối tượng (Amazon S3 hoặc Google Cloud Storage) và sử dụng URL tải lên đã ký (signed URL) để client tải file trực tiếp lên cloud, giải phóng tài nguyên server.
````
