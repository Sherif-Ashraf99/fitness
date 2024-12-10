import { Children } from 'react';
import styles from './MobileView.module.css';
import PropTypes from 'prop-types';
import { ImgURL } from 'src/utils/globalFn';
import { handleShowPenaltyScore } from './helper';
import euroCupImg from 'src/assets/images/Twist/euro-cup.png';

function MobileView({ round16, round8, round4, round2 }) {
	
	if(!Object.keys(round16).length) return

	const sortRound = (roundMatches) =>
		roundMatches.sort((a, b) => a.tree_position - b.tree_position);

	const renderTeamsMatch = ({ match = {}, final = false } = {}) => {
		return (
			<>
				{!final && (
					<div className={styles['match-result']}>
						{renderTeamInfo(match, match?.team1)}
						{renderTeamInfo(match, match?.team2)}
					</div>
				)}
				{final && (
					<div className={styles['final-match-result']}>
						{renderTeamInfo(match, match?.team1)}
						<div className={styles['final-match']}>
							<div>
								<span>التاريخ</span>
								<span>-- : --</span>
							</div>
							<figure>
								<img src={euroCupImg} alt='euro-cup' />
							</figure>
						</div>
						{renderTeamInfo(match, match?.team2)}
					</div>
				)}
			</>
		);
	};

	const renderTeamInfo = (match, team) => {
		return (
			<div className={styles['team-info']}>
				<figure>
					{team?.logo ? <img src={ImgURL(team?.logo)} alt='team-logo' /> : '🌍'}
					<figcaption>
						<span>{team?.name}</span>
					</figcaption>
				</figure>
				<div
					className={styles['team-goals']}
					onClick={() => handleMatchClick(team?.id)}>
					<span>{team?.totalScore}</span>
					{handleShowPenaltyScore(match?.team1, match?.team2) && (
						<span>({team?.penalties_score}) </span>
					)}
					<span>{team?.score}</span>
				</div>
			</div>
		);
	};

	const handleTeamClick = (teamId) => {};
	const handleMatchClick = (matchId) => {};

	return (
		<section className={styles['mobile-view']}>
			<h2>الأدوار الأقصائية</h2>
			<div className={styles['knockouts-tree-wrapper']}>
				<div className={`${styles['round-16-top-wrapper']} ${styles['top']}`}>
					<h3>دور الـ 16</h3>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round16.matches)
								.slice(0, 4)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
				</div>

				<div className={`${styles['round-8-top-wrapper']} ${styles['top']}`}>
					<h3>ربع النهائي</h3>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round8.matches)
								.slice(0, 2)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
				</div>

				<div className={`${styles['round-4-top-wrapper']} ${styles['top']}`}>
					<h3>نصف النهائي</h3>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round4.matches)
								.slice(0, 1)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
				</div>

				<div className={styles['round-2-wrapper']}>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							round2.matches.map((match) =>
								renderTeamsMatch({ match, final: true }),
							),
						)}
					</div>
				</div>

				<div
					className={`${styles['round-4-bottom-wrapper']} ${styles['bottom']}`}>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round4.matches)
								.slice(1)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
					<h3>نصف النهائي</h3>
				</div>

				<div
					className={`${styles['round-8-bottom-wrapper']} ${styles['bottom']}`}>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round8.matches)
								.slice(2)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
					<h3>ربع النهائي</h3>
				</div>

				<div
					className={`${styles['round-16-bottom-wrapper']} ${styles['bottom']}`}>
					<div className={styles['teams-matches-wrapper']}>
						{Children.toArray(
							sortRound(round16.matches)
								.slice(4)
								.map((match) => renderTeamsMatch({ match })),
						)}
					</div>
					<h3>دور الـ 16</h3>
				</div>
			</div>
		</section>
	);
}

MobileView.propTypes = {
	round16: PropTypes.object,
	round8: PropTypes.object,
	round4: PropTypes.object,
	round2: PropTypes.object,
};

export default MobileView;
