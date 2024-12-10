import AxiosInstance from '../../axios-instance';

export const seasons = {
    getSeasons: (params) => AxiosInstance.baseAxios
        .get('/seasons', { params })
        .then((res) => res?.data)
};