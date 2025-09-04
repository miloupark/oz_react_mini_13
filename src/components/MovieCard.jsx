import { Link } from "react-router-dom";
import { IMAGE_URL } from "../constants/tmdb";

// 🧩 MovieCard: 포스터, 제목, 평점
export default function MovieCard({
  movieId,
  imagePath,
  movieTitle,
  movieRating,
}) {
  return (
    <Link to={`/details/${movieId}`}>
      <article>
        <img src={`${IMAGE_URL}${imagePath}`} alt={movieTitle} />
        <h3>{movieTitle}</h3>
        <p>Rating {movieRating}</p>
      </article>
    </Link>
  );
}
