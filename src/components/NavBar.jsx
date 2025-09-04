import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function NavBar() {
  return (
    <header className="flex justify-between py-2">
      {/* 로고 */}
      <Link to="/">
        <h1 className="text-xl font-bold text-foreground hover:text-primary transition-colors">
          FilmArchive
        </h1>
      </Link>

      {/* 검색창 */}
      <form className="flex gap-2 items-center">
        <label htmlFor="search" className="sr-only">
          영화 검색
        </label>
        <Input id="search" type="text" placeholder="영화 검색" />
        <Button variant="outline" type="submit">
          <Search />
        </Button>
      </form>

      {/* 로그인, 회원가입 */}
      <nav className="flex gap-2">
        <Button variant="outline" asChild>
          <NavLink to="/login">로그인</NavLink>
        </Button>
        <Button variant="outline" asChild>
          <NavLink to="/signup">회원가입</NavLink>
        </Button>
      </nav>
    </header>
  );
}
