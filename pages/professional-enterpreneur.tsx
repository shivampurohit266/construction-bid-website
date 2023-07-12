import React from "react";
import {
  getLanguagePrefix,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Text from "../components/Text";
import ContactUs from "../components/ContactUs";
import EnterpreneurImage from "../images/house-worker-with-mask.png";
import JoinNetwork from "../components/JoinNetwork";
import PUImage from "../images/pu.png";
import MPImage from "../images/marketplace.png";
import BTBImage from "../images/business-toolbox.png";
import Avatar from "../images/avtar.png";
import MarketPlace from "../components/MarketPlace";
import BusinessToolbox from "../components/BusinessToolbox";
import Pricing from "../components/Pricing";
import Testimonial from "../components/Testimonial";
// import OwlCarousel from "react-owl-carousel3";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const EntepreneursPage = () => {
  const [t] = useLocalization();
  const pricingPlans = [
    {
      title: t("pages.enterpreneur.tierPlan1.title"),
      price: t("pages.enterpreneur.tierPlan1.price"),
      users: t("pages.enterpreneur.tierPlan1.users"),
      benefits: [
        t("pages.enterpreneur.tierPlan1.benefits1"),
        t("pages.enterpreneur.tierPlan1.benefits2"),
        t("pages.enterpreneur.tierPlan1.benefits3"),
        t("pages.enterpreneur.tierPlan1.benefits4"),
        t("pages.enterpreneur.tierPlan1.benefits5"),
        t("pages.enterpreneur.tierPlan1.benefits6"),
        t("pages.enterpreneur.tierPlan1.benefits7"),
      ],
      buttonTitle: t("pages.enterpreneur.tierPlan1.buttonTitle"),
      recursive: t("pages.enterpreneur.tierPlan1.recursive"),
      extra: "",
    },
    {
      title: t("pages.enterpreneur.tierPlan2.title"),
      price: t("pages.enterpreneur.tierPlan2.price"),
      users: t("pages.enterpreneur.tierPlan2.users"),
      benefits: [
        t("pages.enterpreneur.tierPlan2.benefits1"),
        t("pages.enterpreneur.tierPlan2.benefits2"),
        t("pages.enterpreneur.tierPlan2.benefits3"),
        t("pages.enterpreneur.tierPlan2.benefits4"),
        t("pages.enterpreneur.tierPlan2.benefits5"),
        t("pages.enterpreneur.tierPlan2.benefits6"),
        t("pages.enterpreneur.tierPlan2.benefits7"),
        t("pages.enterpreneur.tierPlan2.benefits8"),
        t("pages.enterpreneur.tierPlan2.benefits9"),
      ],
      buttonTitle: t("pages.enterpreneur.tierPlan2.buttonTitle"),
      recursive: t("pages.enterpreneur.tierPlan2.recursive"),
      extra: t("pages.enterpreneur.tierPlan2.extra"),
    },
    {
      title: t("pages.enterpreneur.tierPlan3.title"),
      price: t("pages.enterpreneur.tierPlan3.price"),
      users: t("pages.enterpreneur.tierPlan3.users"),
      benefits: [
        t("pages.enterpreneur.tierPlan3.benefits1"),
        t("pages.enterpreneur.tierPlan3.benefits2"),
        t("pages.enterpreneur.tierPlan3.benefits3"),
        t("pages.enterpreneur.tierPlan3.benefits4"),
        ,
        t("pages.enterpreneur.tierPlan3.benefits5"),
        t("pages.enterpreneur.tierPlan3.benefits6"),
        t("pages.enterpreneur.tierPlan3.benefits7"),
        t("pages.enterpreneur.tierPlan3.benefits8"),
        t("pages.enterpreneur.tierPlan3.benefits9"),
      ],
      buttonTitle: t("pages.enterpreneur.tierPlan3.buttonTitle"),
      recursive: t("pages.enterpreneur.tierPlan3.recursive"),
      extra: t("pages.enterpreneur.tierPlan3.extra"),
    },
    {
      title: t("pages.enterpreneur.tierPlan4.title"),
      price: t("pages.enterpreneur.tierPlan4.price"),
      users: t("pages.enterpreneur.tierPlan4.users"),
      benefits: [
        t("pages.enterpreneur.tierPlan4.benefits1"),
        t("pages.enterpreneur.tierPlan4.benefits2"),
        t("pages.enterpreneur.tierPlan4.benefits3"),
        t("pages.enterpreneur.tierPlan4.benefits4"),
        ,
        t("pages.enterpreneur.tierPlan4.benefits5"),
        t("pages.enterpreneur.tierPlan4.benefits6"),
        t("pages.enterpreneur.tierPlan4.benefits7"),
        t("pages.enterpreneur.tierPlan4.benefits8"),
      ],
      buttonTitle: t("pages.enterpreneur.tierPlan4.buttonTitle"),
      recursive: t("pages.enterpreneur.tierPlan4.recursive"),
      extra: t("pages.enterpreneur.tierPlan4.extra"),
    },
  ];
  const feebacks = [
    {
      feedback: t("pages.enterpreneur.feedback1"),
      name: "Steve Irwin 1",
      designation: t("pages.enterpreneur.designation1"),
      image: Avatar,
    },
    {
      feedback: t("pages.enterpreneur.feedback1"),
      name: "Steve Irwin 2",
      designation: t("pages.enterpreneur.designation1"),
      image: Avatar,
    },
    {
      feedback: t("pages.enterpreneur.feedback1"),
      name: "Steve Irwin 3",
      designation: t("pages.enterpreneur.designation1"),
      image: Avatar,
    },
    {
      feedback: t("pages.enterpreneur.feedback1"),
      name: "Steve Irwin 4",
      designation: t("pages.enterpreneur.designation1"),
      image: Avatar,
    },
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
          // dots: true
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
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
        title={t("pages.enterpreneur.meta.title", "Entepreneurs – Proppu")}
        description={t(
          "pages.enterpreneur.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        url={getLanguagePrefix("/professional-enterpreneur/")}
      />
      <main>
        <Hero
          img={EnterpreneurImage}
          alt="Woodworker with a filtering face mask"
          styleClass="mt-4 pt-5 bg-light-purple"
        >
          <h1>{t("pages.enterpreneur.title")}</h1>
          <p>{t("pages.enterpreneur.descriptionForTitle")}</p>
          <Link href={getLanguagePrefix("/feed/")}>
            {t("pages.enterpreneur.buttonText")}
          </Link>
        </Hero>
        <JoinNetwork
          img={PUImage}
          alt={"pu image"}
          heading={t("pages.enterpreneur.workHeading")}
        >
          <ul>
            <li>{t("pages.enterpreneur.workList-1")}</li>
            <li>{t("pages.enterpreneur.workList-2")}</li>
            <li>{t("pages.enterpreneur.workList-3")}</li>
            <li>{t("pages.enterpreneur.workList-4")}</li>
          </ul>
        </JoinNetwork>
        <MarketPlace img={MPImage} alt="market image">
          <h2>{t("pages.enterpreneur.marketPlace")}</h2>
          <ul>
            <li>{t("pages.enterpreneur.marketPlace-1")}</li>
            <li>{t("pages.enterpreneur.marketPlace-2")}</li>
            <li>{t("pages.enterpreneur.marketPlace-3")}</li>
            <li>{t("pages.enterpreneur.marketPlace-4")}</li>
          </ul>
        </MarketPlace>
        <BusinessToolbox img={BTBImage} alt="business-toolbox image">
          <h2>{t("pages.enterpreneur.businessToolbox")}</h2>
          <ul>
            <li>{t("pages.enterpreneur.businessToolbox-1")}</li>
            <li>{t("pages.enterpreneur.businessToolbox-2")}</li>
            <li>{t("pages.enterpreneur.businessToolbox-3")}</li>
            <li>{t("pages.enterpreneur.businessToolbox-4")}</li>
            <li>{t("pages.enterpreneur.businessToolbox-5")}</li>
            <li>{t("pages.enterpreneur.businessToolbox-6")}</li>
          </ul>
        </BusinessToolbox>
        <Pricing
          heading={t("pages.enterpreneur.ourPricing")}
          styleClass="margin"
        >
          <div className="price-row">
            {pricingPlans.map((plan, index) => {
              return (
                <div key={index} className="price-list">
                  <h3>{plan.title}</h3>
                  <div className="price-lsit">
                    {/* <h4>{plan.price}</h4>
                                        <div className="per-month">{plan.users}</div> */}
                    <ul>
                      {plan.benefits.map((benefit, index) => {
                        return <li key={index}>{benefit}</li>;
                      })}
                    </ul>
                    <div className="ft-text">
                      <Link href={"/pricing"}>
                        {t(
                          "pages.materialSuppliers.tierPlan1.buttonCheckPrice"
                        )}
                      </Link>

                      {/* <p>{plan.recursive}</p> */}
                    </div>
                  </div>
                  {/* <div className="light-text">{plan.extra}</div> */}
                </div>
              );
            })}
          </div>
        </Pricing>
        {/* <Testimonial heading={t("pages.enterpreneur.testimonial")}>
                    <div className="banner-slider-area">
                        <Slider
                           {...settings}
                        >
                            {feebacks.map((feedback, index) => {
                                return (
                                    <div
                                        className="banner-item"
                                        style={{ backgroundColor: "#fff" }}
                                    >
                                        <div className="testimonial-block" key={index}>
                                            <p>{feedback.feedback}</p>
                                            <div className="avtar">
                                                <img src={feedback.image} alt="" />
                                                <div>
                                                    <div className="name">{feedback.name}</div>
                                                    <div className="client-des">
                                                        {feedback.designation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </Testimonial> */}
        <ContactUs />
      </main>
    </Layout>
  );
};

export default withPageLanguage(EntepreneursPage);
