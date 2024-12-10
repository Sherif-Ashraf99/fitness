import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLoggingsParams } from './helper';
import Cookies from 'universal-cookie';
import apis from 'src/services/Twist';
import { getRouteInfo } from 'src/utils/globalFn';

export default function useLogging(to_url) {
	const cookies = new Cookies();
	const { pathname, state } = useLocation();
	const { serviceId: service_id } = getRouteInfo(pathname);

	const { ip_address, msisdn, section_id, user_session, source } =
		getLoggingsParams();

	const sendLogFn = (ip) => {
		apis.reports.sendLog({
			from_url: state?.previousPathname,
			ip_address: ip,
			msisdn,
			section_id,
			service_id,
			user_session,
			source,
			to_url: to_url ?? pathname,
		});
	};

	useEffect(() => {
		if (!ip_address) {
			const getIp = async () => {
				const ip = await apis.reports.getIp();
				cookies.set('ip_address', ip, { path: '/', maxAge: `${60 * 60 * 12}` });
				sendLogFn(ip);
			};
			getIp();
		} else sendLogFn(ip_address);
	}, [pathname, section_id, source]);
	// }, [ip_address, source, service_id, pathname, section_id]);

	return null;
}
