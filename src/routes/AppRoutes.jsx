import { Route, Routes } from "react-router-dom";
import App from "../pages/App";
import MovieDetail from "../pages/MovieDetail";
import Layout from "../layouts/Layout";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Search from "@/pages/Search";
import Profile from "@/pages/user/Profile";
import Favorite from "@/pages/user/Favorite";
import Setting from "@/pages/user/Setting";
import RequireAuth from "./RequireAuth";
import RedirectIfAuthed from "./RedirectIfAuthed";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />

        {/* 로그인 필요한 페이지 */}
        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        {/* 로그인 상태면 접근 불가 */}
        <Route element={<RedirectIfAuthed />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
}
