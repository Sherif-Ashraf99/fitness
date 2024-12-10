import PropTypes from 'prop-types';
import styles from './index.module.css';
import { customizeRoundObject, handleShowPenaltyScore } from './helper';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { sharedComponentsContext } from 'src/context/shared-context';
import { ImgURL, getServiceAndSportRoute } from 'src/utils/globalFn';
import euroCupImg from 'src/assets/images/Twist/euro-cup.png';
import apis from 'src/services/Twist';
import useWindowSize from 'src/hooks/useWindowSize';
import MobileView from './MobileView';

const apiFn = (params) => apis.tournaments.getTournamentTree(params);

function KnockOuts({ tournamentId }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const windowSize = useWindowSize();

	const {
		seasonInfo: { activeSeason },
	} = useContext(sharedComponentsContext);
	const [round16, setRound16] = useState({});
	const [round8, setRound8] = useState({});
	const [round4, setRound4] = useState({});
	const [round2, setRound2] = useState({});
	const roundsNum = {
		33: setRound16,
		7: setRound16,
		4: setRound8,
		3: setRound4,
		1: setRound2,
	};

	const tournamentTree = useQuery({
		queryKey: ['Euro-knockouts-tree'],
		queryFn: () =>
			apiFn({
				tournament_id: tournamentId,
				season_id: 10000015,
			}),
		enabled: !!activeSeason.id,
		onSuccess: (data) => {
			// console.log('tree data', data);
			for (let round of data) roundsNum[round?.id](round);
		},
	});

	const handleRowClick = (serviceId, sportId, id) => {
		navigate(
			`${getServiceAndSportRoute(serviceId, sportId)}team/${id}/overview`,
			{
				state: { previousPathname: pathname },
			},
		);
	};

	const handleRenderRounds = (
		round,
		matchResultWrapperNum,
		cup = false,
		specialRound = false,
	) => {
		const { matches } = round;
		const matchResultWrapperِArr = [...new Array(matchResultWrapperNum)].map(
			(_, i) => i * 2,
		);
		return (
			<>
				{matchResultWrapperِArr.map((ele, index) => (
					<div className={styles['matches-results-wrapper']} key={ele}>
						{specialRound
							? matches.slice(index, index + 1).map((match) => {
									const key = match.id ?? match;
									return handleRenderMatchStructure(
										match,
										cup,
										key,
										matchResultWrapperNum,
									);
							  })
							: matches.slice(ele, ele + 2).map((match) => {
									const key = match.id ?? match;
									return handleRenderMatchStructure(
										match,
										cup,
										key,
										matchResultWrapperNum,
									);
							  })}
					</div>
				))}
			</>
		);
	};

	const handleRenderMatchStructure = (
		match,
		cup = false,
		key,
		matchResultWrapperNum,
	) => {
		const foundMatch = !!match.tree_position;
		return (
			<div className={styles['match-result']} key={key}>
				{handleRenderTeam(foundMatch, match.team1, match)}
				{matchResultWrapperNum === 1 && (
					<div className={styles['final-match']}>
						<div>
							<span>التاريخ</span>
							<span>-- : --</span>
						</div>
						<figure>
							<img src={euroCupImg} alt='euro-cup' />
						</figure>
					</div>
				)}
				{handleRenderTeam(foundMatch, match.team2, match)}
			</div>
		);
	};

	const handleTeamClick = (teamId) => {};
	const handleMatchClick = (matchId) => {};

	const handleRenderTeam = (foundMatch, team, match) => (
		<div
			className={styles['team-details-wrapper']}
			onClick={() => handleTeamClick(team?.id)}>
			<div className={styles['team-info']}>
				<figure>
					{foundMatch ? <img src={team?.logo} alt='' /> : '🌎'}
					<figcaption className=''>{team?.name || 'إسم الفريق'}</figcaption>
				</figure>
			</div>
			<div
				className={styles['team-goals']}
				onClick={() => handleMatchClick(match?.id)}>
				<span>{team?.totalScore}</span>
				{handleShowPenaltyScore(match?.team1, match?.team2) && (
					<span>{`(${team?.penalties_score})`}</span>
				)}
			</div>
		</div>
	);

	if (tournamentTree.isLoading || tournamentTree.isError) return;

	if (windowSize.width <= 992)
		return (
			<MobileView
				round16={round16}
				round8={round8}
				round4={round4}
				round2={round2}
			/>
		);

	return (
		<section className={styles['knockouts']}>
			<h2>الأدوار الأقصائية</h2>
			<div className={styles['knockouts-tree-wrapper']}>
				<div className={styles['round-wrapper']}>
					<h3>دور الـ 16</h3>
					<div className={styles['teams-matches-wrapper']}>
						{handleRenderRounds(customizeRoundObject(8, round16), 4)}
					</div>
				</div>
				<div className={styles['round-wrapper']}>
					<h3>ربع النهائي</h3>
					<div className={styles['teams-matches-wrapper']}>
						{handleRenderRounds(customizeRoundObject(4, round8), 2)}
					</div>
				</div>
				<div className={styles['round-wrapper']}>
					<h3>نصف النهائي</h3>
					<div className={styles['teams-matches-wrapper']}>
						{handleRenderRounds(
							customizeRoundObject(2, round4),
							2,
							false,
							true,
						)}
					</div>
				</div>
				<div className={styles['round-wrapper']}>
					<h3>النهائي</h3>
					<div className={styles['teams-matches-wrapper']}>
						{handleRenderRounds(customizeRoundObject(1, round2), 1, true)}
					</div>
				</div>
			</div>
		</section>
	);
}

KnockOuts.propTypes = {};

export default KnockOuts;
