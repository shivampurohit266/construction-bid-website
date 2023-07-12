import React, { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Pricing from "../components/Pricing";
// import "../styles/construction-companies.scss";
import MPImage from "../images/marketplace.png";
import BKimage from "../images/image-con.png";
import { isDesktop } from "react-device-detect";
import ContactUs from "../components/ContactUs";
import MarketPlace from "../components/MarketPlace";
import HousingIndustry from "../components/HousingIndustry";
import ConstructionCompanyImage from "../images/company-banner.png";
import {
  getLanguagePrefix,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import ListingAndDescriptionDesktop from "../components/ListingAndDescriptionDesktop";
import ListingAndDescriptionMobile from "../components/ListingAndDescriptionMobile";
import Link from "next/link";
import { useFetch } from "../utils/fetchData";
import { BASE_URL, origin, proppuUrl, proppuUrlFi } from "../utils/constant";

const ConstructionCompaniesPage = (props: any) => {
  const [t, language] = useLocalization();
  const [countryId, setCountryId] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<any>("Loading");

  const [loadingCountry, errorCountry, dataCountry] = useFetch(
    `${BASE_URL}/api/country/${
      language === "english" ? "en" : language === "finnish" ? "fi" : "es"
    }`,
    "GET",
    "body"
  );
  dataCountry?.data.map((country: any) => {
    if (country?.country_name === props.ip?.country_name && !countryId) {
      setCountryId(country.country_id);
    } else if ((origin === proppuUrl || origin === proppuUrlFi) && !countryId) {
      setCountryId(10000);
    } else if (!countryId) {
      setCountryId(72);
    }
  });

  const fetchData = () => {
    if (countryId) {
      fetch(
        `${BASE_URL}/api/price_packages/list/${countryId}/${
          language === "english" ? "en" : language === "finnish" ? "fi" : "es"
        }`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data.length >= 1) {
            setData(data.data[0]);
            setLoading("Data");
          } else {
            setLoading("No data");
          }
        });
    }
  };
  console.log(data, "dataaaa");
  useEffect(() => {
    fetchData();
  }, [countryId, language]);
  const ALL_IN_ONE_TOOL_DESKTOP = [
    {
      title: t("pages.constructionCompanies.allInOnelist1"),
      description: t("pages.constructionCompanies.allInOnelist1description"),
      background: "rgba(225, 220, 236, 0.48)",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist2"),
      description: t("pages.constructionCompanies.allInOnelist2description"),
      background: "#d6e0f2",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist3"),
      description: t("pages.constructionCompanies.allInOnelist3description"),
      background: "#e2dded",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist4"),
      description: t("pages.constructionCompanies.allInOnelist4description"),
      background: "#cbecf8",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist5"),
      description: t("pages.constructionCompanies.allInOnelist5description"),
      background: "#d3def1",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist6"),
      description: t("pages.constructionCompanies.allInOnelist6description"),
      background: "#e3eda4",
    },
  ];

  const ALL_IN_ONE_TOOL_MOBILE = [
    {
      title: t("pages.constructionCompanies.allInOnelist1"),
      description: t("pages.constructionCompanies.allInOnelist1description"),
      background: "rgba(225, 220, 236, 0.48)",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist2"),
      description: "",
      background: "#d6e0f2",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist3"),
      description: "",
      background: "#e2dded",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist4"),
      description: "",
      background: "#cbecf8",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist5"),
      description: "",
      background: "#d3def1",
    },
    {
      title: t("pages.constructionCompanies.allInOnelist6"),
      description: "",
      background: "#e3eda4",
    },
  ];

  const ALL_IN_ONE_TOOL_DESCRIPTION = [
    t("pages.constructionCompanies.allInOnelist1description"),
    t("pages.constructionCompanies.allInOnelist2description"),
    t("pages.constructionCompanies.allInOnelist3description"),
    t("pages.constructionCompanies.allInOnelist4description"),
    t("pages.constructionCompanies.allInOnelist5description"),
    t("pages.constructionCompanies.allInOnelist6description"),
  ];

  const pricingPlans = [
    {
      title: t("pages.constructionCompanies.tierPlan1.title"),
      price: t("pages.constructionCompanies.tierPlan1.price"),
      users: t("pages.constructionCompanies.tierPlan1.users"),
      benefits: [
        t("pages.constructionCompanies.tierPlan1.benefits1"),
        t("pages.constructionCompanies.tierPlan1.benefits2"),
        t("pages.constructionCompanies.tierPlan1.benefits3"),
        t("pages.constructionCompanies.tierPlan1.benefits4"),
        t("pages.constructionCompanies.tierPlan1.benefits5"),
        t("pages.constructionCompanies.tierPlan1.benefits6"),
        t("pages.constructionCompanies.tierPlan1.benefits7"),
      ],
      buttonTitle: t("pages.constructionCompanies.tierPlan1.buttonTitle"),
      recursive: t("pages.constructionCompanies.tierPlan1.recursive"),
      extra: "",
    },
    {
      title: t("pages.constructionCompanies.tierPlan2.title"),
      price: t("pages.constructionCompanies.tierPlan2.price"),
      users: t("pages.constructionCompanies.tierPlan2.users"),
      benefits: [
        t("pages.constructionCompanies.tierPlan2.benefits1"),
        t("pages.constructionCompanies.tierPlan2.benefits2"),
        t("pages.constructionCompanies.tierPlan2.benefits3"),
        t("pages.constructionCompanies.tierPlan2.benefits4"),
        t("pages.constructionCompanies.tierPlan2.benefits5"),
        t("pages.constructionCompanies.tierPlan2.benefits6"),
        t("pages.constructionCompanies.tierPlan2.benefits7"),
        t("pages.constructionCompanies.tierPlan2.benefits8"),
        t("pages.constructionCompanies.tierPlan2.benefits9"),
      ],
      buttonTitle: t("pages.constructionCompanies.tierPlan2.buttonTitle"),
      recursive: t("pages.constructionCompanies.tierPlan2.recursive"),
      extra: t("pages.constructionCompanies.tierPlan2.extra"),
    },
    {
      title: t("pages.constructionCompanies.tierPlan3.title"),
      price: t("pages.constructionCompanies.tierPlan3.price"),
      users: t("pages.constructionCompanies.tierPlan3.users"),
      benefits: [
        t("pages.constructionCompanies.tierPlan3.benefits1"),
        t("pages.constructionCompanies.tierPlan3.benefits2"),
        t("pages.constructionCompanies.tierPlan3.benefits3"),
        t("pages.constructionCompanies.tierPlan3.benefits4"),
        ,
        t("pages.constructionCompanies.tierPlan3.benefits5"),
        t("pages.constructionCompanies.tierPlan3.benefits6"),
        t("pages.constructionCompanies.tierPlan3.benefits7"),
        t("pages.constructionCompanies.tierPlan3.benefits8"),
        t("pages.constructionCompanies.tierPlan3.benefits9"),
      ],
      buttonTitle: t("pages.constructionCompanies.tierPlan3.buttonTitle"),
      recursive: t("pages.constructionCompanies.tierPlan3.recursive"),
      extra: t("pages.constructionCompanies.tierPlan3.extra"),
    },
    {
      title: t("pages.constructionCompanies.tierPlan4.title"),
      price: t("pages.constructionCompanies.tierPlan4.price"),
      users: t("pages.constructionCompanies.tierPlan4.users"),
      benefits: [
        t("pages.constructionCompanies.tierPlan4.benefits1"),
        t("pages.constructionCompanies.tierPlan4.benefits2"),
        t("pages.constructionCompanies.tierPlan4.benefits3"),
        t("pages.constructionCompanies.tierPlan4.benefits4"),
        ,
        t("pages.constructionCompanies.tierPlan4.benefits5"),
        t("pages.constructionCompanies.tierPlan4.benefits6"),
        t("pages.constructionCompanies.tierPlan4.benefits7"),
        t("pages.constructionCompanies.tierPlan4.benefits8"),
      ],
      buttonTitle: t("pages.constructionCompanies.tierPlan4.buttonTitle"),
      recursive: t("pages.constructionCompanies.tierPlan4.recursive"),
      extra: t("pages.constructionCompanies.tierPlan4.extra"),
    },
  ];

  const list = [
    "1 " + t("pages.constructionCompanies.howItWorks1"),
    "2 " + t("pages.constructionCompanies.howItWorks2"),
    "3 " + t("pages.constructionCompanies.howItWorks3"),
    "4 " + t("pages.constructionCompanies.howItWorks4"),
    "5 " + t("pages.constructionCompanies.howItWorks5"),
    "6 " + t("pages.constructionCompanies.howItWorks6"),
  ];

  return (
    <Layout>
      <Seo
        title={t(
          "pages.constructionCompanies.meta.title",
          "Construction Companies – Proppu"
        )}
        description={t(
          "pages.constructionCompanies.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getLanguagePrefix("/construction-companies/")}
      />
      <main>
        <Hero
          img={ConstructionCompanyImage}
          alt="Roof construction at high altitude"
          styleClass="mt-4 pt-5 pb-5 bg-light-grey"
        >
          <h1>{t("pages.constructionCompanies.title")}</h1>
          <p>{t("pages.constructionCompanies.descriptionForTitle")}</p>
          <Link
            className="button-video-icon"
            href="https://www.youtube.com/shorts/bLhwxh6mSPg"
            target={"_blank"}
          >
            {t("pages.constructionCompanies.howItWorksButton")}
          </Link>
        </Hero>

        <section className="ProppU">
          <div className="container">
            <div className="sm-container">
              <p>{t("pages.constructionCompanies.proppuService")}</p>
            </div>
          </div>
        </section>

        <MarketPlace
          img={MPImage}
          alt="market image"
          heading={t("pages.constructionCompanies.description")}
          headingDescription={t(
            "pages.constructionCompanies.whatIsProppuDescription"
          )}
        >
          <h2>{t("pages.constructionCompanies.marketPlace")}</h2>
          <ul>
            <li>{t("pages.constructionCompanies.marketPlace1")}</li>
            <li>{t("pages.constructionCompanies.marketPlace2")}</li>
            <li>{t("pages.constructionCompanies.marketPlace3")}</li>
            <li>{t("pages.constructionCompanies.marketPlace4")}</li>
          </ul>
        </MarketPlace>

        {isDesktop && (
          <ListingAndDescriptionDesktop
            heading={t("pages.constructionCompanies.allInOneHeading")}
            description={t("pages.constructionCompanies.allInOneDescription")}
            listItems={ALL_IN_ONE_TOOL_DESKTOP}
          />
        )}

        {!isDesktop && (
          <ListingAndDescriptionMobile
            heading={t("pages.constructionCompanies.allInOneHeading")}
            listItems={ALL_IN_ONE_TOOL_MOBILE}
            listDescription={ALL_IN_ONE_TOOL_DESCRIPTION}
          />
        )}

        <HousingIndustry list={list} image={BKimage} />

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

        <ContactUs />
      </main>
    </Layout>
  );
};

export default withPageLanguage(ConstructionCompaniesPage);
