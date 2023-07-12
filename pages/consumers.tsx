import React from "react";
import {
  getLanguagePrefix,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import ContactUs from "../components/ContactUs";
import { getPagePath } from "../utils/localization";
import heroImage from "../images/consumer-hero.png";
import ListingAndDescriptionDesktop from "../components/ListingAndDescriptionDesktop";
import ListingAndDescriptionMobile from "../components/ListingAndDescriptionMobile";
import Testimonial from "../components/Testimonial";
import { isDesktop } from "react-device-detect";
import imgFeedback1 from "../images/gfeedback1.png";
import imgFeedback2 from "../images/gfeedback2.png";
import imgFeedback3 from "../images/gfeedback3.png";
import imgFeedback4 from "../images/gfeedback4.png";
import reno2 from "../images/cond_img2.png";
import reno3 from "../images/cond_img3.png";
import reno4 from "../images/cond_img4.png";
import reno1 from "../images/cond_img1.png";
import OurServices from "../components/OurServices";
import RunImage from "../images/run.png";
import BannerAndListing from "../components/BannerAndListing";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../utils/constant";

const ConsumersPage = () => {
  const [t] = useLocalization();

  const LIST_DESKTOP = [
    {
      title: t("pages.consumers.howItWorkslist1"),
      description: t("pages.consumers.howItWorkslist1description"),
      background: "rgba(225, 220, 236, 0.48)",
      button: [
        {
          buttonText: t("pages.consumers.getEstimate"),
          buttonURL: getLanguagePrefix("/renovationcalculator"),
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist2"),
      description: t("pages.consumers.howItWorkslist2description"),
      background: "#d6e0f2",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext2"),
          buttonURL: "/consumers/#contact-us",
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist3"),
      description: t("pages.consumers.howItWorkslist3description"),
      background: "#e2dded",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext3"),
          buttonURL: getLanguagePrefix("/feed/?idx=2"),
        },
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext3-2"),
          buttonURL: getLanguagePrefix("/renovate-request-offer-1"),
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist4"),
      description: t("pages.consumers.howItWorkslist4description"),
      background: "#cbecf8",
      button: [],
    },
    {
      title: t("pages.consumers.howItWorkslist5"),
      description: t("pages.consumers.howItWorkslist5description"),
      background: "#d3def1",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext5"),
          buttonURL:
          `${BASE_URL_LOGIN_SIGNUP}/register`
        },
      ],
    },
  ];

  const LIST_MOBILE = [
    {
      title: t("pages.consumers.howItWorkslist1"),
      description: t("pages.consumers.howItWorkslist1description"),
      background: "rgba(225, 220, 236, 0.48)",
      button: [
        {
          buttonText: t("pages.consumers.getEstimate"),
          buttonURL: getLanguagePrefix("/renovationcalculator"),
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist2"),
      description: "",
      background: "#d6e0f2",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext2"),
          buttonURL: "/consumers/#contact-us",
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist3"),
      description: "",
      background: "#e2dded",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext3"),
          buttonURL: getLanguagePrefix("/feed"),
        },
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext3-2"),
          buttonURL: getLanguagePrefix("/renovate-request-offer-1"),
        },
      ],
    },
    {
      title: t("pages.consumers.howItWorkslist4"),
      description: "",
      background: "#cbecf8",
      button: [],
    },
    {
      title: t("pages.consumers.howItWorkslist5"),
      description: "",
      background: "#d3def1",
      button: [
        {
          buttonText: t("pages.consumers.howItWorkslistButtontext5"),
          buttonURL:
          `${BASE_URL_LOGIN_SIGNUP}/register`
        },
      ],
    },
  ];

  const LIST_MOBILE_DESCRIPTION = [
    t("pages.consumers.howItWorkslist1description"),
    t("pages.consumers.howItWorkslist2description"),
    t("pages.consumers.howItWorkslist3description"),
    t("pages.consumers.howItWorkslist4description"),
    t("pages.consumers.howItWorkslist5description"),
  ];

  const feebacks = [
    {
      feedback: t("pages.consumers.feedback1"),
      name: t("pages.consumers.feedback1Name"),
      designation: t("pages.consumers.designation1"),
      image: imgFeedback1,
    },
    {
      feedback: t("pages.consumers.feedback2"),
      name: t("pages.consumers.feedback2Name"),
      designation: t("pages.consumers.designation1"),
      image: imgFeedback2,
    },
    {
      feedback: t("pages.consumers.feedback3"),
      name: t("pages.consumers.feedback3Name"),
      designation: t("pages.consumers.designation1"),
      image: imgFeedback3,
    },
    {
      feedback: t("pages.consumers.feedback4"),
      name: t("pages.consumers.feedback4Name"),
      designation: t("pages.consumers.designation1"),
      image: imgFeedback4,
    },
  ];

  const OUR_SERVICES = [
    {
      tittle: t("pages.consumers.serviceHeading1"),
      description: t("pages.consumers.serviceHeading1Description"),
      image: reno1,
      buttonName: t("pages.consumers.serviceBtn1"),
      link: getLanguagePrefix("/renovationcalculator"),
    },
    {
      tittle: t("pages.consumers.serviceHeading2"),
      description: t("pages.consumers.serviceHeading2Description"),
      image: reno3,
      buttonName: t("pages.consumers.serviceBtn2"),
      link:
      `${BASE_URL_LOGIN_SIGNUP}/register`
    },
    {
      tittle: t("pages.consumers.serviceHeading3"),
      description: t("pages.consumers.serviceHeading3Description"),
      image: reno4,
      buttonName: t("pages.consumers.serviceBtn3"),
      link: "/consumers/#contact-us",
    },
    {
      tittle: t("pages.consumers.serviceHeading4"),
      description: t("pages.consumers.serviceHeading4Description"),
      image: reno2,
      buttonName: t("pages.consumers.serviceBtn4"),
      link: "https://remonttikauppa.proppu.com/",
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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
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
        title={t("pages.consumers.meta.title", "Consumers – Proppu")}
        description={t(
          "pages.consumers.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />
      <main>
        <Hero
          img={heroImage}
          alt="Mom and child painting a room"
          styleClass="mt-4 mb-5 bg-light-yellow"
        >
          <h1> {t("pages.consumers.title")}</h1>
          <p>{t("pages.consumers.description")}</p>
          <Link
            className="button-purple"
            href={getLanguagePrefix("/renovationcalculator")}
          >
            {t("pages.consumers.getEstimate")}
          </Link>
        </Hero>
        <OurServices
          heading={t("pages.consumers.servicesHeading")}
          servicesArray={OUR_SERVICES}
        />

        {isDesktop && (
          <ListingAndDescriptionDesktop
            heading={t("pages.consumers.howItWorks")}
            description={t("pages.consumers.howItWorkslist1description")}
            listItems={LIST_DESKTOP}
            counter={true}
            button={[
              {
                buttonText: t("pages.consumers.getEstimate"),
                buttonURL: getLanguagePrefix("/renovationcalculator"),
              },
            ]}
          />
        )}

        {!isDesktop && (
          <ListingAndDescriptionMobile
            heading={t("pages.consumers.howItWorks")}
            listItems={LIST_MOBILE}
            listDescription={LIST_MOBILE_DESCRIPTION}
            counter={true}
            button={[
              {
                buttonText: t("pages.consumers.getEstimate"),
                buttonURL: getLanguagePrefix("/renovationcalculator"),
              },
            ]}
          />
        )}

        <Testimonial heading={t("pages.consumers.testimonial")}>
          <div className="banner-slider-area">
            <Slider {...settings}>
              {feebacks.map((feedback, index) => {
                return (
                  <div
                    key={index}
                    className="banner-item"
                    style={{ background: "inherit" }}
                  >
                    <div className="testimonial-block">
                      <p
                        style={{
                          height: "420px",
                          display: "table-cell",
                          verticalAlign: "middle",
                          alignItems: "center",
                        }}
                      >
                        {feedback.feedback}
                      </p>
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
          heading={t("pages.consumers.BannerAndListingHeading")}
          description={t("pages.consumers.BannerAndListingdescription")}
          image={RunImage}
        >
          <ul>
            <li>{t("pages.consumers.BannerAndListing1")}</li>
            <li>{t("pages.consumers.BannerAndListing2")}</li>
            <li>{t("pages.consumers.BannerAndListing3")}</li>
            <li>{t("pages.consumers.BannerAndListing4")}</li>
            <li>{t("pages.consumers.BannerAndListing5")}</li>
            <li>{t("pages.consumers.BannerAndListing6")} </li>
          </ul>
          <Link
            className="button-purple"
            href={getLanguagePrefix("/renovationcalculator")}
          >
            {t("pages.consumers.BannerAndListingButton")}
          </Link>
        </BannerAndListing>
        <ContactUs />
      </main>
    </Layout>
  );
};

export default withPageLanguage(ConsumersPage);
