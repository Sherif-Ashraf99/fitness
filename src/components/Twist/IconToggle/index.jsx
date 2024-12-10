import PropTypes from 'prop-types';

function IconToggle({ boolean, falseIcon, trueIcon }) {
    const icons = { false: falseIcon, true: trueIcon };

    return (
        <img
            src={icons[boolean]['src'] || ''}
            width={icons[boolean]['width'] || 25}
            height={icons[boolean]['height'] || 25}
            alt={icons[boolean]['alt'] || 'icon'} />
    )
}

IconToggle.propTypes = {
    boolean: PropTypes.bool,
    falseIcon: PropTypes.object,
    trueIcon: PropTypes.object
}

export default IconToggle