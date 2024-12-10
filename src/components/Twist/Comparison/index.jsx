import comparisonIcon from 'src/assets/images/Twist/comparison-icon.png';
import SectionTitle from '../shared/SectionTitle';
import styles from './index.module.css';
import { Link } from 'react-router-dom';

function Comparison({ fullWidth, height = '' }) {
	const showComparison = false;
	return (
		<>
			{showComparison && (
				<section className={styles['comparison']}>
					<SectionTitle title='مقارنات' />
					<div className={styles['comparison-wrapper']}>
						<div
							className={styles['comparison-img']}
							style={{ height: height }}>
							<p
								className={`${styles['comparison-desc']} ${
									fullWidth ? styles['home-p'] : ''
								}`}>
								مقارنة تويست سبورتس هي أداة تتيح لك إنشاء مقارنات إحصائية بين
								اللاعبين والفرق المتنافسة في كل الدوريات المتاحة والمواسم
								المختلفة وفقا لقاعدة بيانات تتسع لأكثر من 3500 فريقا و81 ألف
								لاعبا في كرة القدم.
							</p>
						</div>
						<Link
							to='/comparisons'
							className={`${styles['comparison-link']} ${
								fullWidth ? styles['home-btn'] : ''
							}`}>
							<img loading='lazy' src={comparisonIcon} alt='Comparison icon' />
							<span>ابدأ المقارنة</span>
						</Link>
					</div>
				</section>
			)}
		</>
	);
}

export default Comparison;
