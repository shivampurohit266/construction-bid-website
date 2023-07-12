import React from "react";
import Feedbackimg1 from "../../images/feedback1.png";
import Feedbackimg2 from "../../images/feedback2.png";
import Feedbackimg3 from "../../images/feedback3.png";
// import "./styles.scss";
import rightArrow from "../../images/right-arrow-angle-svgrepo-com.svg";
import leftArrow2 from "../../images/left-arrow-angle-svgrepo-com.svg";
import { useLocalization } from "../../utils/localization";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
function CustomersFeedback() {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        // arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };
    const [t, language] = useLocalization();

    const [index, setIndex] = React.useState(0);
    const nextImg = () => {
        if (index !== reviews.length - 1) {
            setIndex(index + 1);
        } else setIndex(0);
    };

    const prevImg = () => {
        if (index !== 0) {
            setIndex(index - 1);
        } else setIndex(reviews.length - 1);
    };

    const reviews = [
        {
            description: t("pages.index.feedback1"),
            customer: t("pages.index.customer1"),
            imgSrc: Feedbackimg1,
        },
        {
            description: t("pages.index.feedback2"),
            customer: t("pages.index.customer2"),
            imgSrc: Feedbackimg2,
        },
        {
            description: t("pages.index.feedback3"),
            customer: t("pages.index.customer3"),
            imgSrc: Feedbackimg3,
        },
    ];

    const Carousel = () => {
        let li:any = [];
        reviews && reviews.forEach((img, index) => li.push(index));

        return (
            <ol className="carousel_indicators">
                {li.map((slide:any, i:any) => {
                    return (
                        <li
                            key={i}
                            className={index === slide ? "active" : ""}
                            value={i}
                            onClick={(e:any) => setIndex(e.target.value)}
                        >
                            {slide}
                        </li>
                    );
                })}
            </ol>
        );
    };

    return (
        <div className="img_container">
            {/* <Carousel />
            <img src={leftArrow2} className="left_arrow" onClick={() => prevImg()}/>
            <img src={rightArrow} className="right_arrow" onClick={() => nextImg()}/> */}
            <Slider {...settings}>
                {reviews.map((item, index) => {
                    return (
                        <div key={index} className="feedback__section-container">
                            <div className="feedback__section-left">
                                <div className="feedback__section-header">
                                    {t("pages.index.customerFeedback")}
                                </div>
                                <div className="feedback__section-body">{item.description}</div>
                                <div className="feedback__section-footer"> - {item.customer}</div>
                            </div>

                            <div className="feedback__section-right">
                                <Image
                                    src={item.imgSrc}
                                    className="imageStyle"
                                    alt="frontview of restaurant"
                                />
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default CustomersFeedback;
