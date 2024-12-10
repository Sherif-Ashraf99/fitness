import { Children } from "react";
import PropTypes from "prop-types";
import styles from "./AhlyTopCarousel.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { ImgURL } from "src/utils/globalFn";
import Skeleton from "react-loading-skeleton";

function AhlyTopCarousel({ isLoading, data, dir }) {
  return (
    <div className={styles["AhlyTopCarousel"]}>
      (
      <Swiper
        dir={dir()}
        slidesPerView={1}
        spaceBetween={10}
        navigation
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}>
        {isLoading &&
          [...Array(10).keys()].map((key) => (
            <SwiperSlide key={key} style={{ marginInlineEnd: "10px" }}>
              <div className={styles["tournament-team-loader"]}>
                <Skeleton />
                <Skeleton circle />
                <Skeleton />
              </div>
            </SwiperSlide>
          ))}
        {!isLoading &&
          Children.toArray(
            data.map((tournament) => (
              <SwiperSlide style={{ marginInlineEnd: "10px" }}>
                <div className={styles["tournament-team"]}>
                  <h3>{tournament.title}</h3>
                  <img src={ImgURL(tournament.logo)} alt={tournament.title} />
                  <span>{tournament.count}</span>
                </div>
              </SwiperSlide>
            )),
          )}
      </Swiper>
      )
    </div>
  );
}

AhlyTopCarousel.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  dir: PropTypes.func,
};

export default AhlyTopCarousel;
