import styles from './index.module.css';
import { BiRun } from 'react-icons/bi';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const CarouselCard = ({ data }) => {
	return (
		<div className={`${styles['fitness-carousel-card']} p-4`}>
			<div className={`d-flex justify-content-around align-items-center`}>
				<div>
					<h3>{data.title}</h3>
					<p className={`text-end`}>{data.text}</p>
				</div>
				<img src={data.icon} alt='icon' />
			</div>
			<Link
				to={data.link}
				className={`d-flex justify-content-center align-items-center`}>
				<BsChevronLeft strokeWidth={2} />
				<p className={`m-0`}>{data.linkText}</p>
			</Link>
		</div>
	);
};

export default CarouselCard;
