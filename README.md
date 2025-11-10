# BÀI TẬP LỚN: LẬP TRÌNH MẠNG  

## [Tên dự án của nhóm]

> 📘 *Mẫu README này là khung hướng dẫn. Sinh viên chỉ cần điền thông tin của nhóm và nội dung dự án theo từng mục.*

---

## 🧑‍💻 THÔNG TIN NHÓM

| STT | Họ và Tên | MSSV | Email | Đóng góp |
|-----|-----------|------|-------|----------|
| 1 | Nguyễn Hữu Hưng | B22DCCN412 | hungnguyencva2004@gmail.com | ... |
| 2 | Lê Hải Đăng | B22DCCN207 | ledang18102004@gmail.com | ... |
| 3 | Bùi Hoàng Sơn | B22DCCN687 | hoangsonbui.hp@gmail.com | ... |

**Tên nhóm:** Nhóm 01 – Lập trình mạng  
**Chủ đề đã đăng ký:** (ChatApp)

---

## 🧠 MÔ TẢ HỆ THỐNG

#### 1. Giới thiệu

  

Ứng dụng Chat App là một ứng dụng cho phép người dùng trò chuyện với nhau trong thời gian thực. Ứng dụng này được phát triển để cung cấp trải nghiệm trò chuyện dễ dàng và nhanh chóng, cho phép người dùng gửi tin nhắn, hình ảnh và tệp đính kèm một cách nhanh chóng.

  

#### 2. Các tính năng chính

  
**Đăng nhập và đăng ký:** Ứng dụng cho phép người dùng đăng nhập bằng tên đăng nhập và mật khẩu hoặc đăng ký tài khoản mới.

**Trò chuyện Real-time:** Người dùng có thể trò chuyện với nhau một cách trong thời gian thực, không cần phải làm mới trang hoặc tải lại. Khi không có kết nối internet, vẫn có thể gửi được tin nhắn, tin nhắn sẽ được đồng bộ khi online.
 

**Gửi Tệp Đính Kèm** **:** Người dùng có thể gửi tệp đính kèm như tài liệu, hồ sơ và tệp âm thanh bất đồng bộ.


  

**Cấu trúc logic tổng quát:**
```
client  <-->  server  <-->  (database / service nếu có)
```

**Sơ đồ hệ thống:**

![System Diagram](./statics/diagram.png)

---

## ⚙️ CÔNG NGHỆ SỬ DỤNG

Bảng này liệt kê các công nghệ và thư viện chính được sử dụng trong dự án.

| Thành phần | Công nghệ | Ghi chú |
|:------------|:-----------|:---------|
| **Back-end Framework** | **FastAPI** | REST API, hiệu năng cao, dễ học, sẵn sàng cho production. |
| **Database** | **MongoDB** | NoSQL Database để lưu trữ dữ liệu. |
| **Front-end Framework** | **VueJs 3** | Dynamic Javascript Framework cho giao diện người dùng. |
| **UI Components** | **Ant Design Vue** | Thư viện cung cấp các thành phần UI phong phú. |

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### 1. Clone repository
```bash
git clone <https://github.com/jnp2018/mid-project-207412687.git>
cd assignment-network-project
```

### 2. Chạy server
```bash
cd source/server
- Cài đặt thư viện
	```
	pip install -r requirements.txt
	```
- Chạy chương trình
	 ```
	 uvicorn main:app --reload 
	```
```

### 3. Chạy client
```bash
cd source/client/Chat
- Cài đặt thư viện
	```
	npm install
	```
-  Chạy chương trình:
	```
	npm run dev
	```
```

### 4. Kiểm thử nhanh
```bash
# Các lệnh test
```

---

## 🔗 GIAO TIẾP (GIAO THỨC SỬ DỤNG)

| Endpoint | Protocol | Method | Input | Output |
|----------|----------|--------|-------|--------|
| `/health` | HTTP/1.1 | GET | — | `{"status": "ok"}` |
| `/compute` | HTTP/1.1 | POST | `{"task":"sum","payload":[1,2,3]}` | `{"result":6}` |

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