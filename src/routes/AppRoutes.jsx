import { Route, Routes } from "react-router-dom";
import App from "../pages/App";
import MovieDetail from "../pages/MovieDetail";
import Layout from "../layouts/Layout";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
