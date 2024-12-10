import Skeleton from 'react-loading-skeleton'
import styles from './index.module.css'
import PropTypes from 'prop-types'

function TwistMatchHeader() {
    return (
        <div className={styles['twist-match-header']}>
            {[...Array(2).keys()].map(key => (
                <div key={key}>
                    <div>
                        <Skeleton circle />
                        <Skeleton />
                    </div>
                    <Skeleton />
                </div>
            ))}
        </div>
    )
}

TwistMatchHeader.propTypes = {}

export default TwistMatchHeader
