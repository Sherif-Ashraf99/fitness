import PropTypes from "prop-types";
import styles from "./index.module.css";
import TournamentsStatisticsTable from "./TournamentsStatisticsTable.jsx";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";

function TournamentsStatistics({
  isLoading,
  isError,
  data,
  index,
  handelTabClick,
  isLeague,
  isUefaChampionsLeague,
}) {
  return (
    <div className={`${styles["tournaments-statistics"]}`}>
      <TournamentsStatisticsTable
        index={index}
        data={data}
        isLoading={isLoading}
        handelTabClick={handelTabClick}
        isLeague={isLeague}
        isUefaChampionsLeague={isUefaChampionsLeague}
      />
    </div>
  );
}

TournamentsStatistics.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  data: PropTypes.array,
  showTeamsCarousel: PropTypes.array,
  index: PropTypes.number,
};
export default TournamentsStatistics;
