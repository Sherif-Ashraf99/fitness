import AxiosInstance from "../../axios-instance";
import { IDS } from "src/utils/globalData";

export const media = {
  getMediaList: (params = {}) =>
    AxiosInstance.baseAxios
      .get(`/media`, { params })
      .then((res) => res?.data?.data),

  getMediaDetails: (mediaId) =>
    AxiosInstance.baseAxios
      .get(`/media/${mediaId}`)
      .then((res) => res.data.data),

  getMiXMediaList: (params) =>
    AxiosInstance.baseAxios
      .get(`/mixMedia`, { params })
      .then((res) => res.data.data),

  getMatchNews: (params) =>
    AxiosInstance.baseAxios
      .get(`/matchMedia`, { params })
      .then((res) => res.data.data),
};
