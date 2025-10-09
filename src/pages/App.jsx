import MovieCard from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { TMDB_BASE_URL } from '@/constants/tmdb';
import Hero from '../components/Hero';
import { useInView } from 'react-intersection-observer';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // 화면에 특정 요소가 보이는지 감시 훅
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '200px' });

  // TMDB API 호출 함수
  async function fetchMovies(pageNum) {
    setLoading(true); // 요청 시작 시 로딩 true

    // API 요청 옵션
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };
    try {
      // TMDB 인기 영화 데이터 가져오기
      const res = await fetch(
        `${TMDB_BASE_URL}movie/popular?language=ko-KR&page=${pageNum}`,
        options
      );

      // 응답 데이터를 JSON 형태로 파싱
      const data = await res.json();

      // 응답 데이터 adult 속성 필터링
      const excludeAdults = data.results.filter(
        (movie) => movie.adult === false
      );

      // 기존 데이터 뒤에 추가 데이터
      setMovies((prev) => [...prev, ...excludeAdults]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false); // 요청 끝나면 로딩 해제
    }
  }

  // 컴포넌트 처음 마운트될 때 page=1 요청
  useEffect(() => {
    fetchMovies(1);
  }, []);

  // ref 화면에 보이면 page + 1
  useEffect(() => {
    if (inView && !loading) setPage((page) => page + 1);
  }, [inView, loading]);

  // page 값이 변경되면, 추가 데이터 요청
  useEffect(() => {
    if (page > 1) fetchMovies(page);
  }, [page]);

  return (
    <div className="w-full justify-items-center mx-auto text-center font-figtree">
      <Hero />
      <section className="max-w-[1280px] grid-cols-1 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 grid gap-5">
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

      {/* 화면에 들어오면 다음 페이지 로드 */}
      <div ref={ref} />
    </div>
  );
}
