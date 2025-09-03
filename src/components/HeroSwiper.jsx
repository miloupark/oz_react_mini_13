import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IMAGE_URL } from "../constants/tmdb";
import movieDetailData from "../data/movieDetailData.json";

export default function HeroSwiper() {
  const movie = movieDetailData;

  return (
    <Swiper
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      {/* ⚠️ 임시 반복: 데모용 같은 슬라이드 8개 렌더 */}
      {Array.from({ length: 8 }, (_, i) => (
        <SwiperSlide key={i}>
          <img
            src={`${IMAGE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
