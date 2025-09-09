import { createContext, useContext, useState, useMemo } from "react";
// 컨텍스트 생성
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login = ({ name, email, avatarUrl }) =>
    setUser({
      id: "demo",
      name,
      email,
      avatarUrl: avatarUrl ?? null,
    });

  const logout = () => setUser(null);
  // 아바타 갱신
  const updateAvatar = (url) =>
    setUser((u) => (u ? { ...u, avatarUrl: url } : u));

  const value = useMemo(() => ({ user, login, logout, updateAvatar }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Provider 없이 쓰면 에러 투척
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
