import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="space-y-4">
        <Outlet />
      </main>
    </>
  );
}
