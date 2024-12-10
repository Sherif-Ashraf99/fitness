import axiosInstance from "src/services/axios-instance";

export const mido = {
  getMidoDiaries: (params) =>
    axiosInstance.baseMeloukAxios
      .get(`/mido-diaries`, { params })
      .then((res) => res?.data?.data),

  getMidoRiddles: (params) =>
    axiosInstance.baseMeloukAxios
      .get(`/mido-riddles`, { params })
      .then((res) => res?.data?.data),

  sendMidoRiddlesAnswer: (data) =>
    axiosInstance.baseMeloukAxios
      .post(`/answer`, data)
      .then((res) => res?.data),

  sendMidoQuestion: (data) =>
    axiosInstance.baseMeloukAxios
      .post(`/ask-mido`, data)
      .then((res) => res?.data),

  getMidoTactics: (params, signal) =>
    axiosInstance.baseMeloukAxios
      .get(`/analytics-studios`, { params, signal })
      .then((res) => res?.data?.data),
};
