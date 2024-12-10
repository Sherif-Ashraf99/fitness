import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import { Table } from 'react-bootstrap';
import apis from 'src/services/Twist';
import { useQuery } from '@tanstack/react-query';
import ArrowDown from 'src/assets/images/Twist/ArrowDown.svg';
import ArrowUp from 'src/assets/images/Twist/ArrowUp.svg';
import { getServiceAndSportRoute, ImgURL } from 'src/utils/globalFn';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const apiFn = (params) => apis.tournaments.getTournamentTeamsRanking(params);

function FootBallMatchRanking({ tournament, match }) {
	const [teamsTableScroll, setTeamsTableScroll] = useState(0);
	const navigate = useNavigate();
	const { id } = tournament;
	const { team1, team2 } = match;
	const {
		data = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['TournamentsRanking', id],
		queryFn: () =>
			apiFn({
				tournament_id: id,
			}),
	});

	useEffect(() => {
		let teamsTable = document.getElementsByClassName('table-responsive')[0];
		if (teamsTable) {
			teamsTable.addEventListener('scroll', function () {
				setTeamsTableScroll(
					document.getElementsByClassName('table-responsive')[0]?.scrollLeft,
				);
			});
		}
	}, [isLoading]);

	const TournamentsRanking = data[0]?.data.standing;
	const TournamentsQualifications = data[0]?.data.qualifications;
	if (isError)
		return (
			<h3 className='text-center'>حدث خطأ يرجى إعادة المحاوله مرة اخرى</h3>
		);
	return (
		<div className={styles.footballMatchDetails}>
			<h3>ترتيب {data[0]?.title}</h3>
			{isLoading ? (
				[...Array(20).keys()].map((key) => (
					<Skeleton key={key} height={48.75} />
				))
			) : (
				<Table
					className='table table-borderless table-hover text-white'
					role='button'
					responsive
					hover>
					<thead>
						<tr>
							<th colSpan={1}>الترتيب</th>
							<th colSpan={3}>الفريق </th>
							<th className='text-center' colSpan={1}>
								لعب
							</th>
							<th
								className='text-center'
								colSpan={teamsTableScroll > -200 ? 1 : 3}>
								له
							</th>
							<th
								className='text-center'
								colSpan={teamsTableScroll > -200 ? 1 : 3}>
								علية
							</th>
							<th className='pe-2' colSpan={teamsTableScroll > -200 ? 1 : 3}>
								نقاط
							</th>
							<th
								style={{ textAlign: `${teamsTableScroll < -200 && 'center'}` }}
								colSpan={3}>
								اخر المباريات{' '}
							</th>
						</tr>
					</thead>
					<tbody>
						{TournamentsRanking?.map((team, i) => {
							const ArrowImg = (scoreStatus) => {
								if (scoreStatus === 'W') {
									return ArrowUp;
								} else if (scoreStatus === 'L') {
									return ArrowDown;
								} else if (scoreStatus === 'D') {
									return;
								}
							};

							return (
								<tr
									style={{
										borderRight: `${
											team.color ? `1px solid ${team.color}` : 'none'
										}`,
										background: `${
											team1.id === team.team_id || team2.id === team.team_id
												? '#004996'
												: ''
										}`,
									}}
									key={team.team_id}
									className={
										TournamentsRanking.length === i + 1
											? 'border-bottom-0'
											: null
									}>
									<td colSpan={1}>{i + 1}</td>
									<td
										onClick={() =>
											navigate(
												`${getServiceAndSportRoute(
													team.services[0],
													team.sport_id,
												)}team/${team.team_id}/overview`,
											)
										}
										colSpan={3}
										style={{
											width: `${teamsTableScroll > -50 ? 'auto' : '70px'}`,
										}}>
										<span
											className='ms-3'
											style={{ width: 26, display: 'inline-block' }}>
											{team.playNow.status && (
												<img
													src={ArrowImg(team.playNow.score_status)}
													alt='Icon'
												/>
											)}
										</span>

										<img
											className='ms-2'
											width={37.96}
											height={37.96}
											src={ImgURL(team.team_logo)}
											alt='team-logo'
										/>
										<span className=''>
											{teamsTableScroll > -50 && team.team_name}
										</span>
									</td>
									<td colSpan={1}>{team.played}</td>
									<td colSpan={teamsTableScroll > -200 ? 1 : 3}>
										{team.goals_in}
									</td>
									<td colSpan={teamsTableScroll > -200 ? 1 : 3}>
										{team.goals_out}
									</td>
									<td
										className='pe-2'
										colSpan={teamsTableScroll > -200 ? 1 : 3}>
										{team.point}
									</td>
									<td colSpan={3} className={styles.lastMatches}>
										{team?.lastStatus?.map((lastMatch, index) => {
											let backgroundColor;
											let statusLetter;
											let color;
											switch (lastMatch.status) {
												case 'L':
													backgroundColor = '#E62644';
													statusLetter = 'خ';

													break;

												case 'D':
													backgroundColor = '#fff';
													statusLetter = 'ت';
													color = 'black';

													break;

												case 'W':
													backgroundColor = '#00DB74';
													statusLetter = 'ف';

													break;

												default:
													backgroundColor = '#00DB74';
													statusLetter = 'ف';
											}
											return (
												<span
													key={index}
													style={{ background: backgroundColor }}>
													<span style={{ color: color }}>{statusLetter}</span>
													<div className={styles.lastMatch}>
														<div>{team.created_at}</div>
														<div>
															<span>
																<img
																	style={{ borderRadius: '50%' }}
																	src={ImgURL(lastMatch.teamOne_logo)}
																	alt='team-logo'
																	width={24.376}
																	height={24.376}
																/>
																{lastMatch.teamOne_name}
															</span>
															<span>
																{lastMatch.teamOne_score} -{' '}
																{lastMatch.teamTwo_score}
															</span>
															<span>
																<img
																	style={{ borderRadius: '50%' }}
																	src={ImgURL(lastMatch.teamTwo_logo)}
																	alt='team-logo'
																	width={24.376}
																	height={24.376}
																/>
																{lastMatch.teamTwo_name}
															</span>
														</div>
													</div>
												</span>
											);
										})}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			)}
			<div className={styles.footer}>
				{TournamentsQualifications?.map((tournament) => {
					let backgroundColor;

					switch (tournament.key) {
						case 0:
							backgroundColor = '#00FF87';
							break;

						case 1:
							backgroundColor = '#FCBF00';
							break;

						default:
							backgroundColor = '#fff';
					}
					if (tournament.up === false) {
						backgroundColor = '#E62644';
					}
					return (
						<span key={tournament.key} className='me-4'>
							<span
								style={{
									background: backgroundColor,
								}}></span>
							{tournament.tournament_name}
						</span>
					);
				})}
			</div>
		</div>
	);
}

export default FootBallMatchRanking;
