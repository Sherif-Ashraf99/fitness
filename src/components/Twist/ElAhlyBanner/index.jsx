import { Link } from 'react-router-dom';
import styles from './index.module.css';
import elAhlyBanner from 'src/assets/images/Twist/ElAhlyBanner.png';

export default function ElAhlyBanner() {
	return (
		<div className={`${styles['elahly-banner']}`}>
			{/* Need to change image dimensions */}
			<img
				loading='lazy'
				src={elAhlyBanner}
				alt='El Ahly promotional banner'
				style={{ width: '100%', height: '250px' }}
			/>
			<div className={`${styles['elahly-banner-data']}`}>
				<h2>{'تابع أخبار النادي الأهلي على تويست سبورتس'}</h2>
				<Link to='/al-ahly/local/team/6631/overview'>
					{'صفحة النادى الأهلى'}
				</Link>
			</div>
		</div>
	);
}
