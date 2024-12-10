import Skeleton from 'react-loading-skeleton';
import styles from './index.module.css';
import { ImgURL } from 'src/utils/globalFn';

const GalleryAlbumDetails = ({ albumDetails, isLoading }) => {
	const skeletonsArr = [...Array(6).keys()];

	if (isLoading)
		return (
			<div className={styles['album-details-loader']}>
				{skeletonsArr.map((skeleton) => (
					<Skeleton className={styles['skeleton']} key={skeleton} />
				))}
			</div>
		);

	return (
		<div className={styles['album-details']}>
			{albumDetails.map((img) => (
				<img key={img.id} src={ImgURL(img.image)} alt='' />
			))}
		</div>
	);
};

export default GalleryAlbumDetails;
