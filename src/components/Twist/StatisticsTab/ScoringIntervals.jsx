import Skeleton from "react-loading-skeleton";
import styles from "./ScoringIntervals.module.css";
import PropTypes from "prop-types";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";

function ScoringIntervals({
  isLoadingTeamData,
  title,
  team_id,
  data,
  isLoading,
}) {
  if (isLoading || isLoadingTeamData) {
    return (
      <div
        className={`${styles["loader"]} ${
          team_id == "6631" && styles["al-ahly-page"]
        }`}>
        <Skeleton />
        <SkeletonsElements type='section' />
      </div>
    );
  }

  const startScoreKeys = {
    15: 0,
    30: 15,
    45: 30,
    60: 45,
    75: 60,
    90: 75,
  };

  const getTotalGoals = () => {
    const calclate = Object.values(data).reduce((x, y) => x + y);
    return calclate;
  };

  return (
    <div className={`${styles["ScoringIntervals"]}`}>
      <h5>{title}</h5>
      <div className={styles["all-scores"]}>
        {Object.keys(data).map((e, i) => (
          <div key={i} className={styles["score"]}>
            <div className={styles["score-content"]}>
              <span>{`${startScoreKeys[e]} - ${e}'`}</span>
              <span>{Object.values(data)[i]}</span>
            </div>
            <div className={styles["score-progress"]}>
              <div
                className={styles["rating"]}
                style={{
                  width:
                    getTotalGoals() !== 0
                      ? `calc(${
                          Object.values(data)[i]
                        } / ${getTotalGoals()} * 100%)`
                      : "0",
                }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ScoringIntervals.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  isLoadingTeamData: PropTypes.bool,
};
export default ScoringIntervals;
