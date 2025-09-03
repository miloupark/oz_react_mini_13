import { useState } from "react";
import { IMAGE_URL } from "../constants/tmdb";
import movieDetailData from "../data/movieDetailData.json";

// 🧩 MovieDetail: 이미지(배경or포스터), 제목, 평점, 장르, 줄거리
export default function MovieDetail() {
  const [movie] = useState(movieDetailData);

  return (
    <>
      <section className="grid justify-items-center pt-5 gap-y-4">
        <img src={`${IMAGE_URL}${movie.backdrop_path}`} alt={movie.title} />
        <div className="flex gap-5">
          <h2>{movie.title}</h2>
          <p>Rating {movie.vote_average}</p>
        </div>
        <div className="flex gap-4">
          {movie.genres.map((genres) => (
            <span key={genres.id}>{genres.name}</span>
          ))}
        </div>
        <p className="w-xl">{movie.overview}</p>
      </section>
    </>
  );
}
