import apis from "src/services/Twist";
import styles from "./index.module.css";
import { useQuery } from "@tanstack/react-query";
import { getRouteInfo, getServiceAndSportRoute } from "src/utils/globalFn";
import { useLocation, useNavigate, useParams } from "react-router";
import PropTypes from "prop-types";
import TopPlayerCard from "./TopPlayerCard";
import StatisticsTeam from "./StatisticsTeam";
import ScoringIntervals from "./ScoringIntervals";
import CustomDropdown from "../shared/CustomDropdown";
import { useEffect, useState } from "react";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";

const apiTeamStatisticsFn = (params) => apis.teams.getTeamStatistics(params);
const apiGetSeasonsTournament = (params) => apis.seasons.getSeasons(params);

function StatisticsTab({ isLoadingTeamData, teamData }) {
  const { pathname } = useLocation();
  const { sportId } = getRouteInfo(pathname);
  const { serviceName } = useParams();
  const navigate = useNavigate();

  let { isSubscripedInTheServie, setRedirectToSubscriptionUI } =
    useCheckSubscriptionByService(serviceName);
  isSubscripedInTheServie = true;

  const { sport_id, id: team_id, tournaments = [] } = teamData;
  const { id } = tournaments[0] ?? {};

  const [filters, setFilters] = useState({
    tournament: { id: id, name: "البطولة" },
  });

  const { data: seasonIdForTournament } = useQuery({
    queryKey: ["Season-Tournament", filters.tournament.id],
    queryFn: () =>
      apiGetSeasonsTournament({ tournament_id: filters.tournament.id }),
    select: (data) => data.lastSeason.id,
  });

  const { data: teamStatisticsData = {}, isLoading } = useQuery({
    queryKey: ["Team-Statistics", team_id, filters.tournament?.id],
    queryFn: () =>
      apiTeamStatisticsFn({
        sport_id: sport_id,
        season_id: seasonIdForTournament,
        tournament_id: filters.tournament.id,
        team_id: team_id,
      }),
    enabled: !!seasonIdForTournament && !!filters.tournament.id,
  });

  const handleClick = (services, playerId) => {
    navigate(
      `${getServiceAndSportRoute(services, sportId)}player/${playerId}`,
      { state: { previousPathname: pathname } }
    );
  };

  useEffect(() => {
    if (!Object.keys(teamData).length) return;
    setFilters((prev) => ({
      ...prev,
      tournament: {
        name: teamData.tournaments[0].title,
        id: teamData.tournaments[0].id,
      },
    }));
  }, [teamData]);

  if (!isSubscripedInTheServie)
    return (
      <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
    );

  return (
    <section className={styles["Statistics-Tab"]}>
      <CustomDropdown
        data={tournaments}
        dataID="id"
        dataName="title"
        name="tournament"
        filters={filters}
        setFilters={setFilters}
        width="200px"
      />

      <div className={styles["AllStatistics"]}>
        <TopPlayerCard
          title={"الأهداف"}
          sport_id={sport_id}
          season_id={seasonIdForTournament}
          tournament_id={filters.tournament.id}
          team_id={team_id}
          handleClick={handleClick}
          isLoadingTeamData={isLoadingTeamData}
        />

        <TopPlayerCard
          title={"صناع  الأهداف"}
          sport_id={sport_id}
          season_id={seasonIdForTournament}
          tournament_id={filters.tournament.id}
          team_id={team_id}
          handleClick={handleClick}
          isLoadingTeamData={isLoadingTeamData}
        />

        <StatisticsTeam
          title={"احصائيات"}
          data={teamStatisticsData}
          isLoading={isLoading}
          isLoadingTeamData={isLoadingTeamData}
        />

        <ScoringIntervals
          title={"دقائق التهديف"}
          data={teamStatisticsData.scoringIntervals}
          isLoading={isLoading}
          isLoadingTeamData={isLoadingTeamData}
        />
      </div>
    </section>
  );
}

StatisticsTab.propTypes = {
  teamData: PropTypes.object,
  isLoadingTeamData: PropTypes.bool,
};
export default StatisticsTab;
