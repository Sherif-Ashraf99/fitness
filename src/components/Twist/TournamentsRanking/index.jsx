import "swiper/css/scrollbar";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import TournamentsRankingTable from "./TournamentsRankingTable";

function TournamentsRanking({
  isLoading,
  isError,
  data,
  handelTabClick,
  isLeague,
  gridColumn,
  isUefaChampionsLeague,
}) {
  return (
    <div className={`${styles["tournaments-ranking"]}`} style={{ gridColumn }}>
      <TournamentsRankingTable
        data={data}
        isLoading={isLoading}
        handelTabClick={handelTabClick}
        isLeague={isLeague}
        isUefaChampionsLeague={isUefaChampionsLeague}
      />
    </div>
  );
}

TournamentsRanking.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  data: PropTypes.array,
  handelTabClick: PropTypes.func,
  isLeague: PropTypes.bool,
  gridColumn: PropTypes.string,
};

export default TournamentsRanking;
