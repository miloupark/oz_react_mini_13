import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import SearchTrigger from "./SearchTrigger";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

export default function NavBar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-3 sm:px-4 md:px-6 min-w-0">
      <Logo className="shrink-0" />
      <nav className="flex items-center gap-2 flex-1 justify-end min-w-0">
        <div className="w-10 sm:flex-1 sm:min-w-[140px] sm:max-w-[240px]">
          <SearchTrigger />
        </div>
        {!user ? (
          <AuthButtons LinkDir={"/login"} ButtonText={"Login"} />
        ) : (
          <UserMenu
            user={user}
            onLogout={async () => {
              try {
                // Supabase signOut()은 서버와 통신하는 비동기 함수 (Promise 반환)
                await signOut();
                // 로그아웃 후 홈으로 이동
                navigate("/", { replace: true });
              } catch (err) {
                console.error("로그아웃 실패:", err);
              }
            }}
          />
        )}
      </nav>
    </header>
  );
}
