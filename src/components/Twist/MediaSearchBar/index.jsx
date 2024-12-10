import styles from './index.module.css';
import mediaSearchIcon from 'src/assets/images/Twist/media-search-icon.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function MediaSearchBar({
	setSearchValue,
	dir = 'ltr',
	isOpenFromMedia,
	setIsOpenFromMedia,
}) {
	const { pathname } = useLocation();

	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		if (pathname === '/news' || pathname === '/videos') {
			return setIsOpenFromMedia((prev) => !prev);
		}
		setIsOpen((prev) => !prev);
	};

	return (
		<div
			style={{ direction: dir }}
			className={`${styles['media-search-bar']} ${
				isOpen || isOpenFromMedia ? styles['opend'] : styles['closed']
			}`}>
			<label>
				<img
					loading='lazy'
					src={mediaSearchIcon}
					alt='Search icon for the search bar'
					onClick={() => handleClick()}
					style={{ height: '32px', width: '32px' }}
				/>
				<input
					type='search'
					maxLength={50}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</label>
		</div>
	);
}

MediaSearchBar.propTypes = {
	setSearchValue: PropTypes.func,
	dir: PropTypes.string,
	isOpenFromMedia: PropTypes.bool,
	setIsOpenFromMedia: PropTypes.func,
};
export default MediaSearchBar;
