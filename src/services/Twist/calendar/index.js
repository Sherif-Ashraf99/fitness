import AxiosInstance from "../../axios-instance";

export const calendar = {
  getCalender: (params) =>
    AxiosInstance.baseAxios
      .get(`/calendar`, { params })
      .then((res) => res?.data?.data),

  getTeamCalender: (params) =>
    AxiosInstance.baseAxios
      .get(`/teamCalendar`, { params })
      .then((res) => res?.data?.data),

  getHomeCalender: () =>
    AxiosInstance.baseAxios.get(`/homeCalendar`).then((res) => res?.data?.data),

  getOtherSportsCalender: (params) =>
    AxiosInstance.baseAxios
      .get(`/otherCalendar`, { params })
      .then((res) => res?.data?.data),

  getTournamentCalender: (params) =>
    AxiosInstance.baseAxios
      .get(`/tournamentCalendar`, { params })
      .then((res) => res?.data?.data),
};
