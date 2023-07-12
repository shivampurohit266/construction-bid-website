import * as React from "react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Text from "../components/Text";
import Layout from "../components/Layout";
import AboutUs from "../components/AboutUs";
import Team1Image from "../images/team1.png";
import Team2Image from "../images/team2.png";
import Team3Image from "../images/team3.png";
import Team4Image from "../images/team4.png";
import ContactUs from "../components/ContactUs";
import ContactUsImage from "../images/contact-banner1.png";
import SaleTeam from "../components/SaleTeam/index";

import { ContactSales } from "../components/ContactSales/ContactSales";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import { lang } from "moment";

const ContactUsPage = () => {
  const [t, language] = useLocalization();

  const OUR_SALE_TEAM_ARRAY = [
    {
      image: Team1Image,
      name: "Vili Weurlander",
      role: t("pages.contactUs.Team1Role"),
      email: t("pages.contactUs.Team1EmailLink"),
    },
    {
      image: Team2Image,
      name: "Helena Lindberg",
      role: t("pages.contactUs.Team2Role"),
      email: t("pages.contactUs.Team2EmailLink"),
    },
    {
      image: Team3Image,
      name: "Noora Kuisma",
      role: t("pages.contactUs.Team3Role"),
      email: t("pages.contactUs.Team3EmailLink"),
    },
    {
      image: Team4Image,
      name: "Antti Salo",
      role: t("pages.contactUs.Team4Role"),
      email: t("pages.contactUs.Team4EmailLink"),
    },
  ];

  return (
    <Layout>
      <Seo
        title={t("pages.contactUs.meta.title", "Contact Us – Proppu")}
        description={t(
          "pages.contactUs.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />
      <main>
        <Hero
          img={ContactUsImage}
          alt="Sidewalk that says passion led us here"
          styleClass="mt-4 pt-5 bg-light-grey"
        >
          <h1>{t("pages.contactUs.Title")}</h1>
          <p>{t("pages.contactUs.descriptionForTitle")}</p>
        </Hero>
        <SaleTeam teamSale={OUR_SALE_TEAM_ARRAY}>
          <div className="who-we-are">
            <h2>{t("pages.contactUs.TeamSaleFirstSectionHeadng")}</h2>
            <p className="lrg-text">
              {t("pages.contactUs.TeamSaleFirstSectionText1")}
            </p>
            <p className="lrg-text">
              {t("pages.contactUs.TeamSaleFirstSectionText2")}
            </p>
          </div>
        </SaleTeam>
        <ContactUs />
      </main>
    </Layout>
  );
};

export default withPageLanguage(ContactUsPage);
