import AxiosInstance from "../../axios-instance";

export const comparisons = {
  getPopularComparisons: () =>
    AxiosInstance.baseAxios
      .get(`/popularComparisons`)
      .then((res) => res?.data?.data),

  getComparisonsPlayersStatistics: (params) => {
    const {
      season,
      team1,
      team2,
      tournament1,
      tournament2,
      comparisonClickedItem: { itemIds, tournamentIds, teamIds },
    } = params;
    return AxiosInstance.baseAxios
      .get(`/playersStatistics`, {
        params: {
          season_id: season.id,
          player1_id: itemIds[0],
          player2_id: itemIds[1],
          team1_id: team1.id ?? teamIds[0],
          team2_id: team2.id ?? teamIds[1],
          tournament1_id: tournament1.id ?? tournamentIds[0],
          tournament2_id: tournament2.id ?? tournamentIds[1],
        },
      })
      .then((res) => res?.data?.data);
  },

  getRankingComparisonsTeamsStatistics: (params) => {
    const { season_id, rankingComparisonTeams } = params;
    const teamsIds = rankingComparisonTeams.reduce(
      (prev, curr, index) => ({ ...prev, [`team_id[${index}]`]: curr }),
      {},
    );
    return AxiosInstance.baseAxios
      .get(`/TeamsStatistics`, { params: { ...teamsIds, season_id } })
      .then((res) => res?.data?.data);
  },

  getComparisonsTeamsStatistics: (params) => {
    const {
      season,
      tournament1,
      tournament2,
      comparisonClickedItem: { itemIds, tournamentIds },
    } = params;
    return AxiosInstance.baseAxios
      .get(`/comparisonTeamsStatistics`, {
        params: {
          season_id: season.id,
          team1_id: itemIds[0],
          team2_id: itemIds[1],
          tournament1_id: tournament1.id ?? tournamentIds[0],
          tournament2_id: tournament2.id ?? tournamentIds[1],
        },
      })
      .then((res) => res?.data?.data);
  },
};
