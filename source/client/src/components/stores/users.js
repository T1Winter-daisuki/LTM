// import { create } from 'zustand';
// import axios from 'axios';

// export const useUserStore = create((set, get) => ({
//   user: null,
//   token: null,
//   loading: false,
//   errorMessage: '',

//   handleLogin: async ({ username, password }) => {
//     set({ loading: true });
//     try {
//       const formData = new FormData();
//       formData.append('username', username);
//       formData.append('password', password);

//       const response = await axios.post('http://localhost:8000/auth/login', formData);

//       const token = response.data.access_token;
//       localStorage.setItem('token', token);
//       axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

//       const userInfo = await axios.get('http://localhost:8000/auth/get_current_user');

//       set({
//         user: { username: userInfo.data.username, status: 'Đăng nhập' },
//         token,
//         loading: false,
//         errorMessage: '',
//       });
//     } catch (error) {
//       set({ loading: false, errorMessage: 'Thông tin đăng nhập không đúng!' });
//     }
//   },

//   handleLogout: () => {
//     localStorage.removeItem('token');
//     set({ user: null, token: null });
//   },

//   handleSignup: async ({ username, password, re_password, full_name }) => {
//     if (password.length < 8) {
//       return set({ errorMessage: 'Mật khẩu cần có tối thiểu 8 ký tự!' });
//     }
//     if (password !== re_password) {
//       return set({ errorMessage: 'Mật khẩu không khớp!' });
//     }

//     set({ loading: true, errorMessage: '' });
//     try {
//       const response = await axios.post('http://localhost:8000/auth/register', {
//         username,
//         password,
//         full_name,
//       });

//       set({
//         user: { data: response.data, status: 'Đăng ký' },
//         loading: false,
//       });
//     } catch (error) {
//       set({ loading: false, errorMessage: error.response?.data?.detail || 'Đăng ký thất bại' });
//     }
//   },

//   clearErrorMessage: () => set({ errorMessage: '' }),

//   getUser: async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

//     try {
//       const userInfo = await axios.get('http://localhost:8000/auth/get_current_user');
//       set({ user: { username: userInfo.data.username }, token });
//     } catch (error) {
//       set({ user: null, token: null });
//       localStorage.removeItem('token');
//       // redirect có thể dùng react-router trong component
//     }
//   },
// }));
// fake để sửa UI /chat
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: { username: "Alice", status: "online" }, // user hiện tại
  token: "fake-token",
  loading: false,
  errorMessage: "",

  handleLogin: async ({ username }) => {
    set({ user: { username, status: "online" }, token: "fake-token" });
  },

  handleSignup: async ({ username }) => {
    set({ user: { username, status: "online" }, token: "fake-token" });
  },

  handleLogout: () => set({ user: null, token: null }),
  clearErrorMessage: () => set({ errorMessage: "" }),

  // fake danh sách tất cả user
  getAllUsers: () => [
    { username: "Alice", status: "online" },
    { username: "Bob", status: "offline" },
    { username: "Charlie", status: "online" },
  ],
}));