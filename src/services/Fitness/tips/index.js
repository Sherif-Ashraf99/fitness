import axiosInstance from "src/services/axios-instance";

export const tips = {
  getTips: (pageParam) => {
   return axiosInstance.baseAxios
      .get(`/mazharAdvice`, {params  : pageParam} )
      .then((res) => res?.data?.data)},

  getTipsById: (id) =>
    axiosInstance.baseAxios
      .get(`/mazharAdvice/${id}`)
      .then((res) => res?.data?.data),
};
