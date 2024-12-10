import styles from "./index.module.css";
import AhlyRankingTable from "./AhlyRankingTable";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";
import SectionTitle from "src/components/Twist/shared/SectionTitle";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";

const apiFn = (params) => apis.tournaments.getTournamentStanding(params);

function AhlyRanking() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["AhlyRanking"],
    queryFn: () =>
      apiFn({
        tournament_id: 472,
        competition_type: 2,
        service_id: 7,
        sport_id: 1,
      }),
  });

  return (
    <div className={styles["AhlyRanking"]}>
      <SectionTitle title='الترتيب' />
      {isLoading && (
        <div className={styles["match-card-loader"]}>
          <SkeletonsElements type='twistTable' rowsNumbers={4} />
        </div>
      )}
      {!isLoading && <AhlyRankingTable data={data[0]?.data} />}
    </div>
  );
}

export default AhlyRanking;
