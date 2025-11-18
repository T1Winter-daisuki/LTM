import React, { useEffect } from "react";
import Home from "../components/Home/Home";
import Nav from "../components/Nav/Nav";
import { useUserStore } from "../components/stores/users";
import { useNavigate } from "react-router-dom";

export default function HomeView() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/options", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <Nav />
      <main>{!user && <Home />}</main>
    </div>
  );
}
