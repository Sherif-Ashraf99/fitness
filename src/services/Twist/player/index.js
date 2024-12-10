import AxiosInstance from "../../axios-instance";

export const player = {
  getTransferHistory: (player_id) =>
    AxiosInstance.baseAxios
      .get(`/player-transfer-history/${player_id}`)
      .then((res) => res?.data?.data),

  getPlayerTransferHistory: (player_id) =>
    AxiosInstance.baseAxios
      .get(`/player-history-details/${player_id}`)
      .then((res) => res?.data?.data),

  getPlayerDetails: (player_id) =>
    AxiosInstance.baseAxios
      .get(`/players/${player_id}`)
      .then((res) => res?.data?.data),
  getNewPlayerDetails: (player_id) =>
    AxiosInstance.baseAxios
      .get(`/players/${player_id}/details`)
      .then((res) => res?.data?.data),

  getPlayerSeasonStatistics: (params) =>
    AxiosInstance.baseAxios
      .get(`/playerSeasons_statistics`, { params })
      .then((res) => res?.data?.data),

  getNewTransfers: (params) =>
    AxiosInstance.baseAxios
      .get(`/transferes`, { params })
      .then((res) => res?.data?.data),

  getPlayerStatistics: (params) =>
    AxiosInstance.baseAxios
      .get(`/playerStatistics`, { params })
      .then((res) => res?.data?.data),

  getPlayersTopScorers: (params) =>
    AxiosInstance.baseAxios
      .get(`/top-scorers`, { params })
      .then((res) => res?.data?.data),

  getPlayersTopAssists: (params) =>
    AxiosInstance.baseAxios
      .get(`/top-assists`, { params })
      .then((res) => res?.data?.data),

  getPlayerSearchResult: (playerName, signal) =>
    AxiosInstance.baseAxios
      .get(`/searchPlayers?keyword=${playerName}`, { signal })
      .then((res) => res?.data?.data),

  getMostPlayers: () =>
    AxiosInstance.baseAxios.get(`/allplayers`).then((res) => res?.data?.data),

  getNewPlayerStatistics: (playerId, params) =>
    AxiosInstance.baseAxios
      .get(`/players/${playerId}/statistics`, { params })
      .then((res) => res?.data?.data),
};
