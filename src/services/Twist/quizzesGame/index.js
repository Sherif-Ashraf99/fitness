import AxiosInstance from "../../axios-instance";

export const quizzesGame = {
  getQuizzesQuestions: (params) =>
    AxiosInstance.baseAxios
      .get(`/quiz`, { params })
      .then((res) => res?.data?.data),

  sendQuizzesAnswers: (data) =>
    AxiosInstance.baseAxios.post(`/quizAnswers`, data).then((res) => res?.data),

  getUserPlayedGames: (params) =>
    AxiosInstance.baseAxios
      .get(`/checkPlayedGames`, { params })
      .then((res) => res?.data?.data),
};
