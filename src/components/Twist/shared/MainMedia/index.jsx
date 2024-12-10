import styles from "./index.module.css";
import PropTypes from "prop-types";
import MediaCard from "../../Media/MediaCard";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";

function MainMedia({ data, isPlayBtn }) {
  return (
    <section className={`${styles["main-media"]} ${data?.length < 4 ? styles["mediaTemplateAuto"] : ""}`}>
      {data.map((item) => (
        <div key={item.id} className={`${styles["main-media__item"]}`}>
          <MediaCard
            mediaObj={item}
            isPlayBtn={isPlayBtn}
            title={item.title}
            description={item.description}
            date={item.created_at}
            imgSrc={isPlayBtn ? item.video_cover : item.media}
            tag={item.tags?.[0]?.title}
          />
        </div>
      ))}
    </section>
  );
}

MainMedia.propTypes = {
  data: PropTypes.array,
  isPlayBtn: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(MainMedia);
