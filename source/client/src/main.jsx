import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { useUserStore } from "./components/stores/users";
import "antd/dist/reset.css";
import "./assets/main.css";

const userStore = useUserStore.getState();
userStore.getUser?.();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);