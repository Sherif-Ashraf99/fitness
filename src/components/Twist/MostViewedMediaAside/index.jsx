import styles from './index.module.css'
import { useQuery } from '@tanstack/react-query'
import apis from 'src/services/Twist'
import { getServiceAndSportRoute } from "src/utils/globalFn";
import { useNavigate } from 'react-router';

const apiFn = (params) => apis.media.getMediaList(params)

const MostViewedMediaAside = () => {

    const navigate = useNavigate()

    const handleOnCardClick = (item) => {
        navigate(`${getServiceAndSportRoute(item.services[0], item.sport_id)}media/${item.id}`)
    };

    const initialParams = {
        items_count: 4,
        top_stories: true,
    }

    const { data, isLoading, isError } = useQuery({
        queryKey: ["most-viewed-media-aside"],
        queryFn: () => apiFn(initialParams)
    })


    if (isLoading) return <div>Loading...</div>

    if (isError) return <></>

    return (
        <div className={styles['all-MostViewed']}>
            <h3>الأكثر مشاهدة</h3>
            <div className={styles['most-view']}>
                {data.data.map((item, index) => (
                    <div
                        key={item.id}
                        className={styles['most-view-item']}
                        onClick={() => handleOnCardClick(item)}
                    >
                        <div className={styles['content']}>
                            {item.title}
                        </div>
                        <h6>{index + 1}</h6>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default MostViewedMediaAside

