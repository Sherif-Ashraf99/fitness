import styles from './index.module.css';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import loaderImage from 'src/assets/images/Shared/media-loader-image.svg';
import alAhlyloaderImage from 'src/assets/images/Shared/al-ahly-media-loader-image.svg';
import loaderVideo from 'src/assets/images/Shared/media-loader-video.svg';
import alAhlyLoaderVideo from 'src/assets/images/Shared/al-ahly-media-loader-video.svg';
import { useParams } from 'react-router-dom';

function TwistMediaCardSkeleton({ imageHeight, textHeight, videoIcon }) {
	const { id } = useParams();
	const getLoaderVideoIcon = () => {
		return id === '6631' ? alAhlyLoaderVideo : loaderVideo;
	};
	const getLoaderNewsIcon = () => {
		return id === '6631' ? alAhlyloaderImage : loaderImage;
	};

	return (
		<div
			className={`${styles['twist-media-card-skeleton']} ${
				id === '6631' && styles['al-ahly-page']
			}`}>
			<figure>
				<img
					style={{ height: imageHeight }}
					src={videoIcon ? getLoaderVideoIcon() : getLoaderNewsIcon()}
					alt='media icon'
				/>
			</figure>
			<div>
				<Skeleton style={{ height: textHeight }} />
				<Skeleton style={{ height: textHeight }} />
			</div>
		</div>
	);
}

TwistMediaCardSkeleton.propTypes = {
	imageHeight: PropTypes.string,
	textHeight: PropTypes.string,
	videoIcon: PropTypes.bool,
	twoColumns: PropTypes.bool,
};

export default TwistMediaCardSkeleton;
