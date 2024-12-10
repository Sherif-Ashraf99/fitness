import AxiosInstance from '../../axios-instance';

export const gallery = {
    getGalleryList: (teamId) =>
        AxiosInstance.baseAxios
            .get(`/galleryList/${teamId}`)
            .then((res) => res?.data?.data),

    getOneGallery: (galleryId) =>
        AxiosInstance.baseAxios
            .get(`/teamGallery/${galleryId}`)
            .then((res) => res.data.data)
};