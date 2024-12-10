import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import BannerImg from 'src/assets/images/Olympics/BANNEROlympics.jpg';
import { isEventEnded } from 'src/utils/globalData';
import { useContext } from 'react';
import { sharedComponentsContext } from 'src/context/shared-context';

function EventBanner() {
	const navigate = useNavigate();
	const { showBanner } = useContext(sharedComponentsContext);
	let olympicsDate = '2024-07-26 20:30';
	const currentTime = new Date();
	const olympicsStarted = Date.parse(olympicsDate) - currentTime < 0;

	return (
		<>
			{(showBanner || olympicsStarted) && !isEventEnded && (
				<section className={styles['banner']}>
					<figure>
						<img loading='lazy' src={BannerImg} alt='Banner image' />
					</figure>
					<button onClick={() => navigate('/olympics/overview')}>
						<span>اعرف المزيد</span>
					</button>
				</section>
			)}
		</>
	);
}

export default EventBanner;
