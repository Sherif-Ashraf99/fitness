import styles from './index.module.css'
import MediaCard from 'src/components/Fitness/MediaCard'
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from 'src/components/Shared/Subscription/SubscribeBtn';
import apis from 'src/services/Fitness'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { getUserPhoneNumnberFromCookies } from 'src/utils/globalFn';
import LoadMore from 'src/components/Twist/shared/LoadMore';

const apiFn = (param) => apis.tips.getTips(param)

const apiGetFavFn = (params) => apis.user.getFavourites(params)

const AliTipsPage = () => {
    
    const userPhoneNumber = getUserPhoneNumnberFromCookies("fitness")
    const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService('fitness')
    if (!isSubscripedInTheServie) return <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
    const navigate = useNavigate()


    const {data : myFavArr, isLoading : isLoadingFav ,refetch} = useQuery({
        queryKey : ["Get-favourite-fitness"],
        queryFn : () => apiGetFavFn({
            msisdn : userPhoneNumber,
        }),
        select : (data) =>  data?.advices
    })

 const {data, fetchNextPage,isFetchingNextPage,isLoading : isLoadingNextPage} = useInfiniteQuery({
    queryKey : ["mazhar-tips",],
    queryFn : ({pageParam = 1 }) => apiFn({ page : pageParam}),
    getNextPageParam : (_lastPage,pages) => {
        if (pages.at(-1).current_page === pages.at(-1).last_page) return undefined;
        return pages.at(-1).current_page + 1;
    },
    select : (data) => { 
    const allPagesArr =  data.pages.map((e) => e.data).flat()
    return allPagesArr
    } 
 })

    const isInclude = (data,myFav) => {
        const myFavId = myFav?.map((obj) => obj.id)
        const dataWithIncludesProperty = data?.map((obj) => 
        myFavId?.includes(obj.id) ? {...obj, include : true} : {...obj, include : false})
    
        const sortByInclude = dataWithIncludesProperty?.sort((a,b) => b.include - a.include)
        return sortByInclude

    }
    


    if(isLoadingNextPage || isLoadingFav) return <h3>loading...</h3>

    return (
        <div className={styles['ali-tips-page']}>
            <h1>{"نصائح على مظهر"}</h1>

            <div className={styles['cards-container']}>
                { 
                isInclude(data,myFavArr)?.map((item) => (
                            <div
                                key={item?.id}
                                className={styles['card-wrapper']}
                                onClick={() => navigate(`/fitness/media/tips/${item?.id}`)}
                            >
                                <MediaCard horizontal={true} isVideo={true} item={item} type={"advice"}  refetch={refetch}/>
                            </div>
                        ))
                    
                }
            </div>
         <LoadMore isLoading={isFetchingNextPage} fetchNextPage={fetchNextPage} />
        </div>

    )
}

export default AliTipsPage
