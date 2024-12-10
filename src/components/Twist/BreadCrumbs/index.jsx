import styles from './index.module.css'
import { AiFillHome } from 'react-icons/ai'
import Skeleton from "react-loading-skeleton";
import { useNavigate } from 'react-router';



function BreadCrumbs({ data, isLoading }) {

    const navigate = useNavigate()

    const hanedleOnSegmentClick = (segmentUrl) => {
        navigate(segmentUrl)
    }

    const constructBreadCrumbsSegments = () => {
        if (isLoading || Object.keys(data).length <= 0) return
        const homeSegment = ` الرئيسية `
        const newsSegment = ` / أخبار `
        const tournamentSegment = data.tournaments[0] ? ` /  ${data.tournaments[0]} ` : ""
        const mediaTitleSegment = data.title ? ` /  ${data.title} ` : ""

        const BreadCrumbsSegments = [
            { name: homeSegment, url: '/' },
            { name: newsSegment, url: '/news' },
            { name: tournamentSegment, url: '/tournamen' },
            { name: mediaTitleSegment, url: "" }
        ]
        return BreadCrumbsSegments
    }


    return (
        <div className={`${styles['bread-crumbs']} py-2`}>
            {
                isLoading
                    ? <Skeleton baseColor='var(--chinese-silver)' className={`${styles['skeleton']} w-75 py-1`} />
                    : <div className='d-flex align-items-center'>

                        {constructBreadCrumbsSegments()?.map((segment, index) => {
                            return (
                                segment.name &&
                                <div
                                    key={segment.name}
                                    className={`${styles['segment']} px-1 ${index == constructBreadCrumbsSegments().length - 1 && styles['active-segment']} `}
                                    onClick={() => index != constructBreadCrumbsSegments().length - 1 && hanedleOnSegmentClick(segment.url)}
                                >
                                    {segment.url == "/" && <AiFillHome />}
                                    {segment.name}
                                </div>
                            )
                        })}
                    </div>
            }
        </div>
    )
}

export default BreadCrumbs