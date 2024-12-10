import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import PropTypes from "prop-types";
import styles from "./TeamsSectionCarousel.module.css";
import {
  ImgURL,
  getRouteInfo,
  getServiceAndSportRoute,
} from "src/utils/globalFn";
import { useLocation, useNavigate } from "react-router-dom";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";
import { useTranslation } from "react-i18next";

const apiFn = (params) => apis.teams.getTeams(params);

function TeamsSectionCarousel() {
  const {
    i18n: { dir },
  } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { serviceId: service_id } = getRouteInfo(pathname);

  const { isLoading, data = [] } = useQuery({
    queryKey: ["teams-carousel", pathname],
    queryFn: () => apiFn({ service_id, in_carousel: true, team_type: 1 }),
  });
  const getTournamentsNumber = () => {
    if (width < 320) return 1;
    if (width < 575) return 3;
    if (width < 767) return 4;
    if (width < 992) return 5;
    if (width < 1024) return 6;
    if (width < 1200) return 7;
    return 8;
  };

  const handleTeamClick = (team) => {
    if (team.id === 6631) {
      return navigate(`/al-ahly/local/team/6631/overview`);
    }
    navigate(
      `${getServiceAndSportRoute(team.services[0], team.sport_id)}team/${
        team.id
      }/overview`
    );
  };

  return (
    <div className={styles["teams-section-carousel"]}>
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
            data.map((team) => (
              <SwiperSlide style={{ padding: "20px" }}>
                <div
                  className={styles["team"]}
                  onClick={() => handleTeamClick(team)}
                >
                  <div className={styles["img-team"]}>
                    <img
                      loading="lazy"
                      src={ImgURL(team?.logo)}
                      alt={team?.name}
                      width={45}
                      height={45}
                    />
                  </div>
                  <h3>{team?.name}</h3>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      )}
    </div>
  );
}

TeamsSectionCarousel.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  data: PropTypes.array,
  dir: PropTypes.func,
};

export default withOnDemandAndErrorBoundary(TeamsSectionCarousel);
