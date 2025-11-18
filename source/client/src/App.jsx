import { Routes, Route, Navigate } from "react-router-dom";
import HomeView from "./views/HomeView";
import ChatSpace from "./components/ChatSpace/ChatSpace";
import OptionsView from "./views/OptionsView";
import Nav from "./components/Nav/Nav";
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

      <Route
        path="/options"
        element={<ProtectedRoute><OptionsView /></ProtectedRoute>}
      />

      {/* Chat 1-1 */}
      <Route
        path="/chat/1-1/:roomId?"
        element={
          <>
          <Nav />
            <ProtectedRoute>
              <ChatSpace type="1-1" user={user} />
            </ProtectedRoute>
          </>
          }
      />

      {/* Chat nhóm */}
      <Route
        path="/chat/group/:roomId?"
        element={
          <>
          <Nav />
            <ProtectedRoute>
              <ChatSpace type="group" user={user} />
            </ProtectedRoute>
          </>
          }
      />
    </Routes>

  );
}