import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./TeamsCarousel.module.css";
import { Container } from "react-bootstrap";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";
import {
  ImgURL,
  getRouteInfo,
  getServiceAndSportRoute,
} from "src/utils/globalFn";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { settings } from "./helper";
import Skeleton from "react-loading-skeleton";
import useWindowSize from "src/hooks/useWindowSize";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { useContext, useEffect, useRef, useState } from "react";
import { sharedComponentsContext } from "src/context/shared-context";

const apiFn = (params) => apis.teams.getTeams(params);

function TeamsCarousel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { width } = useWindowSize();
  const { serviceId: service_id, sportId } = getRouteInfo(pathname);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);
  let { tournamentId, id } = useParams();
  tournamentId = pathname.includes("/tournament") ? id : tournamentId;
  const { setHasTeamCarouselData } = useContext(sharedComponentsContext);
  const isMobileView = width < 1200;

  const isEuroCup = pathname.includes("/international/tournament/846");
  const isMatchPageOnMobile =
    pathname.includes("/football-match") && isMobileView;

  const params = {
    service_id,
    in_carousel: true,
    team_type: 1,
    tournament_id: tournamentId,
  };

  const handleEuroCup = (params) => {
    if (isEuroCup) {
      return {
        ...params,
        team_type: 2,
        tournament_id: 846,
      };
    } else return params;
  };

  const { isLoading, data = [] } = useQuery({
    queryKey: ["teams-carousel", sportId, service_id, isEuroCup, tournamentId],
    queryFn: () => apiFn(handleEuroCup(params)),
  });

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

  const getTeamsLoader = () => {
    if (width < 575) return 5;
    if (width < 767) return 6;
    if (width < 1024) return 10;
    return 15;
  };

  const getSlidesToShow = () => getTeamsLoader();

  function SampleNextArrow(props) {
    const { className, style, currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
    return <div className={className} style={{ ...style, display: "none" }} />;
  }

  function SamplePrevArrow(props) {
    const { className, style, currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
    return <div className={className} style={{ ...style, display: "none" }} />;
  }

  useEffect(() => {
    if (isLoading || !data.length) return;
    setMounted(true);
  }, [data, isLoading]);

  // scrolling logic
  const [navBarClass, setNavBarClass] = useState(false);
  useEffect(() => {
    if (pathname.includes("/football-match")) return;

    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos && prevScrollPos > 100) {
        // User has scrolled up
        setNavBarClass(true);
      } else {
        // User has scrolled down
        setNavBarClass(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (isLoading) return;
    setHasTeamCarouselData(data.length !== 0);
  }, [data, isLoading]);

  return (
    <>
      {!!data.length && (
        <div
          className={`${styles["teams-carousel"]} ${
            navBarClass ? styles["scroll-toggle"] : ""
          }

          ${isMatchPageOnMobile ? styles["match-page-mobile"] : ""}
          
          `}
        >
          <Container className="py-3">
            {isLoading && (
              <div className={styles["teams-loader"]}>
                {[...Array(getTeamsLoader()).keys()].map((key) => (
                  <Skeleton key={key} circle />
                ))}
              </div>
            )}
            {!isLoading && (
              <Slider
                ref={sliderRef}
                {...settings}
                initialSlide={
                  data.length - getSlidesToShow() < 0
                    ? 0
                    : data.length - getSlidesToShow()
                }
                nextArrow={<SampleNextArrow />}
                prevArrow={<SamplePrevArrow />}
                swipeEvent={(dir) => {
                  sliderRef.current.swipeDir = dir;
                  const { currentSildeForSwipe } = sliderRef.current;
                  if (dir === "right") {
                    sliderRef.current.slickGoTo(
                      currentSildeForSwipe - getSlidesToShow()
                    );
                  }
                  if (dir === "left") {
                    sliderRef.current.slickGoTo(
                      currentSildeForSwipe + getSlidesToShow()
                    );
                  }
                }}
              >
                {data.map((team) => (
                  <div
                    key={team?.id}
                    className={`d-flex flex-column align-items-center justify-content-center`}
                  >
                    <img
                      src={ImgURL(team?.logo)}
                      alt={team?.name}
                      onClick={() => handleTeamClick(team)}
                    />
                  </div>
                ))}
              </Slider>
            )}
          </Container>
        </div>
      )}
    </>
  );
}
export default withOnDemandAndErrorBoundary(TeamsCarousel, { height: "3rem" });
