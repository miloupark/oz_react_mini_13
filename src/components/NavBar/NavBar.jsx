import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import SearchTrigger from "./SearchTrigger";

export default function NavBar() {
  return (
    <header className="w-full max-w-[1280px] flex justify-between items-center py-5">
      <Logo />
      <nav className="flex gap-2">
        <SearchTrigger />
        <AuthButtons LinkDir={"/login"} ButtonText={"Login"} />
        <AuthButtons LinkDir={"/signup"} ButtonText={"Signup"} />
      </nav>
    </header>
  );
}
