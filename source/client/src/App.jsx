import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import ChatSpace from "./components/ChatSpace";
import { useUserStore } from "./components/stores/users";

export default function AppRouter() {
  const user = useUserStore((state) => state.user);

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route path="/home" element={<HomeView />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatSpace user={user} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}