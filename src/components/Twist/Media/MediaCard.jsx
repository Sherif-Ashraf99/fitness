import styles from "./MediaCard.module.css";
import PropTypes from "prop-types";
import { MdOutlineCalendarToday } from "react-icons/md";
import playBtnIcon from "src/assets/images/Twist/PlayBTN.png";
import {
  ImgURL,
  convertFullDate,
  getServiceAndSportRoute,
} from "src/utils/globalFn";
import { useNavigate, useLocation } from "react-router";
import Card from "react-bootstrap/Card";
import { FiClock } from "react-icons/fi";
import { BsEyeFill } from "react-icons/bs";

function MediaCard({
  mediaObj,
  isPlayBtn = false,
  title,
  description,
  date,
  imgSrc,
  tag,
  horizontal = true,
  showTag = true,
  lead,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isNewsOrVideosPage =
    pathname.includes("/news") || pathname.includes("/videos");

  const handleOnCardClick = (e) => {
    e.stopPropagation();
    navigate(
      `${getServiceAndSportRoute(
        mediaObj.services[0],
        mediaObj.sport_id
      )}media/${mediaObj.id}`
    );
  };

  const limitTextLength = (text = "", characterNum) => {
    if (text === "") return "";
    const removedEmptyTag = text?.replace(/{\"ar\":\"/g, "");
    // text?.replace(/{\"ar\":\"/g, "").replace(/<\/p>/g, "").replace(/<p><br>/g,"")
    const trimiedText = removedEmptyTag?.substring(0, characterNum) + "...";
    return trimiedText;
  };

  return (
    <>
      {horizontal && (
        <div
          onClick={handleOnCardClick}
          style={{ backgroundImage: `url(${ImgURL(imgSrc)})` }}
          className={`media-card-global ${styles["media-card"]}`}
        >
          <div className={`${styles["card-data"]}`}>
            <h6>{title}</h6>
            {!isPlayBtn && (
              //  <div
              //     dangerouslySetInnerHTML={{
              //       __html: limitTextLength(description,100),
              //     }}
              //   />
              <p>{limitTextLength(lead || mediaObj.lead, 75)}</p>
            )}
            <p className={`${styles["card-date"]} card-date`}>
              <MdOutlineCalendarToday strokeWidth={1} />
              {convertFullDate(date)}
            </p>
            {showTag && tag && (
              <span className={`${styles["card-tag"]} card-tag`}>{tag}</span>
            )}
            {isPlayBtn && (
              <img
                loading="lazy"
                className={styles["card-play-btn"]}
                src={playBtnIcon}
                width={40}
                alt="play"
              />
            )}
          </div>
        </div>
      )}

      {!horizontal && (
        <div
          className={`media-card-global ${styles["media-card-vertical"]}`}
          onClick={handleOnCardClick}
        >
          <Card className={styles["media"]} style={{ height: "200px" }}>
            <Card.Img
              variant="top"
              src={ImgURL(imgSrc)}
              style={{ height: "200px" }}
            />
            <Card.Body>
              {showTag && tag && (
                <span className={styles["card-tag"]}>{tag}</span>
              )}
              <Card.Title>
                {isNewsOrVideosPage ? title : limitTextLength(title, 30)}
              </Card.Title>
              <Card.Text>
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: limitTextLength(lead,100),
                  }}
                /> */}
                {limitTextLength(lead || mediaObj.lead, 75)}
              </Card.Text>
              <div className={styles["card-views"]}>
                <div>
                  <FiClock size={15} />
                  <span className="cps-1">{convertFullDate(date)}</span>
                </div>
                {/* <div>
                                <span className="cpe-1">{mediaObj.views}</span>
                                <BsEyeFill size={15} />
                            </div> */}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

MediaCard.propTypes = {
  isPlayBtn: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  imgSrc: PropTypes.string,
  tag: PropTypes.string,
  horizontal: PropTypes.bool,
};

export default MediaCard;
