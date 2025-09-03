import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="flex justify-between py-2">
      {/* 로고 */}
      <Link to="/">
        <h1>Movie</h1>
      </Link>

      {/* 검색창 */}
      <form>
        <label htmlFor="search" className="sr-only">
          영화 검색
        </label>
        <input
          id="search"
          type="text"
          placeholder="영화 검색"
          aria-label="영화 검색"
        />
        <button type="submit">검색</button>
      </form>

      {/* 로그인, 회원가입 */}
      <nav>
        <NavLink to="/login">로그인</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
      </nav>
    </header>
  );
}
