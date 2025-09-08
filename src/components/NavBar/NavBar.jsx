import Logo from "./Logo";
import AuthButtons from "./AuthButtons";
import SearchTrigger from "./SearchTrigger";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-background w-full max-w-[1280px] mx-auto flex justify-between items-center py-5 px-3 sm:px-4 md:px-6 min-w-0">
      <Logo className="shrink-0" />
      <nav className="flex items-center gap-2 flex-1 justify-end min-w-0">
        <div className="w-10 sm:flex-1 sm:min-w-[140px] sm:max-w-[240px]">
          <SearchTrigger />
        </div>
        <AuthButtons LinkDir={"/login"} ButtonText={"Login"} />
        <AuthButtons
          LinkDir={"/signup"}
          ButtonText={"Signup"}
          className="hidden md:block"
        />
      </nav>
    </header>
  );
}
