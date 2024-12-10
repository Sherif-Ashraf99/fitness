import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import PropTypes from "prop-types";
import styles from "./TournamentsCarousel.module.css";
import { ImgURL } from "src/utils/globalFn";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { Pagination } from "swiper";

function TournamentsCarousel({ data, getIndexTeam, isLoading }) {
  const [active, Setactive] = useState(0);
  const { width } = useWindowSize();

  const groupsKey = {
    "Group 1": "المجموعة الأولى",
    "Group 2": "المجموعة الثانية",
    "Group 3": "المجموعة الثالثة",
    "Group 4": "المجموعة الرابعة",
    "Group 5": "المجموعة الخامسة",
    "Group 6": "المجموعة السادسة",
    "Group 7": "المجموعة السابعة",
    "Group 8": "المجموعة الثامنة",
    "Group 9": "المجموعة التاسعة",
  };

  const getTournamentsNumber = () => {
    if (width < 320) return 1;
    if (width < 575) return 3;
    if (width < 767) return 4;
    if (width < 992) return 5;
    if (width < 1024) return 6;
    return 7;
  };

  return (
    <div className={styles["tournaments-carousel"]}>
      {isLoading && (
        <SkeletonsElements
          type="tournamentsCarousel"
          horizontal={width > 992 && true}
          tournamentsNumber={getTournamentsNumber()}
          bgTransparent={true}
        />
      )}

      {!isLoading && (
        <Swiper
          slidesPerView={7}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Scrollbar, Pagination]}
          className="mySwiper"
          breakpoints={{
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
          {data?.map(({ title, logo }, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${styles["tournament-card"]} ${
                  active === index ? styles["active"] : ""
                }`}
                onClick={() => getIndexTeam(index, Setactive(index))}
              >
                <div className={`${styles["img-league"]}`}>
                  <img loading="lazy" src={ImgURL(logo)} alt={title} />
                </div>
                <span>
                  {groupsKey[title] || title?.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

TournamentsCarousel.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  getIndexTeam: PropTypes.func,
};

export default withOnDemandAndErrorBoundary(TournamentsCarousel, {
  height: "3rem",
});
