import { Route, Routes } from "react-router-dom";
import App from "../pages/App";
import MovieDetail from "../pages/MovieDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/details/:id" element={<MovieDetail />} />
    </Routes>
  );
}
