import AxiosInstance from "src/services/axios-instance";

export const whereIsTheBallGame = {
    getBallPositions: () =>
        AxiosInstance.baseAxios
            .get(`/ball-position`)
            .then((res) => res?.data.data),

    postBallPosition: (inputData) =>
        AxiosInstance.baseAxios
            .post(`/ball-position-answer`, inputData)
            .then((res) => res?.data.data),
};