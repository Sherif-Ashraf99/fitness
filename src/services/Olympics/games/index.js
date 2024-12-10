import AxiosInstance from "../../axios-instance";

export const games = {
  getOlympicsKing: (params) =>
    AxiosInstance.baseAxios
      .get(`/olymbicKingQuestions`, { params })
      .then((res) => res?.data),

  sendOlympicsKing: (data) =>
    AxiosInstance.baseAxios
      .post(`/playOlymbicKing`, data)
      .then((res) => res?.data),

  getOlympicsQuiz: (params) =>
    AxiosInstance.baseAxios
      .get(`/olymbicQuizQuestions`, { params })
      .then((res) => res?.data),

  sendOlympicsQuiz: (data) =>
    AxiosInstance.baseAxios
      .post(`/playOlymbicQuiz`, data)
      .then((res) => res?.data),

      getOlympicsArosty: (params) =>
        AxiosInstance.baseAxios
          .get(`/olymbicArostyQuestions`, { params })
          .then((res) => res?.data),
    
      sendOlympicscArosty: (data) =>
        AxiosInstance.baseAxios
          .post(`/playOlymbicArosty`, data)
          .then((res) => res?.data),
    
};
