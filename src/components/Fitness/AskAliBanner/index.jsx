import { Link } from 'react-router-dom'
import styles from './index.module.css'
import { BsChevronLeft } from 'react-icons/bs'

const AskAliBanner = () => {
    return (
        <div className={`${styles['ask-ali-banner']} d-flex flex-column justify-content-end`}>
            <h2>اسأل علي مظهر</h2>
            <Link to={'/fitness/ask-mazhar/question'}>
                اسأل الآن
                <BsChevronLeft strokeWidth={2} />
            </Link>
        </div>
    )
}

export default AskAliBanner
