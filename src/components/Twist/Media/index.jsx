import PropTypes from "prop-types";
import styles from "./index.module.css";
import MediaCard from "./MediaCard";
import useWindowSize from "src/hooks/useWindowSize";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";

function Media({ isLoading, data, isPlayBtn, columnsNum = 4, horizontal }) {
  const { width } = useWindowSize();

  if (width <= 991.98) columnsNum = 2;
  if (width <= 575.98) columnsNum = 1;

  return (
    <>
      {isLoading && (
        <div className={styles["media-loader"]}>
          {[...Array(6).keys()].map((key) => (
            <SkeletonsElements key={key} type='mediaCard' twoColumns={true} />
          ))}
        </div>
      )}
      <div
        className={`${styles["media"]}`}
        style={{
          gridTemplateColumns: `repeat(${columnsNum}, minmax(calc((100% - ${columnsNum}rem) / ${columnsNum}), 1fr))`,
        }}>
        {!isLoading && data.length !== 0 && data?.map((item) => (
            <div key={item.id} className={styles["media-item"]}>
              <MediaCard
                mediaObj={item}
                isPlayBtn={isPlayBtn}
                title={item.title}
                description={item.description}
                date={item.created_at}
                imgSrc={isPlayBtn ? item.video_cover : item.media}
                tag={item.tags?.[0]?.title}
                horizontal={horizontal}
              />
            </div>
          ))
          }
      {!isLoading && data.length === 0 && <div className={styles["media-notFound"]}>لا يوجد معلومات</div>}
      </div>
    </>
  );
}

Media.propTypes = {
  data: PropTypes.array,
  isPlayBtn: PropTypes.bool,
  columnsNum: PropTypes.number,
  horizontal: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(Media);
