import axiosInstance from "src/services/axios-instance";

export const answers = {
  checkIsAsked: (params) =>
    axiosInstance.baseAxios
      .get(`/checkAskMazhar`, { params })
      .then((res) => res?.data?.data)
      .catch((res) => res.response),

  getAnswers: (params) =>
    axiosInstance.baseAxios
      .get(`/askMazhar`, { params })
      .then((res) => res?.data?.data),

  getAnswerById: (id) =>
    axiosInstance.baseAxios
      .get(`/askMazhar/${id}`)
      .then((res) => res?.data?.data),

  postQuestion: (params) =>
    axiosInstance.baseAxios
      .post(`/askMazhar`, params)
      .then((res) => res?.data?.data),

};


