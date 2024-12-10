import { Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import styles from './MediaDescriptionLoader.module.css'
import imageEmpty from "src/assets/images/Twist//image.png"


const MediaDescriptionLoader = () => {
  return (
    <div className={styles['Emptycard']}>
      <Col>
        <Skeleton className={`${styles['skelton']} mb-3`}></Skeleton>

        <div className={`${styles['empty']} ${styles['empty-main']}`}>
          <div className={styles['img-empty']}>
            <img src={imageEmpty} alt="" />
          </div>
          <div className={styles['all-skelton']}>
            <Skeleton className={styles['skelton']} width={"50%"}></Skeleton>
            <Skeleton className={styles['skelton']}></Skeleton>
          </div>

        </div>
        <div className={styles['text-loader']}>
          <Skeleton className={styles['skelton']} width={"50%"}></Skeleton>
          <Skeleton className={styles['skelton']}></Skeleton>
          <Skeleton className={styles['skelton']}></Skeleton>
          <Skeleton className={styles['skelton']}></Skeleton>
          <Skeleton className={styles['skelton']}></Skeleton>
          <Skeleton className={styles['skelton']}></Skeleton>
        </div>
      </Col>
    </div>
  )
}

export default MediaDescriptionLoader
