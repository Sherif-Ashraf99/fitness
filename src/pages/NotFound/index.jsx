import styles from './index.module.css'
import warring from 'src/assets/images/Twist/warning.svg'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className={styles['not-found']}>
            <h2>حدث خطأ</h2>
            <img src={warring} alt="" />
            <Link to="/">العودة للصفحة الرئيسية</Link>
        </div>
    )
}

export default NotFound