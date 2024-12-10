import styles from "./index.module.css";
import Skeleton from "react-loading-skeleton";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import MatchCard from "src/components/Twist/MatchesCalendar/MatchCard.jsx";
import PredictEuroTeams from "src/components/Twist/PredictEuroTeams";
import { useParams } from "react-router-dom";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";
import { useState } from "react";

function MatchesList({ isLoading, matchesArr }) {
  const skeletonArr = [1, 2, 3];

  const getPredictedMatchesFn = (params) => {
    return apis.eurogames.getAllPredictionMatches(params);
  };

  const [showPredictModal, setShowPredictModal] = useState(false);
  const [teams, SetTeams] = useState({});
  const { id: tournamentId } = useParams();

  const phoneNum = getUserPhoneNumnberFromCookies("international");

  const handleClickPrediction = (teamsObj) => {
    setShowPredictModal(true);
    SetTeams(teamsObj);
  };

  const predictedMatchesParams = {
    tournament_id: 846,
    msisdn: phoneNum ?? "",
  };

  const { data: predicredMatchesData, isLoading: isLoadingPredictedMatches } =
    useQuery({
      queryKey: ["get-predicted-matches", predictedMatchesParams],
      queryFn: () => getPredictedMatchesFn(predictedMatchesParams),
      enabled : false
    });

  if (isLoading) {
    return skeletonArr?.map((skel) => {
      return (
        <div className={styles["match-card"]} key={skel}>
          <SkeletonsElements type="twistMatchCard" />
        </div>
      );
    });
  }

  if (matchesArr?.length === 0) {
    return (
      <div className={`${styles["no-matches-card"]}`}>{"لا يوجد مباريات "}</div>
    );
  }

  return (
    <div className={styles["match-card-wraper"]}>
      {matchesArr?.map((match) => {
        return (
          <div className={styles["match-card"]} key={match.id}>
            <MatchCard
              match={match}
              handleClickPrediction={handleClickPrediction}
              predicredMatchesData={predicredMatchesData?.data}
            />
          </div>
        );
      })}
      {showPredictModal && (
        <PredictEuroTeams
          show={showPredictModal}
          onHide={() => setShowPredictModal(false)}
          teams={teams}
          matchId={teams.matchId}
          team1={teams.team1}
          team2={teams.team2}
        />
      )}
    </div>
  );
}

export default withOnDemandAndErrorBoundary(MatchesList);
