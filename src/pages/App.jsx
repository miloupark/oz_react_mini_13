import movieListData from "../data/movieListData.json";
import MovieCard from "../components/MovieCard";
import "../App.css";
import { useState } from "react";

export default function App() {
  // movieListData의 results 배열로 접근
  const [movies] = useState(movieListData.results);

  return (
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
  );
}
