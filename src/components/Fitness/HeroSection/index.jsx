import styles from './index.module.css'
import { Col, Row } from "react-bootstrap"

const HeroSection = () => {
    return (
        <section className={styles["hero-section"]}>
            <Row>
                <Col>
                    <h1>{`تويست فيتنس`}</h1>
                    <p>{`تابع نظامك الغذائي، و ممارسة التمارين، و الوصول الى أهداف اللياقة البدينة الخاصة بك`}</p>
                </Col>
                <Col>
                    <button>
                        {`انتقل الى الملف الشخصي`}
                    </button>
                </Col>
            </Row>
        </section>
    )
}

export default HeroSection
