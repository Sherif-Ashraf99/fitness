import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";
import styles from "./TopTournamentsCarousel.module.css";
import LoadingTournamentsCarousel from "./LoadingTournamentsCarousel";
import { ImgURL, getServiceAndSportRoute } from "src/utils/globalFn";
import { Link, useLocation } from "react-router-dom";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";

function TopTournamentsCarousel({ data, dir, isLoading }) {
  const { pathname } = useLocation();
  const { width } = useWindowSize();

  const getTournamentsNumber = () => {
    if (width < 320) return 1;
    if (width < 575) return 3;
    if (width < 767) return 4;
    if (width < 992) return 5;
    if (width < 1024) return 6;
    if (width < 1200) return 7;
    return 8;
  };

  return (
    <div className={styles["top-tournaments-carousel"]}>
      {isLoading && (
        <SkeletonsElements
          type="tournamentsCarousel"
          tournamentsNumber={getTournamentsNumber()}
        />
      )}
      {!isLoading && (
        <Swiper
          slidesPerView={8}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          dir={dir()}
          breakpoints={{
            1400: {
              slidesPerView: 8,
            },
            1200: {
              slidesPerView: 7,
            },
            1024: {
              slidesPerView: 6,
            },
            992: {
              slidesPerView: 5,
            },
            767: {
              slidesPerView: 4,
            },
            575: {
              slidesPerView: 3,
            },
            320: {
              slidesPerView: 3,
            },
          }}
        >
          {Children.toArray(
            data.map(({ service_id, sport_id, title, id, logo }) => (
              <SwiperSlide style={{ padding: "20px" }}>
                <Link
                  to={{
                    pathname: `${getServiceAndSportRoute(
                      service_id,
                      sport_id
                    )}tournament/${id}/overview`,
                    state: { previousPathname: pathname },
                  }}
                  className={styles["league"]}
                >
                  <div className={styles["img-league"]}>
                    <img
                      loading="lazy"
                      src={ImgURL(logo)}
                      alt=""
                      width={45}
                      height={45}
                    />
                  </div>
                  <h3>{title}</h3>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      )}
    </div>
  );
}

TopTournamentsCarousel.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  data: PropTypes.array,
  dir: PropTypes.func,
};

export default withOnDemandAndErrorBoundary(TopTournamentsCarousel);
