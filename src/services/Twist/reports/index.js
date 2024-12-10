import axios from 'axios';
import AxiosInstance from '../../axios-instance';
import { IDS } from 'src/utils/globalData';

export const reports = {
	getIp: () =>
		axios
			.create({
				baseURL: 'https://api.ipify.org/',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.get('?format=json')
			.then((res) => res?.data.ip)
			.catch(() => 'error'),

	sendLog: (params = {}) =>
		AxiosInstance.baseAxios
			.post('/portal/log', null, {
				params: { ...params, portal_id: IDS.PORTALS.TWIST },
			})
			.then((res) => res?.data)
			.catch((err) => err?.response?.data),
};
