import styles from "./StatisticsTeam.module.css";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";

function StatisticsTeam({ isLoadingTeamData, title, data, isLoading }) {

  if (isLoading || isLoadingTeamData) {
    return (
      <div
        className={`${styles["loader"]}`}>
        <Skeleton />
        <SkeletonsElements type='twistTable' />
      </div>
    );
  }

  const statisticsKeys = {
    played: "لعب",
    win: "فوز",
    lose: "خسارة",
    draw: "تعادل",
    goals_in: "أهداف له",
    goals_out: "عليه",
    goals_penalty: "أهداف الجزاء",
    clean_sheet: "شباك نظيفة",
    yellow_cards: "كروت صفراء",
    red_cards: "كروت حمراء",
    difference: "فارق الأهداف",
    point: "نقاط",
    passes: "تمريرات ناجحه",
    lost_balls: "كرات ضائعه",
    attempts: "محاولات على المرمى",
    chances: "فرص",
    dribbles: "المراوغات",
    fouls_in: "اخطاء عليه",
    fouls_out: "اخطاء له",
    ball_win: "استعاد الكرة",
    ball_lose: "خسر الكرة",
  };

  const FilterTeamStatisticsData = () => {
    const filter = Object.keys(data)?.filter(
      (key) => key !== "scoringIntervals",
    );
    return filter;
  };

  return (
    <div
      className={`${styles["StatisticsTeam"]}`}>
      <h5>{title}</h5>
      <div className={styles["table-Statistics"]}>
        <Table borderless>
          <tbody>
            {FilterTeamStatisticsData().map((item, i) => (
              <tr key={i}>
                <td>
                  <div className={styles["Statistics-content"]}>
                    <span>{statisticsKeys[item]}</span>
                    <span>{Object.values(data)[i]}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}


StatisticsTeam.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  isLoadingTeamData: PropTypes.bool,
};
export default StatisticsTeam;
