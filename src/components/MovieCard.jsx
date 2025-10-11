import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../constants/tmdb';
import { User2 } from 'lucide-react';

// 🧩 MovieCard: 포스터, 제목, 평점
export default function MovieCard({
  movieId,
  imagePath,
  movieTitle,
  voteRating,
  voteCount,
  releaseDate,
}) {
  // 평점 소수 반올림
  const ratingRounded = Math.round(Number(voteRating) * 10) / 10;

  return (
    <Link to={`/details/${movieId}`} className="group block">
      <article>
        <img
          src={`${IMAGE_URL}${imagePath}`}
          alt={movieTitle}
          loading="lazy"
          className="w-full aspect-[2/3] object-cover
        filter grayscale transition duration-700 ease-out
        group-hover:grayscale-0 group-focus-visible:grayscale-0"
        />

        <div className="grid px-4 py-5 gap-5 bg-neutral-900 group-hover:bg-gradient-to-b group-hover:from-neutral-700/40 group-hover:via-transparent group-hover:to-transparent transition-all duration-700 ease-in-out">
          <h3 className="text-neutral-200 text-center">{movieTitle}</h3>
          <div className="border-t border-neutral-800 w-full" />
          <div className="flex justify-between">
            <div className="flex flex-col text-left gap-0.5">
              <p className="text-neutral-500 text-xs">Rate</p>
              <p className="flex items-center text-center text-neutral-200 gap-2 text-sm">
                <span>{ratingRounded.toFixed(1)}</span>
                <span className="flex items-center gap-1">
                  / <User2 className="w-3 h-3 inline" />
                  {voteCount}
                </span>
              </p>
            </div>
            <div className="flex flex-col text-left gap-0.5">
              <p className="text-neutral-500 text-xs">Release Date</p>
              <p className="flex items-center text-center text-neutral-300 gap-2">
                <span className="text-sm">{releaseDate}</span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
