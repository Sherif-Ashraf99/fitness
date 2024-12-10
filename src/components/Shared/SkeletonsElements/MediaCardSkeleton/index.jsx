import styles from './index.module.css';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import loaderVideo from 'src/assets/images/Shared/media-loader-video.svg';
import loaderImage from 'src/assets/images/Shared/media-loader-image.svg';

function MediaCardSkeleton({ twoColumns, videoIcon }) {
	return (
		<div
			className={`${styles['media-card-skeleton']} ${
				twoColumns ? styles['two-columns'] : ''
			}`}>
			<figure>
				<img
					src={videoIcon ? loaderVideo : loaderImage}
					className={styles['main-image']}
					alt='media icon'
				/>
			</figure>
			<div className={styles['description']}>
				<div>
					<Skeleton containerClassName={styles['title']} />
					<Skeleton containerClassName={styles['title']} />
				</div>
				<div className={styles['date']}>
					{/* <Skeleton containerClassName={styles['icon']} circle /> */}
					<Skeleton containerClassName={styles['time']} />
				</div>
			</div>
		</div>
	);
}

MediaCardSkeleton.propTypes = {
	twoColumns: PropTypes.bool,
	videoIcon: PropTypes.bool,
};

export default MediaCardSkeleton;
