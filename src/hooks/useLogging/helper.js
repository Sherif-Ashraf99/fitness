import { getUserPhoneNumnberFromCookies } from 'src/utils/globalFn';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';

export const getLoggingsParams = () => {
	const cookies = new Cookies();
	const ip_address = cookies.get('ip_address');
	const msisdn = getUserPhoneNumnberFromCookies();
	const section_id = getSectionId();
	let user_session = window.sessionStorage.getItem('user_session');

	if (!user_session) {
		const randomSessionId = uuidv4();
		window.sessionStorage.setItem('user_session', randomSessionId);
		user_session = randomSessionId;
	}
	const source = getVisitSource();

	return {
		ip_address,
		msisdn,
		section_id,
		user_session,
		source,
	};
};

const getVisitSource = () => {
	const url = window.location.href;
	const sIndex = url.indexOf('?s=');
	const qrIndex = url.indexOf('?Qr=');
	if (sIndex !== -1) return url.substring(sIndex + 3);
	else if (
		qrIndex !== -1 &&
		parseFloat(url.substring(qrIndex + 4)) === parseFloat('4.9855623231905E+19')
	)
		return 'qr';
	return null;
};

const getSectionId = () => {
	const url = window.location.href;
	if (url.includes('road-to-championship')) {
		return 1;
	} else if (url.includes('fun2fit')) {
		return 2;
	} else if (url.includes('fl3aglaelsalama')) {
		return 3;
	} else {
		return null;
	}
};
