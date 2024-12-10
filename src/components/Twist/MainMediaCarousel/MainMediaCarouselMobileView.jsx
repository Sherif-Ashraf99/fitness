import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MainMediaCarouselMobileView.module.css";
import MediaCard from "../Media/MediaCard";
import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

function MainMediaCarouselMobileView({ data, isPlayBtn }) {
  const sliderRef = useRef(null);
  const [isGames,setIsGames] = useState(false)

  const settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 700,
    slidesToShow: 1.50,
    slidesToScroll: 1,
    initialSlide: data.length - 1 < 0 ? 0 : data.length - 1,
    dots: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: () => sliderRef.current.slickPrev(),
    afterChange: () => sliderRef.current.slickPrev(),
    swipeEvent: (dir) => {
      sliderRef.current.swipeDir = dir;
      const { currentSildeForSwipe } = sliderRef.current;
      if (dir === "right") {
        if (currentSildeForSwipe === 0) return;
        sliderRef.current.slickGoTo(currentSildeForSwipe - 1);
      }
      if (dir === "left") {
        if (currentSildeForSwipe === data.length - 1) return;
        sliderRef.current.slickGoTo(currentSildeForSwipe + 1);
      }
    },
  };
  function SampleNextArrow(props) {
    const { currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
  }

  function SamplePrevArrow(props) {
    const { currentSlide } = props;
    if (sliderRef.current)
      sliderRef.current.currentSildeForSwipe = currentSlide;
  }


  useEffect(() => {
     const interval = setInterval(() => {
        setIsGames((prev) => !prev)
      }, 12000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section className={styles["main-media-Mobile"]}>
      <Slider ref={sliderRef} {...settings}>
        {data?.slice(0,3).map((item) => (
          <Fragment key={item.id}>
            <MediaCard
              mediaObj={item}
              isPlayBtn={isPlayBtn}
              title={item.title}
              description={item.description}
              date={item.created_at}
              imgSrc={item.media}
              tag={item.tags?.[0]?.title}
            />
          </Fragment>
        ))}
       {isGames && <div className={`${styles["serviceMobile"]} ${styles["games"]}`}>
        <Link to={"/twist-games"}>
        <HiOutlineArrowNarrowRight  size={25}/>
        <span>{"الألعاب"}</span>
        </Link>
      </div> }

      {!isGames &&  
       <div className={`${styles["serviceMobile"]} ${styles["fitness"]}`}>
       <Link to={"/fitness"}>
       <HiOutlineArrowNarrowRight  size={25}/>
       <span>{"تويست فيتنس"}</span>
       </Link>
     </div>
      }
      </Slider>
    </section>
  );
}

MainMediaCarouselMobileView.propTypes = {
  data: PropTypes.array,
  isPlayBtn: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(MainMediaCarouselMobileView);
