# BÀI TẬP LỚN: LẬP TRÌNH MẠNG

## [Tên dự án của nhóm]

> 📘 _Mẫu README này là khung hướng dẫn. Sinh viên chỉ cần điền thông tin của nhóm và nội dung dự án theo từng mục._

---

## 🧑‍💻 THÔNG TIN NHÓM

<<<<<<< HEAD
| STT | Họ và Tên | MSSV | Email | Đóng góp |
|-----|-----------|------|-------|----------|
| 1 | Nguyễn Hữu Hưng | B22DCCN412 | a@example.com | ... |
| 2 | Lê Hải Đăng | 20IT002 | b@example.com | ... |
| 3 | Lê Văn C | 20IT003 | c@example.com | ... |
=======
| STT | Họ và Tên   | MSSV       | Email                    | Đóng góp |
| --- | ----------- | ---------- | ------------------------ | -------- |
| 1   | Lê Hải Đăng | B22DCCN207 | ledang18102004@gmail.com | ...      |
| 2   | Trần Thị B  | 20IT002    | b@example.com            | ...      |
| 3   | Lê Văn C    | 20IT003    | c@example.com            | ...      |
>>>>>>> LeHaiDang

**Tên nhóm:** Nhóm 01 – Lập trình mạng  
**Chủ đề đã đăng ký:** (…)

---

## 🧠 MÔ TẢ HỆ THỐNG

> Mô tả tổng quan hệ thống mà nhóm triển khai.

Ví dụ:

> Hệ thống bao gồm **server** xử lý yêu cầu và **client** gửi yêu cầu đến server qua giao thức HTTP.  
> Server cung cấp API cho phép tính toán đơn giản hoặc truyền dữ liệu.  
> Client có thể là chương trình CLI, web hoặc ứng dụng desktop.

**Cấu trúc logic tổng quát:**

```
client  <-->  server  <-->  (database / service nếu có)
```

**Sơ đồ hệ thống:**

![System Diagram](./statics/diagram.png)

---

## ⚙️ CÔNG NGHỆ SỬ DỤNG

> Liệt kê công nghệ, framework, thư viện chính mà nhóm sử dụng.

| Thành phần | Công nghệ           | Ghi chú                  |
| ---------- | ------------------- | ------------------------ |
| Server     | Python 3.11 + Flask | REST API                 |
| Client     | Node.js 20 + Axios  | Giao tiếp HTTP           |
| Database   | SQLite              | Lưu trữ dữ liệu tạm thời |
| Triển khai | Docker              | (nếu có)                 |

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### 1. Clone repository

```bash
git clone <repository-url>
cd assignment-network-project
```

### 2. Chạy server

```bash
cd source/server
# Các lệnh để khởi động server
```

### 3. Chạy client

```bash
cd source/client
# Các lệnh để khởi động client
```

### 4. Kiểm thử nhanh

```bash
# Các lệnh test
```

---

## 🔗 GIAO TIẾP (GIAO THỨC SỬ DỤNG)

| Endpoint   | Protocol | Method | Input                              | Output             |
| ---------- | -------- | ------ | ---------------------------------- | ------------------ |
| `/health`  | HTTP/1.1 | GET    | —                                  | `{"status": "ok"}` |
| `/compute` | HTTP/1.1 | POST   | `{"task":"sum","payload":[1,2,3]}` | `{"result":6}`     |

---

## 📊 KẾT QUẢ THỰC NGHIỆM

> Đưa ảnh chụp kết quả hoặc mô tả log chạy thử.

![Demo Result](./statics/result.png)

---

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
    │   └── (client source files...)
    ├── server/
    │   ├── README.md
    │   └── (server source files...)
    └── (các module khác nếu có)
```

---

## 🧩 HƯỚNG PHÁT TRIỂN THÊM

> Nêu ý tưởng mở rộng hoặc cải tiến hệ thống.

- [ ] Cải thiện giao diện người dùng
- [ ] Thêm tính năng xác thực và phân quyền
- [ ] Tối ưu hóa hiệu suất
- [ ] Triển khai trên cloud

---

## 📝 GHI CHÚ

- Repo tuân thủ đúng cấu trúc đã hướng dẫn trong `INSTRUCTION.md`.
- Đảm bảo test kỹ trước khi submit.

---

## 📚 TÀI LIỆU THAM KHẢO

> (Nếu có) Liệt kê các tài liệu, API docs, hoặc nguồn tham khảo đã sử dụng.
