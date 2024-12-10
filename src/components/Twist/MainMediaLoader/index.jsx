import { Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import styles from "./index.module.css";
import imageEmpty from "src/assets/images/Twist/image.png";
import alAhlyImageEmpty from "src/assets/images/Twist/media-al-ahly-image.svg";

function MainMediaLoader({ team_id, isMainCarousel = false, isRow = false }) {
  const placeHolderArr = [1, 2, 3, 4];
  const setMediaImage = () => {
    return team_id === "6631" ? alAhlyImageEmpty : imageEmpty;
  };
  if (isRow) {
    //for media shaped as a row
    return (
      <div className={`${styles["Emptycard"]}`}>
        <Row>
          {placeHolderArr.map((elem, index) => (
            <Col sm={6} md={3} key={index}>
              <div className={styles["empty"]}>
                <div className={styles["img-empty"]}>
                  <img src={setMediaImage()} alt='' />
                </div>
                <div className={styles["all-skelton"]}>
                  <Skeleton
                    className={`${styles["skelton"]} ${styles["skelton-sm"]}`}
                    width={"40%"}></Skeleton>
                  <Skeleton
                    className={`${styles["skelton"]} ${styles["skelton-sm"]}`}></Skeleton>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  } else {
    //for media shaped as a grid
    return (
      <div className={`${styles["Emptycard"]}`}>
        <Row className='g-3'>
          <Col md={6}>
            <div className={`${styles["empty"]} ${styles["empty-main"]}`}>
              <div className={styles["img-empty"]}>
                <img src={setMediaImage()} alt='' />
              </div>
              <div className={styles["all-skelton"]}>
                <Skeleton
                  className={styles["skelton"]}
                  width={"50%"}></Skeleton>
                <Skeleton className={styles["skelton"]}></Skeleton>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <Row className='g-3'>
              <Col md={12} className={isMainCarousel && "order-2"}>
                <div className={styles["empty"]}>
                  <div className={styles["img-empty"]}>
                    <img src={setMediaImage()} alt='' />
                  </div>
                  <div className={styles["all-skelton"]}>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}
                      width={"40%"}></Skeleton>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}></Skeleton>
                  </div>
                </div>
              </Col>
              <Col sm={6} md={6}>
                <div className={styles["empty"]}>
                  <div className={styles["img-empty"]}>
                    <img src={setMediaImage()} alt='' />
                  </div>
                  <div className={styles["all-skelton"]}>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}
                      width={"40%"}></Skeleton>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}></Skeleton>
                  </div>
                </div>
              </Col>
              <Col sm={6} md={6}>
                <div className={styles["empty"]}>
                  <div className={styles["img-empty"]}>
                    <img src={setMediaImage()} alt='' />
                  </div>
                  <div className={styles["all-skelton"]}>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}
                      width={"40%"}></Skeleton>
                    <Skeleton
                      className={`${styles["skelton"]} ${styles["skelton-sm"]}`}></Skeleton>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainMediaLoader;
