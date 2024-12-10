import AxiosInstance from '../../axios-instance';

export const matches = {
	getOlymbicHomeCalendar: (params) =>
		AxiosInstance.baseAxios
			.get(`/olymbicHomeCalendar`, { params })
			.then((res) => res?.data),

	getOlymbicNextMatches: (params) =>
		AxiosInstance.baseAxios
			.get(`/nextMatches`, { params })
			.then((res) => res?.data),

	getOlymbicPreviousMatches: (params) =>
		AxiosInstance.baseAxios
			.get(`/previousMatches`, { params })
			.then((res) => res?.data),
};
