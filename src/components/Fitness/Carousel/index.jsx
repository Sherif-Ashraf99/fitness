import styles from './index.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselCard from "../CarouselCard";
import homeWorkoutIcon from "src/assets/images/Fitness/homeWorkoutIcon.png"
import gymWorkoutIcon from "src/assets/images/Fitness/gymWorkoutIcon.png"
import muscleWorkoutIcon from "src/assets/images/Fitness/musclesWorkoutIcon.svg"
import mealsPlanIcon from "src/assets/images/Fitness/mealsPlanIcon.svg"
import mealsPlanIcon2 from "src/assets/images/Fitness/mealsPlanIcon.png"


const Carousel = () => {

    const dummyData = [
        {
            title: "تمارين بالمنزل",
            text: "دهون أقل",
            icon: homeWorkoutIcon,
            link: "/fitness/home-workout",
            linkText: "تمارين بالمنزل",
        },
        {
            title: "تمارين الجيم",
            text: "دهون أقل",
            icon: gymWorkoutIcon,
            link: "/fitness/gym-workout",
            linkText: "تمارين الجيم",
        },

       




        // {
        //     title: "المزيد من العضلات",
        //     text: "دهون أقل",
        //     icon: muscleWorkoutIcon,
        //     link: "/fitness/personal-workout",
        //     linkText: "المزيد من العضلات",
        // },
        // {
        //     title: "1200 cal اليوم",
        //     text: "دهون أقل",
        //     icon: mealsPlanIcon2,
        //     link: "/fitness/personal-nutrition",
        //     linkText: "تحقق من النظام الغذائي المناسب",
        // },
    ]

    const settings = {
        dots: false,
        infinite: false,
        lazyLoad: true,
        speed: 1200,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        customPaging: () => <div className={`${styles['matches-carousel-dots']}`}><span></span></div>,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className={`${styles['fitness-carousel']}`}>
            <h3>مهام اليوم</h3>
            <Slider {...settings}>
                {
                    dummyData?.map((obj) => <CarouselCard key={obj.title} data={obj} />)
                }
            </Slider>
        </div>
    )
}

export default Carousel
