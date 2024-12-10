import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import MediaCard from "../Media/MediaCard";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
function MainMediaCarousel({ data, isPlayBtn }) {
  const [dataArr, setDataArr] = useState([]);
  const [isGames,setIsGames] = useState(false)

  
useEffect(() => {
    if (data?.[0]?.data?.length > 0) setDataArr(data?.[0]?.data.slice(0,3));

    let intervalId;

    if (dataArr?.length > 0) {
      intervalId = setInterval(() => {
        setDataArr((prevArr) => {
          const lastItem = prevArr.pop();
          prevArr.unshift(lastItem);
          return [...prevArr];
        });
        setIsGames((prev) => !prev)
      }, 6000);
    }

    return () => clearInterval(intervalId);
  }, [dataArr?.length, data]);

  return (
    <section className={styles["main-media"]}>
      {dataArr?.map((item, i) => (
        <div key={i} className={`${styles["main-media__item"]}`}>
          <MediaCard
            mediaObj={item}
            isPlayBtn={isPlayBtn}
            title={item.title}
            description={item.description}
            date={item.created_at}
            imgSrc={item.media}
            tag={item.tags?.[0]?.title}
          />
        </div>
      ))}
      
      {isGames && <div className={`${styles["service"]} ${styles["games"]}`}>
        <Link to={"/twist-games"}>
        <HiOutlineArrowNarrowRight  size={25}/>
        <span>{"الألعاب"}</span>
        </Link>
      </div> }

      {!isGames &&  
       <div className={`${styles["service"]} ${styles["fitness"]}`}>
       <Link to={"/fitness"}>
       <HiOutlineArrowNarrowRight  size={25}/>
       <span>{"تويست فيتنس"}</span>
       </Link>
     </div>
      }
    </section>
  );
}

MainMediaCarousel.propTypes = {
  data: PropTypes.array,
  isPlayBtn: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(MainMediaCarousel);
