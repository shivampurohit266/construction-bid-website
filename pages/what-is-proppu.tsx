import * as React from "react";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Text from "../components/Text";
import { ContactSales } from "../components/ContactSales/ContactSales";
import SaleTeam from "../components/SaleTeam/index";
import heroImage from "../images/bannerLogo.png";
import macImage from "../images/iMac-psd.png";
import Team1Image from "../images/team1.png";
import Team2Image from "../images/team2.png";
import Team3Image from "../images/team3.png";
import Team4Image from "../images/team4.png";
import Team5Image from "../images/sukhi.png";
import Team6Image from "../images/nishant.png";
import Team7Image from "../images/andy.png";
import Team8Image from "../images/otto.png";

// import '../styles/what-is-proppu.scss'
import Hero from "../components/Hero";
import Story from "../components/story";
import Teams from "../components/teams";
import Image from "next/image";

//
// import HomeHero from "../components/Homehero";
// import HousingIndustry from "../components/HousingIndustry";
// import refineCeiling from "../images/pexels-tima-miroshnichenko.png";
// import BenefitsSection from "../components/BenefitsSection";
// import CustomersFeedback from "../components/CustomersFeedback/CustomersFeedback";
// import BeAPartner from "../components/BeAPartner";
// import OneStopShopSection from "../components/OneStopShopSection/OneStopShopSection";

// after
// import { useEffect, useReducer, useState } from "react";
// import { reducer } from "../components/Modal/reducer";
// import MyModal from "../components/Modal/Modal";
// import { useRouter } from "next/router";
// import { origin, proppuUrl, WP_GENERIC_BASE_URL } from "../utils/constant";
// import * as Yup from "yup";
// import axios from "axios";
import ContactUs from "../components/ContactUs";

// const defaultState = {
//   isModalOpen: false,
//   modalContent: "",
//   status: false,
// };

const ConstructionCompaniesPage = (props: any) => {
  const [t, language] = useLocalization();
  // const [state, dispatch] = useReducer(reducer, defaultState);
  // const [status, setStatus] = useState(false);
  // const [show, setShow] = useState(false);

  const OUR_STORY = [
    {
      year: "2019",
      founded: t("pages.whatIsProppu.founded1"),
      description: t("pages.whatIsProppu.storyDescription1"),
    },
    {
      year: "2020",
      founded: t("pages.whatIsProppu.founded2"),
      description: t("pages.whatIsProppu.storyDescription2"),
    },
    {
      year: "2022",
      founded: t("pages.whatIsProppu.founded3"),
      description: t("pages.whatIsProppu.storyDescription3"),
    },
    {
      year: t("pages.whatIsProppu.year4"),
      founded: t("pages.whatIsProppu.founded4"),
      description: t("pages.whatIsProppu.storyDescription4"),
    },
  ];

  const OUR_TEAM = [
    {
      name: "Antti Salo",
      image: Team4Image,
      description: t("pages.whatIsProppu.team1description"),
      role: t("pages.whatIsProppu.team1Role"),
      linkedIn: "https://www.linkedin.com/in/antti-salo-72836554",
    },
    {
      name: "Noora Kuisma ",
      image: Team3Image,
      description: t("pages.whatIsProppu.team2description"),

      role: t("pages.whatIsProppu.team2Role"),
      linkedIn: "https://www.linkedin.com/in/noora-kuisma-b53602113",
    },
    {
      name: "Vili Weurlander",
      image: Team1Image,
      description: t("pages.whatIsProppu.team3description"),
      role: t("pages.whatIsProppu.team3Role"),
      linkedIn: "https://www.linkedin.com/in/vili-weurlander-b9a909175",
    },
    {
      name: "Helena Lindberg",
      image: Team2Image,
      description: t("pages.whatIsProppu.team4description"),

      role: t("pages.whatIsProppu.team4Role"),
      linkedIn: "https://www.linkedin.com/in/helena-lindberg-578875162",
    },
    {
      name: "Sukhdev",
      image: Team5Image,
      description: t("pages.whatIsProppu.team5description"),

      role: t("pages.whatIsProppu.team5Role"),
      linkedIn: "https://www.linkedin.com/in/sukhitalks",
    },
    {
      name: "Nishant Gupta",
      image: Team6Image,
      description: t("pages.whatIsProppu.team6description"),

      role: t("pages.whatIsProppu.team6Role"),
      linkedIn: "https://www.linkedin.com/in/nishant-gupta-7918184a",
    },
    {
      name: "Andriol Jaupaj",
      image: Team7Image,
      description: t("pages.whatIsProppu.team7description"),

      role: t("pages.whatIsProppu.team7Role"),
      linkedIn: "https://www.linkedin.com/in/andriol-jaupaj-web-dev",
    },
    {
      name: "Otto Tuomainen",
      image: Team8Image,
      description: t("pages.whatIsProppu.team8description"),

      role: t("pages.whatIsProppu.team8Role"),
      linkedIn: "https://www.linkedin.com/in/ottotuomainen",
    },
  ];

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (props?.ip?.country_name === "Finland" || origin !== proppuUrl) {
  //       setShow(true);
  //     }
  //   }, 2000);
  // }, []);
  // const router = useRouter();
  // // router.reload()
  // const closeModal = () => {
  //   dispatch({ type: "CLOSE_MODAL" });
  // };
  // const modalOne = (
  //   <div className="form__modal-box" style={{ textAlign: "center" }}>
  //     {state.isModalOpen && (
  //       <MyModal
  //         closeModal={closeModal}
  //         modalContent={
  //           language === "english"
  //             ? "Your request was submitted successfully!"
  //             : "Tarjouspyyntösi on julkaistu!"
  //         }
  //         status={true}
  //       />
  //     )}
  //   </div>
  // );

  // const DisplayingErrorMessagesSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email(t("footer.invalid-email"))
  //     .required(t("footer.required")),
  // });

  // const subscribe = async (data: any) => {
  //   // console.log(email,">>>>>>>>>");
  //   const subscriberData = new FormData();
  //   subscriberData.append(
  //     "email",
  //     data.email !== undefined ? data.email : data
  //   );
  //   const formUrl =
  //     WP_GENERIC_BASE_URL + "/contact-form-7/v1/contact-forms/2524/feedback";

  //   await axios
  //     .post(formUrl, subscriberData)
  //     .then((response) => {
  //       console.log(response);
  //       if (response?.data?.message) {
  //         setShow(false);
  //         window.scrollTo(0, 0);
  //         setStatus(true);
  //         dispatch({ type: "SUCCESS" });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <Layout>
      <Seo
        title={t("pages.whatIsProppu.meta.title", "What is Proppu – Proppu")}
        description={t(
          "pages.whatIsProppu.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        url={getPagePath()}
      />
      <main>
        {/*  */}

        {/* <HomeHero />
        <HousingIndustry image={refineCeiling} />
        <BenefitsSection
          country_name={props?.ip?.country_name}
          onSubmit={subscribe}
        />
        <CustomersFeedback />
        <BeAPartner />
        <OneStopShopSection /> */}
        {/*  */}

        <Hero
          img={heroImage}
          alt="3D illustration of Proppu logo"
          styleClass="mt-4 pt-5 bg-light-grey"
        >
          <h1>{t("pages.whatIsProppu.title", "A new way to renovate")}</h1>
          <p>
            {t(
              "pages.whatIsProppu.descriptionForTitle",
              "ProppU simplifies renovation projects by joining the people and processes involved"
            )}
          </p>
        </Hero>
        <Text style={{ textAlign: "center" }}>
          <h3>{t("pages.whatIsProppu.digitalToolsTitle")}</h3>
          <Image src={macImage} alt="macProppu" />
        </Text>

        <Story
          heading={t("pages.whatIsProppu.storyHeading")}
          story={OUR_STORY}
        />

        <Teams
          heading={t("pages.whatIsProppu.teamHeading")}
          description={t("pages.whatIsProppu.teamHeadingdescription")}
          team={OUR_TEAM}
        />
      </main>
      {/* <ContactUs /> */}
    </Layout>
  );
};

export default withPageLanguage(ConstructionCompaniesPage);
