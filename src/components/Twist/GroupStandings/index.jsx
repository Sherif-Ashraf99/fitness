import styles from "./index.module.css";
import { Table } from "react-bootstrap";
import { getServiceAndSportRoute, ImgURL } from "src/utils/globalFn";
import PropTypes from "prop-types";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const tableKey = {
  played: "لعب",
  difference: "فارق",
  point: "نقاط",
};

const apiFn = (params) => apis.tournaments.getTournamentStanding(params);

export default function GroupStandings({tournament_id,season_id }) {
  const navigate = useNavigate()

  const {data , isLoading, isError} = useQuery({
    queryKey : ["getStanding",tournament_id,season_id],
    queryFn : () => apiFn({
      tournament_id,
      season_id,
    }),
    select : (data) => data[0]["Group Stage"],
    enabled : !!tournament_id && !!season_id
  })


  if(isLoading) return <div>جاري التحميل ...</div>;
  if(isError) return <div>حدث خطأ</div>;


  const handleNavigateToTeamPage = (serviceId, sportId, id) => {
		navigate(`${getServiceAndSportRoute(serviceId, sportId)}team/${id}/overview`);
	};


  return (
      <div className={styles["ranking-wrapper"]}>
        {Object.keys(data).sort().map((group, i) => (
            <div className={styles["ranking-card"]} key={group}>
              <div className={styles["group-name"]}>
                <span>{`المجموعة`}</span>
                <span>{i + 1}</span>
              </div>
              <Table borderless>
                <thead>
                  <tr>
                    <th>
                      <span>الترتيب</span>
                    </th>
                    {Object.keys(tableKey).map((key) => (
                      <th key={key}>
                        <span>{tableKey[key]}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data[group].map(
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
                      onClick={() =>
                        handleNavigateToTeamPage(services[0], sport_id, team_id)
                      }
                      key={team_id}>
                        <td>
                          <div className={styles["team-info"]}>
                            <span>{i + 1}</span>
                            <img
                              src={ImgURL(team_logo)}
                              alt={team_name}
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
          ))}
      </div>
  );
}

GroupStandings.propTypes = {
  tournament_id: PropTypes.number,
  season_id: PropTypes.number,
};
