import { Children } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './LoadingTournamentsCarousel.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import Skeleton from "react-loading-skeleton";
import  PropTypes  from 'prop-types';

function LoadingTournamentsCarousel({dir}) {
  
const loadingSwiper =  [0,1,2,3,4,5,6,7,8]


    
    return <>
          <Swiper
                slidesPerView={8}
                navigation={true} 
                modules={[Navigation]}
                dir={dir()}
                breakpoints={{
                    1400: {
                        slidesPerView: 8,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                    1024: {
                        slidesPerView: 6,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                    767: {
                        slidesPerView: 4,
                    },
                    575: {
                        slidesPerView: 3,
                    },
                    320: {
                        slidesPerView: 1,
                    },

                }}
            >
{Children.toArray(loadingSwiper.map(()=><SwiperSlide style={{ padding: "20px" }}>
                        <div  className={styles['main-skelton']}>
                        <Skeleton className={`${styles['skelton-crc']}`}/> 
                        <h3><Skeleton  className={`${styles['skelton']}`}/> </h3>
                        </div>
            </SwiperSlide>
 ))}
                
            </Swiper>



</>
     
}
LoadingTournamentsCarousel.propTypes = {
    dir: PropTypes.func
}


export default LoadingTournamentsCarousel