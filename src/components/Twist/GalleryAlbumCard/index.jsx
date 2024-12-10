import styles from './index.module.css'
import { ImgURL } from 'src/utils/globalFn'
import { MdOutlineCalendarToday } from "react-icons/md"
import { convertFullDate } from 'src/utils/globalFn'

function GalleryAlbumCard({ albumData }) {
    return (
        <div className={styles["album-card"]}>
            <div>
                <div>
                    <img src={ImgURL(albumData.image)} alt={albumData.name} />
                </div>
                <h3>{albumData.name}</h3>
            </div>
            <div>
                <MdOutlineCalendarToday />
                <p>{convertFullDate(albumData.created_at)}</p>
            </div>
        </div>
    )
}

export default GalleryAlbumCard