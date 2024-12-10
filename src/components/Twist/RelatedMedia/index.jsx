import styles from './index.module.css';
import MediaCard from '../Media/MediaCard';
import Ads from 'src/components/Shared/TwistAds';

export const RelatedMedia = ({ data, isLoading, isHorizontal }) => {
	if (isLoading)
		return <h4 className={`${styles['related-media']}`}>Loading ...</h4>;

	return (
		<div className={`${styles['related-media']}`}>
			<h5>{`أخبار متعلقة :`}</h5>
			{data.related.slice(0, 4).map((relatedMedia) => (
				<div
					className={`${styles['related-media-item']} my-3`}
					key={relatedMedia.id}>
					<MediaCard
						mediaObj={relatedMedia}
						title={relatedMedia?.title}
						description={relatedMedia?.description}
						date={relatedMedia?.created_at}
						imgSrc={relatedMedia?.media}
						horizontal={isHorizontal}
						tag={relatedMedia.tags?.[0]?.title}
						// showTag={false}
						lead={relatedMedia.lead}
					/>
				</div>
			))}
			<Ads adSlot={'4047276708'} />
		</div>
	);
};
