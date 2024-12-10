import styles from './index.module.css';
import PropTypes from 'prop-types';
import leftarrow from 'src/assets/images/Twist/left-black.png';
import arrowxl from 'src/assets/images/Twist/arrow-home.svg';
import { Link } from 'react-router-dom';

function ArrowPage({ title, endPoint }) {
	return (
		<div className={`${styles['ArrowPage']}`}>
			<Link to={endPoint}>
				<div className={styles['arrow-web']}>
					<span>{title}</span>
					<img src={arrowxl} width={20} height={20} alt='Arrow icon' />
				</div>
				<div className={styles['arrow-mob']}>
					<img src={leftarrow} alt='Arrow icon' />
				</div>
			</Link>
		</div>
	);
}

ArrowPage.propTypes = {
	title: PropTypes.string,
	endPoint: PropTypes.string,
};
export default ArrowPage;
