import styles from './index.module.css'
import { FaChevronDown } from 'react-icons/fa'
import PropTypes from 'prop-types';
import Barloader from "react-spinners/BarLoader"
import { useLocation } from 'react-router-dom';

function LoadMore({ isLoading = true, fetchNextPage }) {

    const { pathname } = useLocation()
    const isAhlyPage = pathname.includes("/al-ahly")

    return (
        <button className={`${styles['load-more']} load-more-media`} disabled={isLoading} onClick={fetchNextPage}>
            {isLoading
                ? <Barloader className="my-2" color={isAhlyPage ? "var(--cool-red)" : "var(--light-green)"} height={8} width={150} />
                : <>
                    <span className='cpe-2'>عرض المزيد</span>
                    <FaChevronDown />
                </>
            }

        </button>
    )
}

LoadMore.propTypes = {
    isLoading: PropTypes.bool,
    fetchNextPage: PropTypes.func,
}
export default LoadMore