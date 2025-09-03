import { useState } from "react";
import { IMAGE_URL } from "../constants/tmdb";
import movieDetailData from "../data/movieDetailData.json";

// 🧩 MovieDetail: 이미지(배경or포스터), 제목, 평점, 장르, 줄거리
export default function MovieDetail() {
  const [movie] = useState(movieDetailData);

  return (
    <>
      <section>
        <img src={`${IMAGE_URL}${movie.backdrop_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>Rating {movie.vote_average}</p>
        <div>
          {movie.genres.map((genres) => (
            <span key={genres.id}>{genres.name}</span>
          ))}
        </div>
        <p>{movie.overview}</p>
      </section>
    </>
  );
}
