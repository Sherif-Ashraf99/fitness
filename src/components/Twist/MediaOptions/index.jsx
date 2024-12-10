import styles from './index.module.css'
import SectionTitle from 'src/components/Twist/shared/SectionTitle'
import gridViewIcon from 'src/assets/images/Twist/gridview.png'
import listViewIcon from 'src/assets/images/Twist/listview.png'
import MediaSearchBar from 'src/components/Twist/MediaSearchBar'
import CustomDropdown from 'src/components/Twist/shared/CustomDropdown'
import useWindowSize from 'src/hooks/useWindowSize'
import { useState } from 'react'
import  PropTypes  from 'prop-types';

function MediaOptions({title,setSearchValue,setHorizontal,filterByPeriod,setFilterByPeriod,filterByViews,setFilterByViews}) {
    
    const [isOpenFromMedia, setIsOpenFromMedia] = useState(false)
    const {width} = useWindowSize();
    
    const filterByPeriodDropdown = [
        { name: "الكل", id: 0 },
        { name: "خلال اليوم", id: "day" },
        { name: "خلال الأسبوع", id: "week" },
        { name: "خلال الشهر", id: "month" },
    ]

    const filterByViewsDropdown = () => { 
        if( filterByPeriod.period.id === "week") return [ { name: "الأحدث", id: "latest" },]
       return  [
        { name: "الأحدث", id: "latest" },
        { name: "الأكثر قراءة", id: "popular" },
    ]
}
    
    const isOpenSearchInMobileView = () => {
        if(!isOpenFromMedia && width <= 575.98) return true
        if(isOpenFromMedia && width <= 575.98) return false
         return true
    }
 

    return <div className={`${styles['all-options']}`}>
            <SectionTitle title={title} />
            <div className={styles['media-options']}>

               
          {width >= 575.98 && 
          <MediaSearchBar
                    setSearchValue={setSearchValue}
                    isOpenFromMedia={isOpenFromMedia}
                    setIsOpenFromMedia={setIsOpenFromMedia}
                />} {/*web view */}

                <img className={styles['list']} src={listViewIcon} alt="" style={{ cursor: 'pointer' }} onClick={() => setHorizontal(false)} />
                <img className={styles['list']} src={gridViewIcon} alt="" style={{ cursor: 'pointer' }} onClick={() => setHorizontal(true)} />

              { isOpenSearchInMobileView() && <>
                <CustomDropdown
                    data={filterByPeriodDropdown}
                    dataID='id'
                    dataName='name'
                    name='period'
                    width='100%'
                    filters={filterByPeriod}
                    setFilters={setFilterByPeriod}
                />

                <CustomDropdown
                    data={filterByViewsDropdown()}
                    dataID='id'
                    dataName='name'
                    name='views'
                    width='100%'
                    filters={filterByViews}
                    setFilters={setFilterByViews}
                />
              </> }

              {width <= 575.98 && 
              <MediaSearchBar
                    setSearchValue={setSearchValue}
                    isOpenFromMedia={isOpenFromMedia}
                    setIsOpenFromMedia={setIsOpenFromMedia}
                />} {/*mobile view */}
            </div>
        </div>

    
}

MediaOptions.propTypes = {
    title: PropTypes.string,
    setSearchValue: PropTypes.func,
    setHorizontal: PropTypes.func,
    filterByPeriod: PropTypes.object,
    setFilterByPeriod: PropTypes.func,
    filterByViews: PropTypes.object,
    setFilterByViews: PropTypes.func,

  };
export default MediaOptions


