import AxiosInstance from "src/services/axios-instance";

export const eurogames = {
  sendUserPrediction: (data) =>
    AxiosInstance.baseAxios.post(`/pollGame`, data).then((res) => res?.data),

  getAllPredictionMatches: (params) =>
    AxiosInstance.baseAxios
      .get(`/predictedMatches`, { params })
      .then((res) => res?.data),

  getGuessWho: (params) =>
    AxiosInstance.baseAxios
      .get(`/guessWhoQuestions`, { params })
      .then((res) => res?.data),

  sendPlayGuessWho: (data) =>
    AxiosInstance.baseAxios
      .post(`/playGuessWho`, data)
      .then((res) => res?.data),

  getGuessShirtQuestions: (params) =>
    AxiosInstance.baseAxios
      .get(`/guessShirtQuestions`, { params })
      .then((res) => res?.data),

  sendPlayGuessShirt: (data) =>
    AxiosInstance.baseAxios
      .post(`/playGuessShirt`, data)
      .then((res) => res?.data),
};
