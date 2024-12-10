import AxiosInstance from "../../axios-instance";

export const serviceId = {
  getServiceId: (params) =>
    AxiosInstance.baseAxios
      .get("/getService", { params })
      .then((res) => res?.data?.data),
};
