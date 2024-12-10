import { Nav, Tab } from 'react-bootstrap';
import styles from './index.module.css';
import MatchesCarousel from './MatchesCarousel';
import apis from 'src/services/Twist';
import { useQuery } from '@tanstack/react-query';
import withOnDemandAndErrorBoundary from 'src/HOC/withOnDemandAndErrorBoundary';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRouteInfo } from 'src/utils/globalFn';
import { convertedData } from './helper';
import arrowRight from 'src/assets/images/Twist/arrow-home.svg';
import { useEffect, useState } from 'react';

const apiFn = (params) => {
	const { tournament_id, season_id, team_id, pathname, sport_id, service_id } =
		params;
	if (sport_id === 7) return apis.squash.getMatchCalender();
	if (team_id) return apis.calendar.getTeamCalender({ team_id });
	if (pathname === '/') return apis.calendar.getHomeCalender();
	if (pathname === '/othersports')
		return apis.calendar.getOtherSportsCalender();
	return apis.calendar.getCalender({
		tournament_id,
		season_id,
		sport_id,
		service_id,
	});
};

function MatchesCalendar({
	season_id,
	tournament_id,
	team_id,
	handelTabClick,
}) {
	const { pathname } = useLocation();
	const { serviceId: service_id, sportId: sport_id } = getRouteInfo(pathname);
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('today');

	const { isLoading, data = [] } = useQuery({
		queryKey: ['matches-calendar', pathname, season_id],
		queryFn: () =>
			apiFn({
				tournament_id,
				season_id,
				team_id,
				pathname,
				sport_id,
				service_id,
			}),
		select: (data) => convertedData({ data, sport_id, team_id }),
		enabled: !!season_id,
	});
	const isArrowClickedFromTournamentPage = () => {
		if (pathname.includes('tournament')) return handelTabClick('matches');

		return navigate('/matches');
	};

	useEffect(() => {
		if (isLoading) return;
		setActiveTab(data?.liveMatches?.length ? 'live' : 'today');
	}, [isLoading]);

	return (
		<div className={`${styles['matches-calendar']} matchesCalendarGlobal`}>
			<Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
				<div className={`${styles['all-days']} `}>
					<Nav>
						<Nav.Item>
							<Nav.Link
								eventKey='yesterday'
								className={`${styles['matches-calendar-day']}`}>
								<div className='text-center fs-xs '>
									<strong>أمس</strong>
								</div>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								eventKey='today'
								className={`${styles['matches-calendar-day']}`}>
								<div className='text-center fs-xs '>
									<strong>اليوم</strong>
								</div>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link
								eventKey='tomorrow'
								className={`${styles['matches-calendar-day']}`}>
								<div className='text-center fs-xs '>
									<strong>غدا</strong>
								</div>
							</Nav.Link>
						</Nav.Item>
						{!!data?.liveMatches?.length && (
							<Nav.Item>
								<Nav.Link
									eventKey='live'
									className={`${styles['matches-calendar-day']} ${styles['live']} `}>
									<div className={styles['circle-red']}></div>
									<div className='text-center fs-xs '>
										<strong>مباشر</strong>
									</div>
								</Nav.Link>
							</Nav.Item>
						)}
					</Nav>
					<Nav.Link
						className={`${styles['all-matches']}`}
						onClick={() => isArrowClickedFromTournamentPage()}>
						<span>كل المباريات</span>
						<img src={arrowRight} width={20} height={20} alt='Arrow icon' />
					</Nav.Link>
				</div>

				<Tab.Content>
					<Tab.Pane eventKey='yesterday'>
						<MatchesCarousel
							isLoading={isLoading}
							data={data?.yesterday?.reverse()}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey='today'>
						<MatchesCarousel
							isLoading={isLoading}
							data={data?.today?.reverse()}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey='tomorrow'>
						<MatchesCarousel
							isLoading={isLoading}
							data={data?.tomorrow?.reverse()}
						/>
					</Tab.Pane>
					<Tab.Pane eventKey='live'>
						<MatchesCarousel
							isLoading={isLoading}
							data={data?.liveMatches?.reverse()}
						/>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</div>
	);
}
MatchesCalendar.propTypes = {
	season_id: PropTypes.number,
	tournament_id: PropTypes.number,
	team_id: PropTypes.number,
	sport_id: PropTypes.number,
	service_id: PropTypes.number,
	handelTabClick: PropTypes.func,
};

export default withOnDemandAndErrorBoundary(MatchesCalendar);
