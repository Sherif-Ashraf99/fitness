import axiosInstance from "src/services/axios-instance";

export const fantasy = {
  getRanking: (params) =>
    axiosInstance.baseMeloukAxios
      .get(`/fantasy-ranking`, { params })
      .then((res) => res?.data?.data),
};
