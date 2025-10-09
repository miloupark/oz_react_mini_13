import { Route, Routes } from 'react-router-dom';
import App from '../pages/App';
import MovieDetail from '../pages/MovieDetail';
import Layout from '../layouts/Layout';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Search from '@/pages/Search';
import RequireAuth from './RequireAuth';
import RedirectIfAuthed from './RedirectIfAuthed';
import Favorite from '@/pages/mypage/Favorite';
import Setting from '@/pages/mypage/Setting';
import Mypage from '@/pages/mypage/Mypage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search" element={<Search />} />

        {/* 로그인 필요한 페이지 */}
        <Route element={<RequireAuth />}>
          <Route path="/mypage" element={<Mypage />}>
            <Route path="favorite" element={<Favorite />} />
            <Route path="setting" element={<Setting />} />
          </Route>
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
