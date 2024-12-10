import AxiosInstance from "../../axios-instance";

export const match = {
  getMatches: (params) =>
    AxiosInstance.baseAxios
      .get(`/matches`, { params })
      .then((res) => res?.data?.data?.data),

  getMatchLineUp: (match_id) =>
    AxiosInstance.baseAxios
      .get(`/lineup/${match_id}`)
      .then((res) => res?.data?.data),

  getMatchStatistics: (params) =>
    AxiosInstance.baseAxios
      .get(`/matchStatistics`, { params })
      .then((res) => res?.data?.data),

  getTournamentMatches: (params) =>
    AxiosInstance.baseAxios
      .get(`/tournament_matches`, { params })
      .then((res) => res?.data?.data),

  getMatchEvents: (params) =>
    AxiosInstance.baseAxios
      .get(`/match_events`, { params })
      .then((res) => res?.data?.data),

  getMatchNewEvents: (params) =>
    AxiosInstance.baseAxios
      .get(`/goalMatchEvents`, { params })
      .then((res) => res?.data?.data),

  getBusyDays: (params) =>
    AxiosInstance.baseAxios
      .get(`/matches_dates`, { params })
      .then((res) => res?.data?.data),

  getLatestMatches: (params) =>
    AxiosInstance.baseAxios
      .get(`/latest-matches-for-teams`, { params })
      .then((res) => res?.data?.data),

  getNewLatestMatches: (params) =>
    AxiosInstance.baseAxios
      .get(`/newLatest-matches-for-teams`, { params })
      .then((res) => res?.data?.data),

  getRankingTeamDetails: (params) =>
    AxiosInstance.baseAxios
      .get(`/TeamStatistics`, { params })
      .then((res) => res?.data?.data),

  getWinsTeam: (params) =>
    AxiosInstance.baseAxios
      .get(`/whoWinWho`, { params })
      .then((res) => res?.data?.data),

  getInfoEvents: (params) =>
    AxiosInstance.baseAxios
      .get(`/MatchEventsimages`, { params })
      .then((res) => res?.data?.data),

  getMatchNewLineUp: (match_id) =>
    AxiosInstance.baseAxios
      .get(`/newLineup/${match_id}`)
      .then((res) => res?.data?.data),
};

// const date = new Date()
// const dummyParams = {
//     month: date.getMonth() + 1,
//     year: date.getFullYear(),
// sport_id: 2,
// tournament_id: 845,
// team_id: 6633
// service_id: 7
// }

// { sport_id, team_id, date_type } ==>
// match.getMatches(dummyParams)
//     .then(res => console.log("TEST", res))

// { sport_id, service_id, month: calendarValue.getMonth() + 1, year: calendarValue.getFullYear() }
// match.getTournamentMatches(dummyParams)
//     .then(res => console.log(res))

// { year: year, month: month, service_id,}
// match.getBusyDays(dummyParams)
//     .then(res => console.log(res))
