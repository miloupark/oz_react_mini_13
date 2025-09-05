import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function NavBar() {
  return (
    <header className="w-full max-w-[1280px] flex justify-between items-center py-5">
      {/* 로고 */}
      <Link to="/">
        <h1 className="text-xl font-normal text-foreground hover:text-primary transition-colors">
          FilmArchive
        </h1>
      </Link>

      <nav className="flex gap-2">
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
        <Button variant="outline" asChild>
          <NavLink to="/login">Login</NavLink>
        </Button>
        <Button variant="outline" asChild>
          <NavLink to="/signup">SignUp</NavLink>
        </Button>
      </nav>
    </header>
  );
}
