import AxiosInstance from "../../axios-instance";

export const search = {
  getMostSearched: () =>
    AxiosInstance.baseAxios.get(`/mostSearched`).then((res) => res?.data?.data),

  addMostSearched: (data) =>
    AxiosInstance.baseAxios
      .post(`/mostSearched`, data)
      .then((res) => res?.data?.data),

  getFullSearch: (params,signal) =>
    AxiosInstance.baseAxios
      .get("/full-search", { params,signal })
      .then((res) => res?.data?.data),
};
