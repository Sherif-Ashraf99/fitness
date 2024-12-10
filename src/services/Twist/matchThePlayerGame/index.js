import AxiosInstance from "src/services/axios-instance";

export const matchThePlayerGame = {
    getPlayers: () =>
        AxiosInstance.baseAxios
            .get(`/match_the_players`)
            .then((res) => res?.data.data),

    postPlayers: (inputData) =>
        AxiosInstance.baseAxios
            .post(`/match_the_players_answers`, inputData)
            .then((res) => res?.data.data),
};