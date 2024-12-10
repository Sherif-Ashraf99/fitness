import  propTypes  from 'react-bootstrap/esm/Image';
import styles from './Player.module.css'
import { CircularProgressbar } from "react-circular-progressbar";
import { ImgURL } from 'src/utils/globalFn';


const percentage = 41;

function Player({ data}) {
    
    if(data === undefined)  return <div className={styles['notFound']}>
     <h5>لا يوجد</h5>
    </div>


    return (
         <div className={styles['player']}>
         <div className={styles['team-player']}>
             <div className={styles['user']}>
                 <div className={styles['crc']}>
                     <img src={ImgURL(data?.image)} alt="" />
                 </div>
             </div>
             <h3>{data.name}</h3>
         </div>
         <div className={styles['progress']}>
             <div className={styles['rate']}>
                 <h6>النسبة</h6>
                 <div className={styles['crc-rate']}>
                     <CircularProgressbar value={percentage} strokeWidth={4} text={`% ${data.ratio} `} />
                 </div>
             </div>
             <div className={styles['rate']}>
                 <h6>أهداف</h6>
                 <div className={styles['crc-rate']}>
                     <CircularProgressbar value={percentage} strokeWidth={4} text={data.goals} />
                 </div>
             </div>
             <div className={styles['rate']}>
                 <h6>لعب</h6>
                 <div className={styles['crc-rate']}>
                     <CircularProgressbar value={percentage} strokeWidth={4} text={data.played} />
                 </div>
             </div>
         </div>
     </div>
    )
}

Player.propTypes = {
    data: propTypes.object,
}

export default Player