import axiosInstance from "src/services/axios-instance";

export const workout = {
  getWorkout: (params) =>
    axiosInstance.baseAxios
      .get(`/exercises`, { params })
      .then((res) => res?.data?.data),

  getWorkoutById: (id) =>
    axiosInstance.baseAxios
      .get(`/exercises/${id}`)
      .then((res) => res?.data?.data),
};
