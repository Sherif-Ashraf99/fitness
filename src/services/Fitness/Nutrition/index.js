import axiosInstance from "src/services/axios-instance";

export const Nutrition = {
  getDisLikedFood: () =>
    axiosInstance.baseAxios
      .get(`/foods`)
      .then((res) => res?.data?.data)
      .catch((res) => res.response),

  getMeals: () =>
    axiosInstance.baseAxios
      .get(`/meals`)
      .then((res) => res?.data?.data)
      .catch((res) => res.response),

  addUserFoodSystem: (data) =>
    axiosInstance.baseAxios
      .post(`/userFoodSystem`, data)
      .then((res) => res?.data?.data),
};
