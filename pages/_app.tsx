import "bootstrap/dist/css/bootstrap.css";
// import "react-datepicker/dist/react-datepicker.css";
import "../styles/globals.css";
import "../pages/_tos-and-privacy.scss";
import "../styles/HousingIndustry.scss";
import "../styles/BenefitsSection.scss";
import "../styles/modal.scss";
import "../styles/CustomersFeedback.scss";
import "../styles/OneStopShopSection.scss";
import "../styles/ContactUs.scss";
import "../styles/Footer.scss";
import "../styles/_header.scss";
import "../styles/Blogs.scss";
import "../styles/coming-soon.scss";
import "../styles/pricing.scss";
import "../styles/condominium.scss";
import "../styles/construction-companies.scss";
import "../styles/faqs.scss";
import "../styles/form.scss";
import "../styles/main.scss";
import "../styles/error404.scss";
import "../components/Hero/index.scss";
import "../components/MarketPlace/index.scss";
import "../components/BeAPartner/styles.scss";
import "../components/BenefitsSection/styles.scss";
import "../components/HousingIndustry/styles.scss";
import "../components/story/index.scss";
import "../components/ListingAndDescriptionDesktop/index.scss";
import "../components/Pricing/index.scss";
import "../components/BannerAndListing/index.scss";
import "../components/OurServices/index.scss";
import "../components/Testimonial/index.scss";
import "../components/Feeds/_feed-container.scss";
import "../components/Feeds/feed-details.scss";
import "../components/BlogDetails/index.scss";
import "../components/BusinessToolbox/index.scss";
import "../components/JoinNetwork/index.scss";
import "../components/teams/index.scss";
import "../components/ContactUsRenovate/styles.scss";
import "../components/CallToAction/_signupButton.scss";
import "../components/CallToAction/_loginButton.scss";
import "../components/Feeds/_feed-entry.scss";
import "../components/FormFooter/_FormFooter.scss";
import "../components/ImageAndText/index.scss";
import "../components/SaleTeam/index.scss";
import "../components/Input/_input.scss";
import "../components/RenovateHero/index.scss";
import "../components/RenovationCalcGrid/_renovation-calc-grid.scss";
import "../components/Text/index.scss";
import "../components/TierPlans/index.scss";
import "../components/Accordian/index.scss";
import "../components/ChatWithUs/ChatWithUs.scss";
// import "../components/HelpCenter/HelpCenter.scss";
import "../components/VideoTutorial/style.scss";
import "../components/ScheduleForm/ScheduleForm.scss";
import "../components/FAQ/Faq.scss";
import "../styles/HelpCenter.scss";
import "../components/Pagination/pagination.scss";
import "../components/StartWithSearch/style.scss";
import "../components/Banner/styles.scss";
import "../components/CustomersFeedback/styles.scss";
import "../components/Questionnaire/index.scss";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Script from "next/script";
import axios from "axios";
import { getPagePath, setUiLanguage } from "../utils/localization";
import { Spinner } from "react-bootstrap";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import AppContext from "../AppContext";

// import axios from 'axios'

export default function App({ Component, pageProps }: AppProps) {
  const [featuredImage, setfeaturedImage] = useState<any>();
  const [attachment, setattachment] = useState<any>();
  const [initialRenderComplete, setInitialRenderComplete] =
    useState<boolean>(false);
  const [ip, setIP] = useState<any>("");

  // console.log("ip=>",ip);
  // console.log("dataaaa", featuredImage);

  const getData = async () => {
    if (!ip) {
      const res = await axios.get("https://geolocation-db.com/json/");
      // console.log(res.data);
      setIP(res.data);
    }
  };

  const setLanguage = () => {
    if (ip.country_name === "Finland") {
      setUiLanguage("finnish");
    } else if (ip.country_name === "Spain") {
      setUiLanguage("spanish");
    } else {
      setUiLanguage("english");
    }
  };

  useEffect(() => {
    setInitialRenderComplete(true);
    getData();
    setLanguage();
  }, []);
  useEffect(() => {
    setLanguage();
  }, [ip]);

  if (!initialRenderComplete) return <></>;

  return (
    <>
      <Script
        strategy="lazyOnload"
        async
        src="https://embed.tawk.to/633d355a37898912e96cf4e1/1gejhgqes"
      />
      <AppContext.Provider
        value={{
          state: {
            featuredImage: featuredImage,
            attachment: attachment,
          },
          setfeaturedImage: setfeaturedImage,
          setattachment: setattachment,
        }}
      >
        <Component {...pageProps} ip={ip} />
      </AppContext.Provider>

      {/* <Layout>
          <Seo
            title="Coming Soon – Proppu"
            description="Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
            thumbnail={null}
            type="website"
            url={getPagePath()}
            noindex={true}
          />
          <div className="d-flex justify-content-center">
            <Spinner className="mt-5" animation="grow" />
          </div>
        </Layout> */}
    </>
  );
}
