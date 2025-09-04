import MovieCard from "../components/MovieCard";
import "../App.css";
import { useEffect, useState } from "react";
import HeroSwiper from "../components/HeroSwiper";
import { TMDB_BASE_URL } from "@/constants/tmdb";

export default function App() {
  const [movies, setMovies] = useState([]);

  // App 컴포넌트 마운트될 때 API에 Popular 영화 목록 요청 훅
  useEffect(() => {
    // API 요청 옵션
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };

    fetch(`${TMDB_BASE_URL}movie/popular?language=ko-KR&page=1`, options)
      // Response 객체를 JSON 데이터로 파싱
      .then((res) => res.json())
      // 응답 데이터 adult 속성 필터링 후 반환
      .then((data) => {
        const excludeAdults = data.results.filter(
          (movie) => movie.adult === false
        );
        // 상태 업데이트 (adult 속성 제외한 목록 상태)
        setMovies(excludeAdults);
      })
      // 💡 에러 화면 UI 구현 및 state로 개선 필요
      .catch((err) => console.error(err));
  }, []);
  // 의존성 배열을 비워, 컴포넌트 마운트될 때 한 번 실행

  return (
    <>
      <HeroSwiper />
      <section className="grid grid-cols-5 gap-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieId={movie.id}
            imagePath={movie.poster_path}
            movieTitle={movie.title}
            movieRating={movie.vote_average}
          />
        ))}
      </section>
    </>
  );
}
