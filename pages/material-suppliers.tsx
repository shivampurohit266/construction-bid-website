import React from "react";
import {
  useLocalization,
  withPageLanguage,
  getPagePath,
  getLanguagePrefix,
} from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Text from "../components/Text";
import ImageAndText from "../components/ImageAndText";
import TierPlans, {
  PlanDescription,
  PlanTitles,
} from "../components/TierPlans";
import ContactUs from "../components/ContactUs";
import heroImage from "../images/material-hero.png";
import BusinessToolbox from "../components/BusinessToolbox";
import BTBImage from "../images/business-toolbox.png";
import BKImage from "../images/enter-andriod.png";
import BlurImage from "../images/marketplace_lowopacity.png";
import MarketPlace from "../components/MarketPlace";
import MPImage from "../images/marketplace.png";
import Pricing from "../components/Pricing";
import Testimonial from "../components/Testimonial";
import Link from "next/link";

const planTitles: PlanTitles = [
  "pages.materialSuppliers.tierPlan.basicTitle",
  "pages.materialSuppliers.tierPlan.premiumTitle",
];

const planDescription: PlanDescription = [
  ["pages.materialSuppliers.tierPlan.digitalTools", true, true],
  ["pages.materialSuppliers.tierPlan.accessMarketplace", true, true],
  ["pages.materialSuppliers.tierPlan.weRespondToClient", false, true],
  ["pages.materialSuppliers.tierPlan.additionalMarketing", false, true],
];

const MaterialSuppliersPage = () => {
  const [t] = useLocalization();
  const pricingPlans = [
    {
      title: t("pages.materialSuppliers.tierPlan1.title"),
      price: t("pages.materialSuppliers.tierPlan1.price"),
      users: t("pages.materialSuppliers.tierPlan1.users"),
      benefits: [
        t("pages.materialSuppliers.tierPlan1.benefits1"),
        t("pages.materialSuppliers.tierPlan1.benefits2"),
        t("pages.materialSuppliers.tierPlan1.benefits3"),
        t("pages.materialSuppliers.tierPlan1.benefits4"),
        t("pages.materialSuppliers.tierPlan1.benefits5"),
        t("pages.materialSuppliers.tierPlan1.benefits6"),
        t("pages.materialSuppliers.tierPlan1.benefits7"),
      ],
      buttonTitle: t("pages.materialSuppliers.tierPlan1.buttonTitle"),
      recursive: t("pages.materialSuppliers.tierPlan1.recursive"),
      extra: "",
    },
    {
      title: t("pages.materialSuppliers.tierPlan2.title"),
      price: t("pages.materialSuppliers.tierPlan2.price"),
      users: t("pages.materialSuppliers.tierPlan2.users"),
      benefits: [
        t("pages.materialSuppliers.tierPlan2.benefits1"),
        t("pages.materialSuppliers.tierPlan2.benefits2"),
        t("pages.materialSuppliers.tierPlan2.benefits3"),
        t("pages.materialSuppliers.tierPlan2.benefits4"),
        t("pages.materialSuppliers.tierPlan2.benefits5"),
        t("pages.materialSuppliers.tierPlan2.benefits6"),
        t("pages.materialSuppliers.tierPlan2.benefits7"),
        t("pages.materialSuppliers.tierPlan2.benefits8"),
        t("pages.materialSuppliers.tierPlan2.benefits9"),
      ],
      buttonTitle: t("pages.materialSuppliers.tierPlan2.buttonTitle"),
      recursive: t("pages.materialSuppliers.tierPlan2.recursive"),
      extra: t("pages.materialSuppliers.tierPlan2.extra"),
    },
    {
      title: t("pages.materialSuppliers.tierPlan3.title"),
      price: t("pages.materialSuppliers.tierPlan3.price"),
      users: t("pages.materialSuppliers.tierPlan3.users"),
      benefits: [
        t("pages.materialSuppliers.tierPlan3.benefits1"),
        t("pages.materialSuppliers.tierPlan3.benefits2"),
        t("pages.materialSuppliers.tierPlan3.benefits3"),
        t("pages.materialSuppliers.tierPlan3.benefits4"),
        ,
        t("pages.materialSuppliers.tierPlan3.benefits5"),
        t("pages.materialSuppliers.tierPlan3.benefits6"),
        t("pages.materialSuppliers.tierPlan3.benefits7"),
        t("pages.materialSuppliers.tierPlan3.benefits8"),
        t("pages.materialSuppliers.tierPlan3.benefits9"),
      ],
      buttonTitle: t("pages.materialSuppliers.tierPlan3.buttonTitle"),
      recursive: t("pages.materialSuppliers.tierPlan3.recursive"),
      extra: t("pages.materialSuppliers.tierPlan3.extra"),
    },
    {
      title: t("pages.materialSuppliers.tierPlan4.title"),
      price: t("pages.materialSuppliers.tierPlan4.price"),
      users: t("pages.materialSuppliers.tierPlan4.users"),
      benefits: [
        t("pages.materialSuppliers.tierPlan4.benefits1"),
        t("pages.materialSuppliers.tierPlan4.benefits2"),
        t("pages.materialSuppliers.tierPlan4.benefits3"),
        t("pages.materialSuppliers.tierPlan4.benefits4"),
        ,
        t("pages.materialSuppliers.tierPlan4.benefits5"),
        t("pages.materialSuppliers.tierPlan4.benefits6"),
        t("pages.materialSuppliers.tierPlan4.benefits7"),
        t("pages.materialSuppliers.tierPlan4.benefits8"),
      ],
      buttonTitle: t("pages.materialSuppliers.tierPlan4.buttonTitle"),
      recursive: t("pages.materialSuppliers.tierPlan4.recursive"),
      extra: t("pages.materialSuppliers.tierPlan4.extra"),
    },
  ];

  return (
    <Layout>
      <Seo
        title={t(
          "pages.materialSuppliers.meta.title",
          "Material Suppliers & Manufacturers – Proppu"
        )}
        description={t(
          "pages.materialSuppliers.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        url={getPagePath()}
      />
      <main>
        <Hero
          img={heroImage}
          alt="Newly modeled kitchen design"
          styleClass="mt-4 pt-5 bg-light-purple"
        >
          <h1>{t("pages.materialSuppliers.title")}</h1>
          <p>{t("pages.materialSuppliers.descriptionForTitle")}</p>
          <a
            className="button-purple button-video-icon"
            href="https://www.youtube.com/channel/UCjrTS-W6lypUst9Aql7Brvg"
            target="_blank"
          >
            {t("pages.materialSuppliers.howItWorks", "How it works")}
          </a>
        </Hero>

        <BusinessToolbox img={BKImage} alt="business-toolbox image">
          <h3>{t("pages.materialSuppliers.saleChannel1")}</h3>
          <h3>{t("pages.materialSuppliers.saleChannel2")}</h3>
        </BusinessToolbox>
        <Hero
          img={BlurImage}
          alt="Newly modeled kitchen design"
          styleClass="mt-4 pt-5 bg-blue"
        >
          <h1 className="text-white">
            {t("pages.materialSuppliers.marketTittle")}
          </h1>
          <p className="text-white">
            {t("pages.materialSuppliers.marketDescription")}
          </p>
          <Link
            className="button-transparent"
            href="https://youtube.com/channel/UCjrTS-W6lypUst9Aql7Brvg"
            target={"_blank"}
          >
            {t("pages.materialSuppliers.marketButtonText")}
          </Link>
        </Hero>
        <Testimonial heading={t("pages.materialSuppliers.webShopTittle")}>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-block" style={{ height: "150px" }}>
                <p>{t("pages.materialSuppliers.webShopblock1")}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="testimonial-block back-purple "
                style={{ height: "150px" }}
              >
                <p>{t("pages.materialSuppliers.webShopblock2")}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="testimonial-block bg-light-yellow"
                style={{ height: "150px" }}
              >
                <p>{t("pages.materialSuppliers.webShopblock3")}</p>
              </div>
            </div>
          </div>
        </Testimonial>
        <MarketPlace img={MPImage} alt="market image">
          <h2>{t("pages.materialSuppliers.marketPlace")}</h2>
          <ul>
            <li>{t("pages.materialSuppliers.marketPlace-1")}</li>
            <li>{t("pages.materialSuppliers.marketPlace-2")}</li>
            <li>{t("pages.materialSuppliers.marketPlace-3")}</li>
            <li>{t("pages.materialSuppliers.marketPlace-4")}</li>
          </ul>
        </MarketPlace>
        <BusinessToolbox img={BTBImage} alt="business-toolbox image">
          <h2>{t("pages.materialSuppliers.businessToolbox")}</h2>
          <ul>
            <li>{t("pages.materialSuppliers.businessToolbox-1")}</li>
            <li>{t("pages.materialSuppliers.businessToolbox-2")}</li>
            <li>{t("pages.materialSuppliers.businessToolbox-3")}</li>
            <li>{t("pages.materialSuppliers.businessToolbox-4")}</li>
            <li>{t("pages.materialSuppliers.businessToolbox-5")}</li>
            <li>{t("pages.materialSuppliers.businessToolbox-6")}</li>
          </ul>
        </BusinessToolbox>
        <Pricing
          heading={t("pages.materialSuppliers.ourPricing")}
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
        <ContactUs />
      </main>
    </Layout>
  );
};

export default withPageLanguage(MaterialSuppliersPage);
