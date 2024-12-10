import { Link, useNavigate } from "react-router-dom"
import MediaCard from "../MediaCard"
import styles from './index.module.css'
import { BsChevronLeft } from 'react-icons/bs'
import { useQuery } from "@tanstack/react-query"
import apis from "src/services/Fitness"
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn"

const apiFn = () => apis.tips.getTips()
const apiGetFavFn = (params) => apis.user.getFavourites(params)

const OurTips = () => {
    const navigate = useNavigate()
    const userPhoneNumber = getUserPhoneNumnberFromCookies("fitness")

    const {data,isLoading} = useQuery({
    queryKey: ["home-tips"],
    queryFn : () => apiFn(),
    select : (data) => data?.data
})

const {data : dataFav, isLoading : isLoadingFav ,refetch} = useQuery({
    queryKey : ["Get-favourite-fitness"],
    queryFn : () => apiGetFavFn({
        msisdn : userPhoneNumber,
    }),
    select : (data) =>  data?.advices
})


const sliceData = data?.slice(0,6)

const isInclude = (data = [],myFav = []) => {
    const myFavId = myFav?.map((obj) => obj.id)
    const dataWithIncludesProperty = data?.map((obj) => 
    myFavId?.includes(obj.id) ? {...obj, include : true} : {...obj, include : false}
    )

    const sortByInclude = dataWithIncludesProperty.sort((a,b) => b.include - a.include)

    return sortByInclude
}

    
    return <>
        {!isLoading && !isLoadingFav && <div className={`${styles['our-tips']}`}>
            <div className={`d-flex justify-content-between`}>
                <h3>نصائحنا</h3>
                <Link to={'/fitness/ali-tips'} className={`${styles['watch-all-link']}`}>
                    مشاهدة الكل
                    <BsChevronLeft strokeWidth={2} />
                </Link>
            </div>
            <div className={`${styles['cards-container']} `}>
                
                {isInclude(sliceData,dataFav)?.map((item) => 
                <div className={styles["media-wrapper"]} onClick={() => navigate(`/fitness/media/tips/${item?.id}`)} key={item.id}>
                <MediaCard  item={item}  type={"advice"}  refetch={refetch} />
                </div>
                )}
               
            </div>
        </div>}
        </>
}


export default OurTips
