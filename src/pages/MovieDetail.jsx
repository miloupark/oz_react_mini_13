import { useEffect, useState } from "react";
import { IMAGE_URL, TMDB_BASE_URL } from "../constants/tmdb";
import { useParams } from "react-router-dom";

// 🧩 MovieDetail: 이미지(배경or포스터), 제목, 평점, 장르, 줄거리
export default function MovieDetail() {
  // MovieCard와 id가 일치하는 디테일 페이지 보여주기
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // API 요청 옵션
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };

    // https://api.themoviedb.org/3/movie/{movie_id}
    fetch(`${TMDB_BASE_URL}movie/${id}?language=ko-KR`, options)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Loading
  if (!movie) {
    return <div>Loading UI 필요</div>;
  }

  return (
    <>
      <section className="w-full max-w-[1280px] mx-auto grid justify-items-center grid-cols-1 lg:grid-cols-2 p-5 gap-5">
        <img src={`${IMAGE_URL}${movie.backdrop_path}`} alt={movie.title} />
        <div className="lg:w-full">
          <div className="flex gap-5">
            <h2>{movie.title}</h2>
            <p>Rating {movie.vote_average}</p>
          </div>
          <div className="flex gap-4">
            {movie.genres.map((genres) => (
              <span key={genres.id}>{genres.name}</span>
            ))}
          </div>
        </div>
        <p className="col-span-full lg:w-full text-center">{movie.overview}</p>
      </section>
    </>
  );
}
