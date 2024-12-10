import React from 'react';
import styles from './index.module.css';
import whistle1 from 'src/assets/images/Twist/Whistle(1).svg';
import whistle from 'src/assets/images/Twist/Whistle.svg';
import yellowCard from 'src/assets/images/Twist/yellowCard.svg';
import redCard from 'src/assets/images/Twist/redCard.svg';
import change from 'src/assets/images/Twist/change.png';
import cleats from 'src/assets/images/Twist/Cleats.png';
import redArrow from 'src/assets/images/Twist/redArrow.png';
import playerIcon from 'src/assets/images/Twist/playerIcon.png';
import {
	getRouteInfo,
	getServiceAndSportRoute,
	ImgURL,
} from 'src/utils/globalFn';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';

function FootballMinuteByMinute({ data, isLoading, isError, date }) {
	const { pathname } = useLocation();
	const { serviceName, sportName } = getRouteInfo(pathname);
	const navigate = useNavigate();
	/* BEFORE MATCH DATE WITH 30 MINUTES*/
	let BeforeMatchdate = new Date(date);
	BeforeMatchdate.setMinutes(BeforeMatchdate.getMinutes() - 30);
	const date1 = new Date();
	const date2 = new Date(BeforeMatchdate);
	/***********************************/
	if (isLoading) {
		return (
			<>
				{[...Array(8).keys()].map((key) => (
					<Skeleton key={key} height={117} />
				))}
			</>
		);
	}
	if (isError)
		return (
			<h3 className='text-center'>حدث خطأ يرجى إعادة المحاوله مرة اخرى</h3>
		);
	return (
		<div className={styles.FootballMinuteByMinute}>
			{data.map((MatchDetails) => {
				switch (true) {
					case MatchDetails.comment.includes('بداية ') ||
						MatchDetails.comment.includes('نهاية'):
						return (
							<div className={styles.start} key={MatchDetails.id}>
								<img src={whistle1} alt='whistle' />
								<span>'{MatchDetails.time}</span>
								<h4>{MatchDetails.comment}</h4>
							</div>
						);
					case MatchDetails.comment.includes('بطاقة صفراء'):
						return (
							<div className={styles.card} key={MatchDetails.id}>
								<img src={yellowCard} alt='yellow-card' />
								<span>'{MatchDetails.time}</span>
								<div className='d-flex align-items-center gap-3'>
									<img
										className='rounded-circle'
										width={65}
										height={65}
										role='button'
										alt='Player image'
										src={ImgURL(MatchDetails.playerOne_image) || playerIcon}
										onClick={() =>
											navigate(
												`${getServiceAndSportRoute(
													serviceName,
													sportName,
												)}player/${MatchDetails.playerOne_id}`,
											)
										}
									/>
									<span>
										<h4>بطاقة صفراء</h4>
										{MatchDetails.comment}
									</span>
								</div>
							</div>
						);
					case MatchDetails.comment.includes('بطاقة حمراء'):
						return (
							<div className={styles.card} key={MatchDetails.id}>
								<img src={redCard} alt='red-card' />
								<span> '{MatchDetails.time}</span>
								<div className='d-flex align-items-center gap-3'>
									<img
										className='rounded-circle'
										width={65}
										height={65}
										alt='Player image'
										role='button'
										src={ImgURL(MatchDetails.playerOne_image) || playerIcon}
										onClick={() =>
											navigate(
												`${getServiceAndSportRoute(
													serviceName,
													sportName,
												)}player/${MatchDetails.playerOne_id}`,
											)
										}
									/>
									<span>
										<h4>بطاقة حمراء</h4>
										{MatchDetails.comment}
									</span>
								</div>
							</div>
						);
					case MatchDetails.comment.includes('تبديــل'):
						return (
							<div className={styles.playerChange} key={MatchDetails.id}>
								<div className={styles.playerChangeIcon}>
									<img src={change} alt='change-icon' width={35} height={35} />
								</div>
								<span>'{MatchDetails.time}</span>
								<div className='flex-column gap-1 align-items-start'>
									<h4>تبديــل</h4>
									<div
										className='gap-2 bg-transparent p-0'
										style={{ height: 45 }}>
										<img
											className={`${styles.playerChangeimg} rounded-circle`}
											width={45}
											height={45}
											alt='Player image'
											role='button'
											src={ImgURL(MatchDetails.playerOne_image) || playerIcon}
											onClick={() =>
												navigate(
													`${getServiceAndSportRoute(
														serviceName,
														sportName,
													)}player/${MatchDetails.playerOne_id}`,
												)
											}
										/>
										<span>خروج {MatchDetails.playerOne_name}</span>
										<img
											className={styles.playerInnerChangeIcon}
											src={change}
											alt='change-icon'
											width={35}
											height={35}
										/>
										<img
											className={`${styles.playerChangeimg} rounded-circle`}
											width={45}
											height={45}
											alt='Player image'
											role='button'
											src={ImgURL(MatchDetails.playerTwo_image) || playerIcon}
											onClick={() =>
												navigate(
													`${getServiceAndSportRoute(
														serviceName,
														sportName,
													)}player/${MatchDetails.playerTwo_id}`,
												)
											}
										/>
										<span>دخول {MatchDetails.playerTwo_name}</span>
									</div>
								</div>
							</div>
						);
					case MatchDetails.comment.includes('جوووول'):
						return (
							<div className={styles.goal} key={MatchDetails.id}>
								<img
									width={33}
									src={ImgURL(MatchDetails?.team_image)}
									alt='red-arrow'
								/>
								<span>'{MatchDetails.time}</span>
								<div className='bg-transparent flex-column align-items-start'>
									<h4>جوووول!</h4>
									{MatchDetails.comment}
									<div className={styles.goalDetailsContainer}>
										<img
											width={84}
											height={106}
											alt='Player image'
											role='button'
											src={ImgURL(MatchDetails.playerOne_image) || playerIcon}
											onClick={() =>
												navigate(
													`${getServiceAndSportRoute(
														serviceName,
														sportName,
													)}player/${MatchDetails.playerOne_id}`,
												)
											}
										/>
										<div className={styles.goalDetails}>
											<span> جوووول! {MatchDetails.playerOne_name}</span>
											{MatchDetails.playerTwo_name && (
												<span className='d-flex align-items-center'>
													<img
														src={cleats}
														alt='green- arrow'
														style={{
															marginLeft: 7,
														}}
													/>
													صناعة {MatchDetails.playerTwo_name}
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						);

					default:
						return (
							<div key={MatchDetails.id}>
								<img src={whistle} alt='whistle' />
								<span>' {MatchDetails.time} </span>
								{MatchDetails.comment}
							</div>
						);
				}
			})}
			{date1 >= date2 ? (
				<div className={styles.beforeMatch}>
					<img src={whistle} alt='whistle' />
					تم الإعلان عن التشكيلات ويقوم اللاعبون بالإحماء.
				</div>
			) : null}
		</div>
	);
}

export default FootballMinuteByMinute;
