import AxiosInstance from '../../axios-instance';

export const medals = {
	getOlymbicMedals: (params) =>
		AxiosInstance.baseAxios
			.get(`/olymbicBrizes`, { params })
			.then((res) => res?.data?.data),

	getSportMonthlyCalendarMedals: (params) =>
		AxiosInstance.baseAxios
			.get(`/sportMonthlyCalendar`, { params })
			.then((res) => res?.data?.data),
};
