import styles from './index.module.css';
import { ImgURL } from 'src/utils/globalFn';
import { convertFullDate } from 'src/utils/globalFn';
import SocialMediaShear from '../SocialMediaShear';
import ViesIcon from 'src/assets/images/Twist/ViewsIcon.svg';
import CreatedAtIcon from 'src/assets/images/Twist/Icon feather-clock.svg';
import MediaDescriptionLoader from './MediaDescriptionLoader';
import { VideoPlayer } from 'src/components/Twist/VideoPlayer';
import Ads from 'src/components/Shared/TwistAds';

export const MediaDescription = ({ data, isLoading }) => {
	if (isLoading) return <MediaDescriptionLoader />;

	return (
		<>
			<div className={styles['media-description']}>
				<h3 className='py-3'>{data.title}</h3>

				{data.type == 1 ? (
					<div className={styles['main-img']}>
						<img src={ImgURL(data.media)} alt='news main image' />
						<div
							className={`${styles['media-info']} p-2 d-flex justify-content-between`}>
							<span>
								<img
									className='px-1'
									src={CreatedAtIcon}
									alt={`Created at ${convertFullDate(data?.created_at)}`}
								/>
								{convertFullDate(data?.created_at)}
							</span>

							{/* <span>
                                {data.views}
                                <img className='px-1' src={ViesIcon} alt={`Views ${data.views}`} />
                            </span> */}
						</div>
					</div>
				) : (
					<VideoPlayer
						url={data.media}
						thumbnail={data.video_cover}
						date={data?.created_at}
						views={data.views}
					/>
				)}

				{/* <SocialMediaShear title={data.title} /> */}

				<div
					className={styles['media-body']}
					dangerouslySetInnerHTML={{ __html: data.description }}
				/>

				<Ads adSlot={'3687349906'} />
			</div>
		</>
	);
};
