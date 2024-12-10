import AxiosInstance from "../../axios-instance";

export const sportsEgyption = {
  getOlymbicSports: () =>
    AxiosInstance.baseAxios
      .get(`/olymbicSports`)
      .then((res) => res?.data?.data),

  getOlymbicMatchesBySportId: (params) =>
    AxiosInstance.baseAxios
      .get(`/olymbicMatches`, { params })
      .then((res) => res?.data?.data),

  getPlayersEgyption: (params) =>
    AxiosInstance.baseAxios
      .get(`/olymbicSportsWithPlayers`, { params })
      .then((res) => res?.data?.data),

  getSeasonTournamentIdsBySportId: (params) =>
    AxiosInstance.baseAxios
      .get(`/olymbicTournamentsWithSeasons`, { params })
      .then((res) => res?.data?.data),
};
