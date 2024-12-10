import styles from './index.module.css'
import MediaSection from 'src/components/Twist/shared/MediaSection/index'
import { useContext, useState } from 'react'
import { sharedComponentsContext } from 'src/context/shared-context'
import { getRouteInfo } from 'src/utils/globalFn'
import { useLocation, useParams } from 'react-router'

function AhlyVideosTab() {

    const { pathname } = useLocation();
    const { id } = useParams();
    const { serviceId, sportId } = getRouteInfo(pathname)
    const { seasonInfo: { appActiveSeason } } = useContext(sharedComponentsContext)
    const horizontal = true

    return (
        <div className={styles["ahly-videos"]}>
            <h1></h1>

            <MediaSection
                season_id={appActiveSeason.id}
                type={2}
                service_id={serviceId}
                sport_id={sportId}
                items_count={16}
                isPlayBtn={true}
                columnsNum={horizontal ? 4 : 1}
                gridColumn='1/span 3'
                showTitle={false}
                horizontal={horizontal}
                onDemand={false}
                team_id={id}
            />
        </div>
    )
}

export default AhlyVideosTab