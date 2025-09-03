import { IMAGE_URL } from "../constants/tbdb";

// 🧩 MovieCard: 포스터, 제목, 평점
export default function MovieCard({ imagePath, movieTitle, movieRating }) {
  return (
    <article>
      <img src={`${IMAGE_URL}${imagePath}`} alt={movieTitle} />
      <h3>{movieTitle}</h3>
      <p>Rating {movieRating}</p>
    </article>
  );
}
