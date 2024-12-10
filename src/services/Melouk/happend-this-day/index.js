import axiosInstance from "src/services/axios-instance";

export const happendThisDay = {
  getHappenedThisDay: (params) =>
    axiosInstance.baseMeloukAxios
      .get(`/happened-this-day`, { params })
      .then((res) => res?.data?.data),
};
