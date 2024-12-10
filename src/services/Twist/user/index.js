import AxiosInstance from "../../axios-instance";

export const user = {
  
  getAllSports: () => AxiosInstance.baseAxios.get(`/sports`).then((res) => res?.data?.data?.data),

  addFavourites: (data) =>
    AxiosInstance.baseAxios
      .post(`/create`, data)
      .then((res) => res?.data?.data),

  getFavourites: (params) =>
    AxiosInstance.baseAxios
      .get(`/favourites`, { params })
      .then((res) => res?.data?.data),
  
  deleteFavourites: (params) =>
    AxiosInstance.baseAxios.get(`/delete`, { params })
      .then((res) => res.data),
      
  getUserPoints: (params) =>
    AxiosInstance.baseAxios
      .get(`/userPoints`, { params })
      .then((res) => res?.data?.data),
};
