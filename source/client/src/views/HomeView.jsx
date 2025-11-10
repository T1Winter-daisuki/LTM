import React from "react";
import Home from "../components/Home";
import ChatSpace from "../components/ChatSpace";
import Nav from "../components/Nav";
import { useUserStore } from "../components/stores/users";

export default function HomeView() {
  const { user } = useUserStore();

  return (
    <div>
      <Nav />
      <main>
        {!user ? <Home /> : <ChatSpace user={user} />}
      </main>
    </div>
  );
}