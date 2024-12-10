import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MatchesCarousel.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import MatchCard from "src/components/Twist/MatchesCalendar/MatchCard.jsx";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import PredictEuroTeams from "src/components/Twist/PredictEuroTeams";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";

const getPredictedMatchesFn = (params) => {
  return apis.eurogames.getAllPredictionMatches(params);
};

function MatchesCarousel({ isLoading, data = [] }) {
  const sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderRange, setSliderRange] = useState(false);
  const { width } = useWindowSize();

  const [showPredictModal, setShowPredictModal] = useState(false);
  const [teams, SetTeams] = useState({});

  const phoneNum = getUserPhoneNumnberFromCookies("international");

  const handleClickPrediction = (teamsObj) => {
    setShowPredictModal(true);
    SetTeams(teamsObj);
  };

  const predictedMatchesParams = {
    tournament_id: 846,
    msisdn: phoneNum ?? "",
  };

  const { data: predicredMatchesData, isLoading: isLoadingPredictedMatches } =
    useQuery({
      queryKey: ["get-predicted-matches", predictedMatchesParams],
      queryFn: () => getPredictedMatchesFn(predictedMatchesParams),
      enabled: false,
    });

  const getSkeletonSlides = () => {
    if (width < 767) return 1;
    if (width < 1200) return 2;
    return 3;
  };
  const getSlidesToShow = () => getSkeletonSlides();

  const getMaxSlidesValue = () => {
    const dataLength = data.length;
    const slidesToShow = getSlidesToShow();
    if (dataLength % slidesToShow !== 0)
      return Math.ceil(dataLength / slidesToShow);
    return dataLength / slidesToShow;
  };

  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 1200,
    adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    swipeEvent: (dir) => {
      sliderRef.current.swipeDir = dir;
      const { currentSildeForSwipe } = sliderRef.current;
      if (dir === "right") {
        sliderRef.current.slickGoTo(currentSildeForSwipe - getSlidesToShow());
        setSliderRange(() => false);
      }
      if (dir === "left") {
        sliderRef.current.slickGoTo(currentSildeForSwipe + getSlidesToShow());
        setSliderRange(() => false);
      }
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide:
      data.length - getSlidesToShow() < 0 ? 0 : data.length - getSlidesToShow(),
    afterChange: (currentSlide) => {
      if (sliderRange) return;
      const { swipeDir, currentSildeForSwipe } = sliderRef.current;
      let calc = Math.ceil(
        (swipeDir ? currentSildeForSwipe : currentSlide) / getSlidesToShow()
      );
      if (calc === 0) calc = 1;
      else calc += 1;
      setSlideIndex(calc);
    },
    customPaging: () => (
      <div className={`${styles["matches-carousel-dots"]}`}>
        <span></span>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function SampleNextArrow(props) {
    const { className, style, currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={() => (
          setSliderRange(() => false),
          (sliderRef.current.swipeDir = null),
          sliderRef.current.slickGoTo(currentSlide + getSlidesToShow())
        )}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={() => (
          setSliderRange(() => false),
          (sliderRef.current.swipeDir = null),
          sliderRef.current.slickGoTo(currentSlide - getSlidesToShow())
        )}
      />
    );
  }

  const showScrollIndicator = () => {
    const isSmallScreen = width <= 767;
    const isMediumScreen = width <= 1200;
    const isLargeScreen = width > 1200;

    return (
      (data.length > 1 && isSmallScreen) ||
      (data.length > 2 && isMediumScreen) ||
      (data.length > 3 && isLargeScreen)
    );
  };

  useEffect(() => {
    if (isLoading || !data.length) return;
    setSlideIndex(getMaxSlidesValue());
  }, [isLoading, data.length]);

  useEffect(() => {
    setSliderRange(false);
  }, [sliderRange]);

  return (
    <div className={`${styles["matchs-carousel"]} matchesCarouselGlobal`}>
      {isLoading && (
        <div className={styles["match-card-loader"]}>
          {[...Array(getSkeletonSlides()).keys()].map((key) => (
            <SkeletonsElements key={key} type="twistMatchCard" />
          ))}
        </div>
      )}

      {!isLoading && (
        <>
          <Slider ref={sliderRef} {...settings}>
            {data?.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                handleClickPrediction={handleClickPrediction}
                predicredMatchesData={predicredMatchesData?.data}
              />
            ))}
          </Slider>
        </>
      )}
      {!isLoading && !data.length && (
        <div className={styles["no-matches"]}>
          <span>لا يوجد مباريات</span>
        </div>
      )}
      {!isLoading && showScrollIndicator() && (
        <input
          onChange={(e) => {
            const clickedVal = +e.target.value - 1;
            const targetSlider = clickedVal * getSlidesToShow();
            (sliderRef.current.swipeDir = null),
              sliderRef.current.slickGoTo(targetSlider);
            setSlideIndex(e.target.value);
            setSliderRange(true);
          }}
          value={slideIndex}
          type="range"
          min={1}
          max={getMaxSlidesValue()}
        />
      )}
      {showPredictModal && (
        <PredictEuroTeams
          show={showPredictModal}
          onHide={() => setShowPredictModal(false)}
          teams={teams}
          matchId={teams.matchId}
          team1={teams.team1}
          team2={teams.team2}
        />
      )}
    </div>
  );
}

export default MatchesCarousel;
