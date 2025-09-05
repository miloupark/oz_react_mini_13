import { Link } from "react-router-dom";
import { IMAGE_URL } from "../constants/tmdb";

// 🧩 MovieCard: 포스터, 제목, 평점
export default function MovieCard({
  movieId,
  imagePath,
  movieTitle,
  movieRating,
}) {
  // 평점 소수 반올림
  const ratingRounded = Math.round(Number(movieRating) * 10) / 10;

  return (
    <Link to={`/details/${movieId}`} className="group block">
      <article>
        <img
          src={`${IMAGE_URL}${imagePath}`}
          alt={movieTitle}
          loading="lazy"
          className=" w-full aspect-[2/3] object-cover
        filter grayscale transition duration-300 ease-out
        group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center pt-2 gap-5">
          <h3 className="text-neutral-200 text-start">{movieTitle}</h3>
          <p className="text-neutral-200 text-end">
            {/* toFixed(1)로 소수 첫번째 자리 고정 문자열 */}
            {ratingRounded.toFixed(1)}
          </p>
        </div>
      </article>
    </Link>
  );
}
