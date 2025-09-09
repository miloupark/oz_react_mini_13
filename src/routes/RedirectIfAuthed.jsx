import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RedirectIfAuthed() {
  const { user } = useAuth();
  const location = useLocation();
  if (user) {
    const to = location.state?.from ?? "/"; // 원래 가려던 곳이나 홈으로
    return <Navigate to={to} replace />;
  }
  return <Outlet />;
}
