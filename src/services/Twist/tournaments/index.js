import AxiosInstance from "../../axios-instance";

export const tournaments = {
  getTournaments: (params) =>
    AxiosInstance.baseAxios
      .get("/tournaments", { params })
      .then((res) => res?.data?.data?.data),

  getAllActiveTournaments: (params) =>
    AxiosInstance.baseAxios
      .get("/activeTournaments", { params })
      .then((res) => res.data.data),

  getTournamentDetails: (id, params) =>
    AxiosInstance.baseAxios
      .get(`/tournaments/${id}`, { params })
      .then((res) => res?.data?.data),

  getTournamentStanding: (params) =>
    AxiosInstance.baseAxios
      .get(`/standing`, { params })
      .then((res) => res?.data?.data),

  getHomeTournamentStanding: (params) =>
    AxiosInstance.baseAxios
      .get(`/newStanding`, { params })
      .then((res) => res?.data?.data),

  getTournamentTeamsRanking: (params) =>
    AxiosInstance.baseAxios
      .get(`/teamsStanding`, { params })
      .then((res) => res?.data?.data),

  getTournamentHistory: (tournament_id) =>
    AxiosInstance.baseAxios
      .get(`/tournament-history/${tournament_id}`)
      .then((res) => res?.data?.data),

  getTournamentTree: (params) =>
    AxiosInstance.baseAxios
      .get("/tournament/tree", { params })
      .then((res) => res?.data?.data),

  getTournamentSearchResult: (TournamentName, signal) =>
    AxiosInstance.baseAxios
      .get(`/searchTournaments?keyword=${TournamentName}`, { signal })
      .then((res) => res?.data?.data),
};

// tournaments.getAllActiveTournaments({service_id:10})
//   .then(res => console.log(res))
