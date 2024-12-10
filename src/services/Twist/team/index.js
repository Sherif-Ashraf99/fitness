import AxiosInstance from '../../axios-instance';


export const teams = {
    getTeams: (params) => AxiosInstance.baseAxios
        .get(`/simple_teams`, { params })
        .then((res) => res?.data?.data),

    getTeamDetails: (id) => AxiosInstance.baseAxios
        .get(`/teams/${id}`)
        .then((res) => res?.data?.data),

    getTeamStatistics: (params) => AxiosInstance.baseAxios
        .get(`/teamStatistics`, { params })
        .then((res) => res?.data?.data),

    getTeamSquad: (team_id, params) => AxiosInstance.baseAxios
        .get(`/teams/${team_id}/squad`, { params })
        .then((res) => res?.data?.data),

    getTopScorers: (params) => AxiosInstance.baseAxios
        .get(`/top-scorers`, { params })
        .then((res) => res?.data?.data),

    getTopAssists: (params) => AxiosInstance.baseAxios
        .get(`/top-assists`, { params })
        .then((res) => res?.data?.data),

    getTeamSearchResult: (TeamName,signal) => AxiosInstance.baseAxios
        .get(`/searchTeams?keyword=${TeamName}`,{ signal })
        .then((res) => res?.data?.data),
};