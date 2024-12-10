import styles from './index.module.css';
import player1 from 'src/assets/images/Twist/shenawy-1.png';
import player2 from 'src/assets/images/Twist/hamdy-8.png';
import player3 from 'src/assets/images/Twist/maaloul-21.png';
import player4 from 'src/assets/images/Twist/solia-17.png';
import player5 from 'src/assets/images/Twist/afsha-19.png';
import player6 from 'src/assets/images/Twist/ayman-12.png';
import player7 from 'src/assets/images/Twist/dieng-15.png';
import Slider from 'react-slick';

const arrPlayer = [
	{
		name: 'محمد الشناوي',
		NumOfShirt: 1,
		img: player1,
		position: 'حارس مرمى',
	},
	{
		name: 'حمدي فتحي',
		NumOfShirt: 8,
		img: player2,
		position: ' لاعب وسط',
	},
	{
		name: 'علي معلول',
		NumOfShirt: 21,
		img: player3,
		position: 'مدافع',
	},
	{
		name: 'عمرو السولية',
		NumOfShirt: 17,
		img: player4,
		position: ' لاعب وسط',
	},
	{
		name: 'مجدي أفشة',
		NumOfShirt: 19,
		img: player5,
		position: 'لاعب وسط',
	},
	{
		name: 'أيمن أشرف',
		NumOfShirt: 12,
		img: player6,
		position: 'مدافع',
	},
	{
		name: 'ديانج',
		NumOfShirt: 15,
		img: player7,
		position: ' لاعب وسط',
	},
	{
		name: 'محمد الشناوي',
		NumOfShirt: 1,
		img: player1,
		position: 'حارس مرمى',
	},
	{
		name: 'حمدي فتحي',
		NumOfShirt: 8,
		img: player2,
		position: ' لاعب وسط',
	},
	{
		name: 'علي معلول',
		NumOfShirt: 21,
		img: player3,
		position: 'مدافع',
	},
	{
		name: 'عمرو السولية',
		NumOfShirt: 17,
		img: player4,
		position: ' لاعب وسط',
	},
	{
		name: 'مجدي أفشة',
		NumOfShirt: 19,
		img: player5,
		position: 'لاعب وسط',
	},
	{
		name: 'أيمن أشرف',
		NumOfShirt: 12,
		img: player6,
		position: 'مدافع',
	},
	{
		name: 'ديانج',
		NumOfShirt: 15,
		img: player7,
		position: ' لاعب وسط',
	},
];

function BestPlayers() {
	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '1rem',
		slidesToShow: 7,
		speed: 400,
		nextArrow: <span></span>,
		prevArrow: <span></span>,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className={styles['BestPlayers']}>
			<div className={styles['Players']}>
				<h2>الفريق الأول لكرة القدم</h2>
				<Slider {...settings}>
					{arrPlayer.map((player, index) => (
						<div key={index} className={`${styles['superstar']}`}>
							<div>
								<img src={player.img} alt='Player image' />
							</div>
							<h3>{player.name}</h3>
							<h6>{player.position}</h6>
							<span>{player.NumOfShirt}</span>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}

export default BestPlayers;
