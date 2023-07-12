import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BannerTextImg from "../components/BannerTextAndImage";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ListWithTile from "../components/LeftListRightTile";
import {
  getPagePath,
  useLocalization,
  getUiLanguage,
} from "../utils/localization";
import { useFetch } from "../utils/fetchData";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { english } from "../utils/locales/english";
import { BASE_URL, BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../utils/constant";

const Pricing = (props: any) => {
  const [t, language] = useLocalization();
  const [data, setData] = useState<any>({});
  const [countryId, setCountryId] = useState<any>(null);
  const [packageIdPro, setPackageIdPro] = useState<any>("");
  const [packageIdPremium, setPackageIdPremium] = useState<any>("");
  const [userType, setUserType] = useState<any>("");
  const [loading, setLoading] = useState<any>("Loading");
  // const [languageId,setLanguageId]= useState<any>(null);
  console.log("language", language, origin);
  const Appv2 = "https://appv2.proppu.com/register";
  const AppProppu = "https://app.proppu.com/register";

  const [loadingCountry, errorCountry, dataCountry] = useFetch(
    `${BASE_URL}/api/country/${
      language === "english" ? "en" : language === "finnish" ? "fi" : "es"
    }`,
    "GET",
    "body"
  );

  useEffect(() => {
    if (dataCountry) {
      const { data } = dataCountry;
      if (data && data.length) {
        const country = data.filter(
          (countryData: any) =>
            countryData?.country_name === props.ip?.country_name
        )[0];
        if (country) {
          setCountryId(country.country_id);
        }else if (origin !== proppuUrl) {
          setCountryId(72);
        }else{
          setCountryId(1000);
        }
      }
    }
  }, [dataCountry]);

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
  useEffect(() => {
    fetchData();
  }, [countryId, language]);

  return (
    <Layout>
      <Seo
        url={getPagePath()}
        title={t("pages.pricing.meta.title", "Pricing - Proppu")}
        description={t(
          "pages.pricing.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
      />

      {data.Starter && loading === "Data" ? (
        <main>
          <BannerTextImg />

          <div className="container">
            <section className="different-usage-package">
              <h2>
                {t("pages.pricing.title")}{" "}
                {/* Different usages, different packages */}
              </h2>
              <h5>{t("pages.pricing.allPlans")}</h5>
              <div className="tile--area">
                <div className="usage--tile">
                  <div className="tile--header">
                    {data.Starter && (
                      <>
                        <h3>{data?.Starter[0]?.package_title}</h3>
                        <p>{data?.Starter[0]?.package_sub_title}</p>
                      </>
                    )}
                  </div>
                  <div className="tile--content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Starter[0]?.package_text_before,
                      }}
                    ></div>
                    {/* <h4>
                      {t("pages.pricing.Free")}
                    </h4>  */}
                    {/* {data.Starter && (
                      <h6>
                        {t("pages.pricing.subtitle2")}
                        Upgrade at
                        {data?.Starter[0]?.package_price}€/
                        {t("pages.pricing.Month")} Month 
                      </h6>
                    )}
                    <p>
                      {t("pages.pricing.subtitle")}
                      With all Professional features 
                    </p> */}
                    <Link
                      className="tile-btn"
                      href={{
                        pathname:
                          `${BASE_URL_LOGIN_SIGNUP}/register`,
                        query: {
                          id: data?.Starter[0]?.id,
                          usertype: data?.Starter[0]?.usertype,
                          countryId: data?.Starter[0]?.package_country_id,
                          language:
                            language === "english"
                              ? "en"
                              : language === "finnish"
                              ? "fi"
                              : "es",
                        },
                      }}
                      target="_blank"
                    >
                      {t("pages.pricing.BuyNow")}
                    </Link>

                    <Link className="simple-link" href="#starter-list-tile">
                      {t("pages.pricing.knowMore")}
                    </Link>
                  </div>
                </div>

                {/* 2nd tile */}
                <div className="usage--tile">
                  <div className="tile--header">
                    {data?.Pro && (
                      <>
                        <h3>{data?.Pro[0]?.package_title}</h3>
                        <p>{data?.Pro[0]?.package_sub_title}</p>
                      </>
                    )}
                  </div>
                  <div className="tile--content">
                    {/* <div className="select_plan_box">
                      <div>Select your plan</div>
                      <div></div>
                      {data.Pro &&
                        data.Pro.map((price: any, idx: any) => (
                          <label key={idx}>
                            <input
                              type="radio"
                              checked={packageId === price.id}
                              onChange={() => {
                                setPackageId(price.id);
                              }}
                            ></input>
                            {price.package_price_terms_period === 1
                              ? "Month"
                              : "Year"}
                          </label>
                        ))}
                    </div> */}

                    <ul>
                      {data?.Pro &&
                        data.Pro.map((price: any, idx: any) => (
                          <li key={idx}>
                            <label key={idx}>
                              <input
                                type="radio"
                                checked={
                                  packageIdPro === price.id &&
                                  countryId === price.package_country_id
                                }
                                onChange={() => {
                                  setPackageIdPro(price.id);
                                  setUserType(price.usertype);
                                }}
                              ></input>{" "}
                              {price?.package_display_text}
                            </label>
                          </li>
                        ))}
                    </ul>
                    {
                      data?.Pro &&
                        (data?.Pro[1]?.id != packageIdPro ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.Pro[0]?.package_text_before,
                            }}
                          ></div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.Pro[0]?.package_text_after,
                            }}
                          ></div>
                        ))

                      // <p>
                      //   {data?.Pro[1]?.id != packageId ? (
                      //     <del>
                      //       {t("pages.pricing.Save")} €
                      //       {data?.Pro[0]?.package_price * 12 -
                      //         data?.Pro[1]?.package_price}{" "}
                      //       {t("pages.pricing.Annual")}
                      //     </del>
                      //   ) : (
                      //     <>
                      //       {t("pages.pricing.Save")} €
                      //       {data?.Pro[0]?.package_price * 12 -
                      //         data?.Pro[1]?.package_price}{" "}
                      //       {t("pages.pricing.Annual")}
                      //     </>
                      //   )}
                      // </p>
                    }
                    {/* <span>
                      {t("pages.pricing.transaction")} , 4% (
                      {t("pages.pricing.max")} 5000€)
                    </span> */}
                    <Link
                      className="tile-btn"
                      href={
                        packageIdPro
                          ? {
                              pathname:
                              `${BASE_URL_LOGIN_SIGNUP}/register`,
                              query: {
                                id: packageIdPro,
                                usertype: userType,
                                countryId: countryId,
                                language:
                                  language === "english"
                                    ? "en"
                                    : language === "finnish"
                                    ? "fi"
                                    : "es",
                              },
                            }
                          : "#"
                      }
                      target={packageIdPro && "_blank"}
                    >
                      {t("pages.pricing.BuyNow")}
                    </Link>

                    <Link className="simple-link" href="#pro-list-tile">
                      {t("pages.pricing.knowMore")}
                    </Link>
                  </div>
                </div>

                {/* 3rd tile */}
                <div className="usage--tile">
                  <div className="tile--header">
                    {data?.Premium && (
                      <>
                        <h3>{data?.Premium[0]?.package_title}</h3>
                        <p>{data?.Premium[0]?.package_sub_title}</p>
                      </>
                    )}
                  </div>
                  <div className="tile--content">
                    {/* <div className="select_plan_box">
                      <div>Select your plan</div>
                      <div></div>
                      {data.Premium &&
                        data.Premium.map((price: any, idx: any) => (
                          <label key={idx}>
                            <input
                              type="radio"
                              checked={packageId === price.id}
                              onChange={() => {
                                setPackageId(price.id);
                              }}
                            ></input>
                            {price.package_price_terms_period === 1
                              ? "Month"
                              : "Year"}
                          </label>
                        ))}
                    </div> */}
                    <ul>
                      {data?.Premium &&
                        data.Premium.map((price: any, idx: any) => (
                          <li key={idx}>
                            <label key={idx}>
                              <input
                                type="radio"
                                checked={
                                  packageIdPremium === price.id &&
                                  countryId === price.package_country_id
                                }
                                onChange={() => {
                                  setPackageIdPremium(price.id);
                                  setUserType(price.usertype);
                                }}
                              ></input>{" "}
                              {price?.package_display_text}
                            </label>
                          </li>
                        ))}
                    </ul>
                    {
                      data?.Premium &&
                        (data?.Premium[1]?.id != packageIdPremium ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.Premium[0]?.package_text_before,
                            }}
                          ></div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.Premium[0]?.package_text_after,
                            }}
                          ></div>
                        ))

                      // <p>
                      //   {data?.Premium[1]?.id != packageId ? (
                      //     <del>
                      //       {t("pages.pricing.Save")} €
                      //       {data?.Premium[0]?.package_price * 12 -
                      //         data?.Premium[1]?.package_price}{" "}
                      //       {t("pages.pricing.Annual")}
                      //     </del>
                      //   ) : (
                      //     <>
                      //       {t("pages.pricing.Save")} €
                      //       {data?.Premium[0]?.package_price * 12 -
                      //         data?.Premium[1]?.package_price}{" "}
                      //       {t("pages.pricing.Annual")}
                      //     </>
                      //   )}
                      // </p>
                    }
                    {/* <span>
                      {" "}
                      {t("pages.pricing.transaction")}, 4% (
                      {t("pages.pricing.max")} 5000€)
                    </span> */}
                    <Link
                      className="tile-btn"
                      href={
                        packageIdPremium
                          ? {
                              pathname:
                              `${BASE_URL_LOGIN_SIGNUP}/register`,
                              query: {
                                id: packageIdPremium,
                                usertype: userType,
                                countryId: countryId,
                                language:
                                  language === "english"
                                    ? "en"
                                    : language === "finnish"
                                    ? "fi"
                                    : "es",
                              },
                            }
                          : "#"
                      }
                      target={packageIdPremium && "_blank"}
                    >
                      {t("pages.pricing.BuyNow")}
                    </Link>

                    {/* <Link className="tile-btn" href="#">
                      Buy now
                    </Link> */}
                    <Link className="simple-link" href="#premium-list-tile">
                      {t("pages.pricing.knowMore")}
                      {/* Click to know more */}
                    </Link>
                  </div>
                </div>

                {/* 4th tile */}
                <div className="usage--tile">
                  <div className="tile--header">
                    {data?.Platinum && (
                      <>
                        <h3>{data?.Platinum[0]?.package_title}</h3>
                        <p>{data?.Platinum[0]?.package_sub_title}</p>
                      </>
                    )}
                  </div>
                  <div className="tile--content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Platinum[0]?.package_text_before,
                      }}
                    ></div>
                    {/* <ul>
                      {data.Platinum && (
                        <li>
                          {data?.Platinum[0]?.package_price}€/{" "}
                          {t("pages.pricing.Year")}
                        </li>
                      )}
                      <li>
                        {t("pages.pricing.List1")}
                        
                      </li>
                      <li>{t("pages.pricing.List2")}</li>
                     

                      <li>{t("pages.pricing.List3")}</li>
                    </ul> */}
                    <Link
                      className="tile-btn"
                      href={{
                        pathname:
                        `${BASE_URL_LOGIN_SIGNUP}/register`,
                        query: {
                          id: data?.Platinum[0]?.id,
                          usertype: data?.Platinum[0]?.usertype,
                          countryId: data?.Platinum[0]?.package_country_id,
                          language:
                            language === "english"
                              ? "en"
                              : language === "finnish"
                              ? "fi"
                              : "es",
                        },
                      }}
                      target="_blank"
                    >
                      {t("pages.pricing.BuyNow")}
                    </Link>

                    {/* <Link className="tile-btn" href="#">
                      Buy now
                    </Link> */}
                    <Link className="simple-link" href="#platinum-list-tile">
                      {t("pages.pricing.knowMore")}
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <ListWithTile
              data={data}
              packageIdPro={packageIdPro}
              packageIdPremium={packageIdPremium}
              userType={userType}
              setPackageIdPro={setPackageIdPro}
              setPackageIdPremium={setPackageIdPremium}
              setUserType={setUserType}
              ProppuOrigin={proppuUrl}
              Appv2={Appv2}
              AppProppu={AppProppu}
              origin={origin}
              countryId={countryId}
            />
          </div>
        </main>
      ) : !data.Starter && loading === "No data" ? (
        <main
          style={{
            marginBottom: "20px",
            minHeight: "20vh",
          }}
          className="feed-page wrapper"
        >
          <div className="card">
            <div className="cardbody">
              <div className="cardtitle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <h3 className="text-warning-title text-dark">
                  Sorry we are not available at your location currently we only
                  provide our services in Finland and Spain{" "}
                </h3>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="d-flex justify-content-center">
          {/* <Spinner className="mt-5" /> */}
        </div>
      )}
    </Layout>
  );
};

export default Pricing;
