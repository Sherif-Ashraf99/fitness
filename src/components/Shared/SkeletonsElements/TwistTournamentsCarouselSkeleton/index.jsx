import Skeleton from "react-loading-skeleton";
import styles from "./index.module.css";
import PropTypes from "prop-types";

function TwistTournamentsCarouselSkeleton({
  tournamentsNumber = 11,
  horizontal = false,
  bgTransparent,
}) {
  return (
    <div
      className={`${styles[`twist-tournaments-carousel-skeleton`]} ${
        horizontal ? styles["horizontal"] : ""
      }`}
      style={{ backgroundColor: bgTransparent && "transparent" }}>
      {[...Array(tournamentsNumber).keys()].map((key) => (
        <div key={key}>
          <div>
            <Skeleton circle />
          </div>
          <Skeleton />
        </div>
      ))}
    </div>
  );
}

TwistTournamentsCarouselSkeleton.propTypes = {
  tournamentsNumber: PropTypes.number,
  horizontal: PropTypes.bool,
  bgTransparent: PropTypes.bool,
};

export default TwistTournamentsCarouselSkeleton;
