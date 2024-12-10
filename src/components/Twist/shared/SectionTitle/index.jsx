import styles from './index.module.css';
import PropTypes from 'prop-types';

function SectionTitle({ title}) {

    return (
        <div className={`${styles['section-title']} section-title`}>
            <h3 >{title}</h3>
        </div>
    )
}

SectionTitle.propTypes = {
    title: PropTypes.string,
}
export default SectionTitle