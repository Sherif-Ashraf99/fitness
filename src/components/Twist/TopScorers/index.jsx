import styles from "./index.module.css";
import SectionTitle from "src/components/Twist/shared/SectionTitle/index";
import Player from "./Player";
import apis from "src/services/Twist";
import { useQuery } from "@tanstack/react-query";
import { withErrorBoundary } from "react-error-boundary";
import propTypes from "react-bootstrap/esm/Image";
import { useContext } from "react";
import { sharedComponentsContext } from "src/context/shared-context";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";

const apiFn = (params) => apis.player.getPlayersTopScorers(params);

function TopScorers({ team_id }) {
  const {
    seasonInfo: { appActiveSeason },
  } = useContext(sharedComponentsContext);

  const { data = [], isLoading } = useQuery({
    queryKey: ["TopScorers"],
    queryFn: () =>
      apiFn({
        sport_id: 1,
        season_id: appActiveSeason?.id,
        tournament_id: 472,
        team_id: team_id,
      }),
    enabled: !!appActiveSeason?.id,
  });

  return (
    <>
      <div className={styles["TopScorers"]}>
        <SectionTitle title='هداف الفريق' />
        {isLoading && <SkeletonsElements type='section' />}
        {!isLoading && <Player data={data?.[0]} />}
      </div>
    </>
  );
}

TopScorers.propTypes = {
  team_id: propTypes.number,
};

export default withErrorBoundary(TopScorers);
