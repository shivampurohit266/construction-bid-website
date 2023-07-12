import * as React from "react";
import Layout from "../components/Layout";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import Seo from "../components/Seo";
import helpcenterbanner from "../images/helpcenter_banner.png";

// import { Button, Container, Form } from "react-bootstrap";
import StartWithSearch from "../components/StartWithSearch";
import ScheduleForm from "../components/ScheduleForm/ScheduleForm";
import Accordian from "../components/Accordian";
import { Container } from "react-bootstrap";
import ChatWithUs from "../components/ChatWithUs/ChatWithUs";
import VideoTutorial from "../components/VideoTutorial/VideoTutorial";
import BannerAndListing from "../components/BannerAndListing";
// import { Container } from "react-bootstrap";
// import BannerAndListing from "../components/BannerAndListing";
// import HelpCenter from "../components/HelpCenter";
// import * as CSS from "./_tos-and-privacy.module.scss";

const HelpCenter = () => {
  // const [t] = useLocalization();
  const [t, language] = useLocalization();

  return (
    <Layout>
      <Seo
        title={t("pages.privacy.meta.title", "Privacy statement – Proppu")}
        description={t(
          "pages.privacy.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        url={getPagePath()}
      />
      <div className="help_wrapper_main">
        <div className="help_center_banner">
          <BannerAndListing
            heading="Need any help? Just ask"
            image={helpcenterbanner}
            className="mt-4 pt-5 p-5 bg-banner-helpcenter"
          />
        </div>

        <StartWithSearch />
        <ScheduleForm />
        <VideoTutorial />
        {/* <Faq /> */}
        <Accordian
          title="Most frequently asked question"
          className="help_center_accordian"
        />
        <Container>
          <div className="technical_support">
            <div className="technical_support_title">
              <h5>
                In case of any technical difficulties, <br /> please contact our
                customer support at
              </h5>
            </div>
            <div className="technical_link">
              <a href="mailto:info@proppu.com">info@proppu.com</a>
            </div>
          </div>
        </Container>
        <ChatWithUs />
      </div>
    </Layout>
  );
};

export default withPageLanguage(HelpCenter);
