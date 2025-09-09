import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // 로그인 안 된 경우: 로그인 페이지로 보내면서, 돌아올 경로를 state로 저장
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />; // 통과 시 자식 라우트 렌더
}
