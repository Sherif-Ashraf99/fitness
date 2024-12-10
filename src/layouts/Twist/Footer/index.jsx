import { Col, Container, Row } from 'react-bootstrap';
import styles from './index.module.css';
import twistlogo from 'src/assets/images/Twist/twist-logo.svg';
import { SocialIcon } from 'react-social-icons';
import 'react-social-icons/facebook';
import 'react-social-icons/instagram';
import 'react-social-icons/tiktok';
import 'react-social-icons/youtube';
import { Link } from 'react-router-dom';
import { Children } from 'react';
function Footer() {
	const footerLinks = [
		// { title: "من نحن", url: "#" },
		// { title: "سياسة الخصوصية", url: "#" },
		// { title: "خدمات نقدمها", url: "#" },
		{ title: 'الشروط والأحكام', url: '/privacy' },
		{ title: 'أخبار', url: '/news' },
		{ title: 'أبطال أوروبا', url: '/international/tournament/817/overview' },
		// { title: "مقارنات", url: "/comparisons" },
	];

	const socialMediaLinks = [
		{
			name: 'facebook',
			link: 'https://www.facebook.com/twistsports.mena',
		},
		{
			name: 'instagram',
			link: 'https://www.instagram.com/twistsports.mena',
		},
		{
			name: 'tiktok',
			link: 'https://www.tiktok.com/@twistsports.mena',
		},

		{
			name: 'youtube',
			link: 'https://www.youtube.com/@twist-sports',
		},
	];

	return (
		<>
			<footer className={`${styles['footer']}`}>
				<Container className='px-5 py-4'>
					<Row
						className={`${styles['footer-top-half']} d-flex justify-content-center`}>
						<Col
							lg={12}
							className='d-flex flex-column align-items-center align-items-lg-start'>
							<img
								src={twistlogo}
								alt='Twist Logo'
								className='mb-3'
								style={{ height: '60px', width: 'auto' }}
								loading='lazy'
							/>
							<p>
								{
									'تويست سبورتس هي خدمة النتائج المباشرة والأخبار الحية التي تُقدم لملايين المتابعين في مختلف أنحاء العالم، حيث تشمل التغطية النتائج المباشرة لأهم البطولات في العالم مثل كأس العالم ودوري أبطال أوروبا وإفريقيا والدوري الإنجليزي والإسباني والمصري وغيرها، وكذلك أبرز الأخبار والحصريات الخاصة بالكرة المصرية، بالإضافة إلى الرياضات الأخرى وعلى رأسها التنس والاسكواش.'
								}
							</p>
						</Col>
						{/* <Col lg={5} className='d-flex flex-column justify-content-center align-items-center'>
                        <h3 className='mb-3'>{"الحصول على التجربة الكاملة"}</h3>
                        <div className={`${styles["footer-appstores-btns"]}`}>
                            <a href="#" >
                                <img src={AppStore} className='m-2' width={150} height={50} alt='download at app store' />
                            </a>
                            <a href="#" >
                                <img src={GooglePlay} className='m-2' width={150} height={50} alt='download at google store' />
                            </a>
                        </div>

                    </Col> */}
					</Row>

					<hr className={`${styles['footer-hr']}`} />

					<Row
						className={`${styles['footer-bottom-half']} d-flex justify-content-center`}>
						<Col
							lg={7}
							className='d-flex flex-column align-items-center align-items-lg-start'>
							<ul
								className={`${styles['footer-links']} w-100 d-flex align-items-center justify-content-between gap-1`}>
								{footerLinks.map((link, i) => (
									<Link to={link.url} key={i}>
										<li>{link.title}</li>
									</Link>
								))}
							</ul>
							{/* <ul className='d-flex flex-wrap w-100  align-items-center'>
                            {
                                footerLinks.map((link, i) => (
                                    i > 3 &&
                                    <a href={link.url} key={i}>
                                        <li>{link.title}</li>
                                    </a>
                                ))
                            }
                        </ul> */}
						</Col>

						<Col
							lg={5}
							className={`${styles['social-media']} d-flex flex-column align-items-center justify-content-center`}>
							<h5 className='text-center mb-3'>{'تابعونا'}</h5>
							<div className={styles['icons-wraper']}>
								{Children.toArray(
									socialMediaLinks.map(({ name, link }) => (
										<SocialIcon url={link} network={name} />
									)),
								)}
							</div>
						</Col>
					</Row>
				</Container>
			</footer>
		</>
	);
}

export default Footer;
