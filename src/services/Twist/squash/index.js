import AxiosInstance from "../../axios-instance";

export const squash = {
  getTournaments: (params) =>
    AxiosInstance.baseSquashAxios
      .get("/squashTournaments", { params })
      .then((res) => res?.data?.data),

  getTournamentPlayers: (params) =>
    AxiosInstance.baseSquashAxios
      .get(`/squashTournaments/players`, { params })
      .then((res) => res?.data?.data),

  getTournamentMatches: (params) =>
    AxiosInstance.baseSquashAxios
      .get("/squashMatches", { params })
      .then((res) => res?.data?.data),

  getMatchCalender: () =>
    AxiosInstance.baseSquashAxios
      .get("/squashCalendar")
      .then((res) => res?.data?.data),

  getPlayerDetails: (params) =>
    AxiosInstance.baseSquashAxios
      .get("/squashPlayers", { params })
      .then((res) => res?.data?.data),

  getMatchDetails: (params) =>
    AxiosInstance.baseSquashAxios
      .get(`/squashMatches`, { params })
      .then((res) => res?.data?.data),

      getSquashMatchesDates: (params) =>
      AxiosInstance.baseSquashAxios
        .get(`/squashMatchesDates`, { params })
        .then((res) => res?.data?.data),
};
