import AxiosInstance from "src/services/axios-instance";

export const guessThePlayerGame = {
  getTeamsLogos: () =>
    AxiosInstance.baseAxios.get(`guess-players`).then((res) => res?.data?.data),

  postAnswer: (data) =>
    AxiosInstance.baseAxios
      .post(`/guess-player-answers`, data)
      .then((res) => res?.data),
};
