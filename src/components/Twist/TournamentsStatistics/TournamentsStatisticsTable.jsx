import { Table } from "react-bootstrap";
import styles from "./TournamentsStatisticsTable.module.css";
import {
  ImgURL,
  getRouteInfo,
  getServiceAndSportRoute,
} from "src/utils/globalFn";
import { PropTypes } from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";

function TournamentsStatisticsTable({
  isLoading,
  data,
  handelTabClick,
  isLeague,
  isUefaChampionsLeague,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { sportId } = getRouteInfo(pathname);
  const randomTeam = data?.[0];

  const handleRowClick = (serviceId, sportId, id) => {
    if (id === 6631) {
      return navigate(`/al-ahly/local/team/6631/overview`);
    }

    navigate(
      `${getServiceAndSportRoute(serviceId, sportId)}team/${id}/overview`,
      {
        state: { previousPathname: pathname },
      }
    );
  };

  const tableKey = {
    attempts: "محاولات على المرمى",
    dribbles: "المراوغات",
    clean_sheet: "شباك نظيفة",
    passes: "تمريرات ناجحة",
  };

  const isArrowClickedFromTournamentPage = () => {
    if (pathname.includes("tournament")) return handelTabClick("statistics");

    return navigate(
      `${getServiceAndSportRoute(
        randomTeam?.services?.[0],
        randomTeam?.sport_id
      )}tournament/${randomTeam?.tournament_id}/statistics`,
      {
        state: { previousPathname: pathname },
      }
    );
  };

  const handleDisplayData = () => {
    if (isLeague) return data.slice(0, 5);
    if (isUefaChampionsLeague) return data.slice(0, 8);
    else return data;
  };

  return (
    <div className={`${styles["statistics-table"]}`}>
      {(isLeague || isUefaChampionsLeague) && (
        <Link onClick={() => isArrowClickedFromTournamentPage()}>
          <span>الإحصائيات</span>
          <FaArrowLeft />
        </Link>
      )}
      {isLoading && <SkeletonsElements type="twistTable" />}
      {!isLoading && (
        <div className={`${styles["table-body"]}`}>
          <Table borderless hover>
            <thead>
              <tr>
                <th>
                  <span> الفريق</span>
                </th>
                {Object.keys(tableKey).map((key) => (
                  <th key={key}>
                    <span>{tableKey[key]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handleDisplayData().map(
                (
                  {
                    team_id,
                    services,
                    sport_id,
                    team_logo,
                    team_name,
                    ...team
                  },
                  i
                ) => (
                  <tr
                    key={team_id}
                    onClick={() =>
                      handleRowClick(services[0], sport_id, team_id)
                    }
                  >
                    <td>
                      <div className={styles["team-info"]}>
                        <span>{i + 1}</span>
                        <img
                          loading="lazy"
                          src={ImgURL(team_logo)}
                          alt=""
                          width={25}
                          height={25}
                        />
                        <span>{team_name}</span>
                      </div>
                    </td>
                    {Object.keys(tableKey).map((key) => (
                      <td key={key}>
                        <span>{team[key]}</span>
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

TournamentsStatisticsTable.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  index: PropTypes.number,
  isLeague: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(TournamentsStatisticsTable, {
  height: "15rem",
  gridColumn: "2/span 1",
});
