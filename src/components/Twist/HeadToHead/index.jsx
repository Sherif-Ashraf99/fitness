import React from "react";
import styles from "./index.module.css";
import MatchStatistics from "./MatchStatistics";
import PreviousMatches from "./PreviousMatches";
import { useQuery } from "@tanstack/react-query";
import apis from "src/services/Twist";

const apiFn = (params) => apis.match.getNewLatestMatches(params);

const HeadToHead = ({ data }) => {
  const { team1, team2, id } = data;
  const {
    data: latestData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Latest-Matches", id],
    queryFn: () =>
      apiFn({ team1_id: team1?.id, team2_id: team2?.id, match_id: id }),
  });
  return (
    <div className="p-3">
      <h5 className={styles["title"]}>احصائيات اّخر خمس مباريات</h5>
      <MatchStatistics
        id={data.id}
        stats={latestData?.stats}
        isLoading={isLoading}
        isError={isError}
      />
      <PreviousMatches
        latestData={latestData?.data}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HeadToHead;
