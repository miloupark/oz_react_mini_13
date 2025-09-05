import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import AuthButtons from "./AuthButtons";

export default function NavBar() {
  return (
    <header className="w-full max-w-[1280px] flex justify-between items-center py-5">
      <Logo />
      <nav className="flex gap-2">
        <SearchForm />
        <AuthButtons LinkDir={"/login"} ButtonText={"Login"} />
        <AuthButtons LinkDir={"/signup"} ButtonText={"Signup"} />
      </nav>
    </header>
  );
}
