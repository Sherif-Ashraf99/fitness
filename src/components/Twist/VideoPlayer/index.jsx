import ReactPlayer from 'react-player'
import { ImgURL, convertFullDate } from 'src/utils/globalFn'
import styles from './index.module.css'
import playBtnIcon from "src/assets/images/Twist/PlayBTN.png"
import viewsIcon from "src/assets/images/Twist/ViewsIcon.svg"
import CreatedAtIcon from "src/assets/images/Twist/Icon feather-clock.svg"

export const VideoPlayer = ({ url, thumbnail, date, views }) => {

    const playIconElement = <img className={styles["play-icon"]} src={playBtnIcon} width={40} alt='play' />
    const thumbnailElement = <>
        <img className={styles["video-thumbnail"]} src={ImgURL(thumbnail)} alt='Thumbnail' />
        <div className={`${styles["media-info"]} p-2 d-flex justify-content-between`}>
            <span>
                <img className='px-1' src={CreatedAtIcon} alt={`Created at ${convertFullDate(date)}`} />
                {convertFullDate(date)}
            </span>

            {/* <span>
                {views}
                <img className='px-1' src={viewsIcon} alt={`Views ${views}`} />
            </span> */}
        </div>
    </>
    return (
        <div className={`${styles['video-player-wrapper']}`}>
            <ReactPlayer
                light={thumbnailElement}
                height="100%"
                width="100%"
                playIcon={playIconElement}
                controls={true}
                url={ImgURL(url)}
                config={{
                    file: {
                        attributes: {
                            controlsList: "nodownload",
                        },
                    },
                }}
            />
        </div>
    )
}
