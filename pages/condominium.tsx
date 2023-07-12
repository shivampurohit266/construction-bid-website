import * as React from "react";
import {
    getLanguagePrefix,
    getPagePath,
    useLocalization,
    withPageLanguage,
} from "../utils/localization";
// import "../styles/condominium.scss";
import Seo from "../components/Seo";
import Text from "../components/Text";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import reno2 from "../images/cond_img2.png";
import reno3 from "../images/cond_img3.png";
import reno4 from "../images/cond_img4.png";
import reno1 from "../images/cond_img1.png";
import RunImage from "../images/run.png";
import imgFeedback1 from "../images/gfeedback1.png";
import imgFeedback2 from "../images/gfeedback2.png";
import imgFeedback3 from "../images/gfeedback3.png";
import imgFeedback4 from "../images/gfeedback4.png";
import imgCondominium from "../static/images/for-condominiums.png";
import { isDesktop } from "react-device-detect";
import OurServices from "../components/OurServices";
import ContactUs from "../components/ContactUs";
import Testimonial from "../components/Testimonial";
import BannerAndListing from "../components/BannerAndListing";
import ListingAndDescriptionDesktop from "../components/ListingAndDescriptionDesktop";
import ListingAndDescriptionMobile from "../components/ListingAndDescriptionMobile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../utils/constant";

const CondominiumPage = () => {
    const [t] = useLocalization();


    const OUR_SERVICES = [
        {
            tittle: t("pages.condominium.serviceHeading1"),
            description: t("pages.condominium.serviceHeading1Description"),
            image: reno1,
            buttonName: t("pages.condominium.serviceBtn1"),
            link: getLanguagePrefix("/renovationcalculator"),
        },
        {
            tittle: t("pages.condominium.serviceHeading2"),
            description: t("pages.condominium.serviceHeading2Description"),
            image: reno3,
            buttonName: t("pages.condominium.serviceBtn2"),
            link: `${BASE_URL_LOGIN_SIGNUP}/register`,
        },
        {
            tittle: t("pages.condominium.serviceHeading3"),
            description: t("pages.condominium.serviceHeading3Description"),
            image: reno4,
            buttonName: t("pages.condominium.serviceBtn3"),
            link: "/condominium/#contact-us",
        },
        {
            tittle: t("pages.condominium.serviceHeading4"),
            description: t("pages.condominium.serviceHeading4Description"),
            image: reno2,
            buttonName: t("pages.condominium.serviceBtn4"),
            link: "https://remonttikauppa.proppu.com/",
        },
    ];

    const feebacks = [
        {
            feedback: t("pages.condominium.feedback1"),
            name: t("pages.condominium.feedback1Name"),
            designation: t("pages.condominium.designation1"),
            image: imgFeedback1,
        },
        {
            feedback: t("pages.condominium.feedback2"),
            name: t("pages.condominium.feedback2Name"),
            designation: t("pages.condominium.designation1"),
            image: imgFeedback2,
        },
        {
            feedback: t("pages.condominium.feedback3"),
            name: t("pages.condominium.feedback3Name"),
            designation: t("pages.condominium.designation1"),
            image: imgFeedback3,
        },
        {
            feedback: t("pages.condominium.feedback4"),
            name: t("pages.condominium.feedback4Name"),
            designation: t("pages.condominium.designation1"),
            image: imgFeedback4,
        },
    ];

    const LIST_DESKTOP = [
        {
            title: t("pages.condominium.howItWorkslist1"),
            description: t("pages.condominium.howItWorkslist1description"),
            background: "rgba(225, 220, 236, 0.48)",
        },
        {
            title: t("pages.condominium.howItWorkslist2"),
            description: t("pages.condominium.howItWorkslist2description"),
            background: "#d6e0f2",
        },
        {
            title: t("pages.condominium.howItWorkslist3"),
            description: t("pages.condominium.howItWorkslist3description"),
            background: "#e2dded",
        },
        {
            title: t("pages.condominium.howItWorkslist4"),
            description: t("pages.condominium.howItWorkslist4description"),
            background: "#cbecf8",
        },
        {
            title: t("pages.condominium.howItWorkslist5"),
            description: t("pages.condominium.howItWorkslist5description"),
            background: "#d3def1",
        },
    ];

    const LIST_MOBILE = [
        {
            title: t("pages.condominium.howItWorkslist1"),
            description: t("pages.condominium.howItWorkslist1description"),
            background: "rgba(225, 220, 236, 0.48)",
        },
        {
            title: t("pages.condominium.howItWorkslist2"),
            description: "",
            background: "#d6e0f2",
        },
        {
            title: t("pages.condominium.howItWorkslist3"),
            description: "",
            background: "#e2dded",
        },
        {
            title: t("pages.condominium.howItWorkslist4"),
            description: "",
            background: "#cbecf8",
        },
        {
            title: t("pages.condominium.howItWorkslist5"),
            description: "",
            background: "#d3def1",
        },
    ];

    const LIST_MOBILE_DESCRIPTION = [
        t("pages.condominium.howItWorkslist1description"),
        t("pages.condominium.howItWorkslist2description"),
        t("pages.condominium.howItWorkslist3description"),
        t("pages.condominium.howItWorkslist4description"),
        t("pages.condominium.howItWorkslist5description"),
    ];

    const settings = {
        // dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows:false,
                    infinite: true,
                    // dots: true
                },
            },
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
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

    return (
        <Layout>
            <Seo
                title={t("pages.condominium.meta.title", "Condominium – Proppu")}
                description={t(
                    "pages.condominium.meta.description",
                    "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
                )}
                url={getPagePath()}
            />
            <main>
                <Hero
                    img={imgCondominium}
                    alt="Laptop with statistics"
                    styleClass="mt-4 pt-5 bg-light-yellow"
                >
                    <h1>
                        {t(
                            "pages.condominium.title",
                            "Efficient and transparent condominium renovations"
                        )}
                    </h1>
                    <Link className="button-purple" href={getLanguagePrefix("/#contact-us")}>
                        {t("pages.condominium.contact-us-button", "Contact us")}
                    </Link>
                </Hero>

                <section className="we-help">
                    <div className="container">
                        <h2> {t("pages.condominium.WeHelptittle")}</h2>
                        <p>{t("pages.condominium.WeHelpDescription")}</p>
                        <p>{t("pages.condominium.WeHelpDescription2")}</p>
                    </div>
                </section>

                <OurServices
                    heading={t("pages.condominium.servicesHeading")}
                    servicesArray={OUR_SERVICES}
                />

                {isDesktop && (
                    <ListingAndDescriptionDesktop
                        heading={t("pages.condominium.howItWorks")}
                        description={t("pages.condominium.howItWorkslist1description")}
                        listItems={LIST_DESKTOP}
                    />
                )}

                {!isDesktop && (
                    <ListingAndDescriptionMobile
                        heading={t("pages.condominium.howItWorks")}
                        listItems={LIST_MOBILE}
                        listDescription={LIST_MOBILE_DESCRIPTION}
                    />
                )}

                <Testimonial heading={t("pages.condominium.testimonial")}>
                    <div className="banner-slider-area">
                        <Slider {...settings}>
                            {feebacks.map((feedback, index) => {
                               return (
                                <div className="banner-item" style={{ background: "inherit" }}>
                                    <div className="testimonial-block" key={index}>
                                        <p style={{height:'420px', display:"table-cell",verticalAlign:'middle', alignItems:'center'}}>{feedback.feedback}</p>
                                        <div className="avtar">
                                            <Image src={feedback.image} alt="" />
                                            <div>
                                                <div className="name">{feedback.name}</div>
                                                <div className="client-des">
                                                    {/* {feedback.designation} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            })}
                        </Slider>
                    </div>
                </Testimonial>
                <BannerAndListing
                    heading={t("pages.condominium.BannerAndListingHeading")}
                    description={t("pages.condominium.BannerAndListingdescription")}
                    image={RunImage}
                >
                    <ul>
                        <li>{t("pages.condominium.BannerAndListing1")}</li>
                        <li>{t("pages.condominium.BannerAndListing2")}</li>
                        <li>{t("pages.condominium.BannerAndListing3")}</li>
                        <li>{t("pages.condominium.BannerAndListing4")}</li>
                        <li>{t("pages.condominium.BannerAndListing5")}</li>
                        <li>{t("pages.condominium.BannerAndListing6")} </li>
                    </ul>
                    <Link
                        className="button-purple"
                        href={getLanguagePrefix("/renovationcalculator")}
                    >
                        {t("pages.condominium.BannerAndListingButton")}
                    </Link>
                </BannerAndListing>
                <ContactUs />
            </main>
        </Layout>
    );
};

export default withPageLanguage(CondominiumPage);
