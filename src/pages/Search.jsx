import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "@/components/MovieCard";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("movie") ?? "").trim();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  useEffect(() => {
    if (!token || query.length < 2) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=ko-KR&page=1&include_adult=false`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const items = (data?.results ?? [])
          .filter((m) => m && m.adult === false)
          .slice(0, 20);
        setMovies(items);
      })

      .catch(() => {
        setMovies([]);
      })

      .finally(() => setLoading(false));
  }, [query, token]);

  return (
    <main className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{query}</h2>
        <p className="text-sm text-muted-foreground">총 {movies.length}편</p>
      </div>
      {loading && <p className="mt-4">검색 중…</p>}
      {!loading && query && movies.length === 0 && (
        <p className="mt-4">검색 결과가 없습니다.</p>
      )}

      <section className=" max-w-[1280px] space-y-4 grid grid-cols-5 gap-5">
        {movies.map((m) => (
          <MovieCard
            key={m.id}
            movieId={m.id}
            imagePath={m.poster_path}
            movieTitle={m.title ?? m.original_title}
            movieRating={m.vote_average}
          />
        ))}
      </section>
    </main>
  );
}
