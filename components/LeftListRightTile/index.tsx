import Link from "next/link";
import React, { useState } from "react";
import { BASE_URL_LOGIN_SIGNUP } from "../../utils/constant";
import { useLocalization } from "../../utils/localization";

const index = (props: any) => {
  // console.log("...",props.proId);
  const [t, language] = useLocalization();

  return (
    <div className="list--tile">
      {props?.data.Starter && (
        <div id="starter-list-tile" className="row">
          <h3>{props?.data.Starter[0].package_title}</h3>
          <div
            className="col-lg-6 list--item"
            dangerouslySetInnerHTML={{
              __html: props?.data?.Starter[0]?.package_discription,
            }}
          ></div>
          <div className="col-lg-6">
            <div className="usage--tile">
              <div className="tile--content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: props?.data?.Starter[0]?.package_text_before,
                  }}
                ></div>
                {/* <h4>{t("pages.pricing.Free")}</h4>
                <h6>
                  {t("pages.pricing.subtitle2")}
                  {props?.data?.Starter[0]?.package_price}€/
                  {t("pages.pricing.Month")}
                </h6>
                <p>{t("pages.pricing.subtitle")}</p> */}
                  <Link
                    className="tile-btn"
                    href={{
                      pathname: `${BASE_URL_LOGIN_SIGNUP}/register`,
                      query: {
                        id: props?.data?.Starter[0]?.id,
                        usertype: props?.data?.Starter[0]?.usertype,
                        countryId: props?.data?.Starter[0]?.package_country_id,
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2nd row */}
      {props?.data.Pro && (
        <div id="pro-list-tile" className="row">
          <h3>{props?.data.Pro[0].package_title}</h3>
          <div
            className="col-lg-6 list--item"
            dangerouslySetInnerHTML={{
              __html: props?.data.Pro[0].package_discription,
            }}
          ></div>
          <div className="col-lg-6">
            <div className="usage--tile">
              <div className="tile--content">
                {/* <div className="select_plan_box">
                  <div>Select your plan</div>
                  <div></div>
                  {props.data.Pro &&
                    props.data.Pro.map((price: any, idx: any) => (
                      <label key={idx}>
                        <input
                          type="radio"
                          id="Pro8"
                          checked={props.packageId === price.id}
                          onChange={() => {
                            props.setPackageId(price.id);
                          }}
                        ></input>
                        {price.package_price_terms_period === 1
                          ? "Month"
                          : "Year"}
                      </label>
                    ))}
                </div> */}
                <ul>
                  {props.data.Pro.map((price: any, idx: any) => (
                    <li key={idx}>
                      <label key={idx}>
                        <input
                          type="radio"
                          id="Pro8"
                          checked={
                            props.packageIdPro === price.id &&
                            props?.countryId === price.package_country_id
                          }
                          onChange={() => {
                            props.setPackageIdPro(price.id);
                            props.setUserType(price.usertype);
                          }}
                        ></input>{" "}
                        {price?.package_display_text}
                      </label>
                    </li>
                  ))}
                </ul>
                {props?.data?.Pro[1]?.id != props?.packageIdPro ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.data?.Pro[0]?.package_text_before,
                    }}
                  ></div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.data?.Pro[0]?.package_text_after,
                    }}
                  ></div>
                )}
                {/* <p>
                  {props?.data?.Pro[1]?.id != props?.packageId ? (
                    <del>
                      {t("pages.pricing.Save")} €
                      {props.data?.Pro[0]?.package_price * 12 -
                        props.data?.Pro[1]?.package_price}{" "}
                      {t("pages.pricing.Annual")}
                    </del>
                  ) : (
                    <>
                      {t("pages.pricing.Save")} €
                      {props.data?.Pro[0]?.package_price * 12 -
                        props.data?.Pro[1]?.package_price}{" "}
                      {t("pages.pricing.Annual")}
                    </>
                  )}
                </p>
                <span>
                  {t("pages.pricing.transaction")}, 4% ({t("pages.pricing.max")}{" "}
                  5000€)
                </span> */}
                  <Link
                    className="tile-btn"
                    href={
                      props?.packageIdPro
                        ? {
                            pathname: `${BASE_URL_LOGIN_SIGNUP}/register`,
                            query: {
                              id: props?.packageIdPro,
                              usertype: props?.userType,
                              countryId: props?.countryId,
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
                    target="_blank"
                  >
                    {t("pages.pricing.BuyNow")}
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3rd row */}
      {props?.data.Premium && (
        <div id="premium-list-tile" className="row">
          <h3>{props.data.Premium[0].package_title}</h3>
          <div
            className="col-lg-6 list--item"
            dangerouslySetInnerHTML={{
              __html: props?.data.Premium[0].package_discription,
            }}
          ></div>
          <div className="col-lg-6">
            <div className="usage--tile">
              <div className="tile--content">
                {/* <div className="select_plan_box">
                  <div>Select your plan</div>
                  <div></div>
                  {props.data.Premium &&
                    props.data.Premium.map((price: any, idx: any) => (
                      <label key={idx}>
                        <input
                          type="radio"
                          id="Pro8"
                          checked={props.packageId === price.id}
                          onChange={() => {
                            props.setPackageId(price.id);
                          }}
                        ></input>
                        {price.package_price_terms_period === 1
                          ? "Month"
                          : "Year"}
                      </label>
                    ))}
                </div> */}
                <ul>
                  {props.data.Premium.map((price: any, idx: any) => (
                    <li key={idx}>
                      <label key={idx}>
                        <input
                          type="radio"
                          id="Pro8"
                          checked={
                            props.packageIdPremium === price.id &&
                            props?.countryId === price.package_country_id
                          }
                          onChange={() => {
                            props.setPackageIdPremium(price.id);
                            props.setUserType(price.usertype);
                          }}
                        ></input>{" "}
                        {price?.package_display_text}
                      </label>
                    </li>
                  ))}
                </ul>
                {props?.data?.Premium[1]?.id != props?.packageIdPremium ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.data?.Premium[0]?.package_text_before,
                    }}
                  ></div>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props?.data?.Premium[0]?.package_text_after,
                    }}
                  ></div>
                )}
                {/* <div
                  dangerouslySetInnerHTML={{
                    __html: props?.data?.Premium[0]?.package_text_after,
                  }}
                ></div> */}
                {/* <p>
                   {props?.data?.Premium[1]?.id != props?.packageId ? (
                    <del>
                      {t("pages.pricing.Save")} €
                      {props.data?.Premium[0]?.package_price * 12 -
                        props.data?.Premium[1]?.package_price}{" "}
                      {t("pages.pricing.Annual")}
                    </del>
                  ) : (
                    <>
                      {t("pages.pricing.Save")} €
                      {props.data?.Premium[0]?.package_price * 12 -
                        props.data?.Premium[1]?.package_price}{" "}
                      {t("pages.pricing.Annual")}
                    </>
                  )}
                </p>
                <span>
                  {t("pages.pricing.transaction")}, 4% ({" "}
                  {t("pages.pricing.max")} 5000€)
                </span> */}
                  <Link
                    className="tile-btn"
                    href={
                      props?.packageIdPremium
                        ? {
                            pathname: `${BASE_URL_LOGIN_SIGNUP}/register`,
                            query: {
                              id: props?.packageIdPremium,
                              usertype: props?.userType,
                              countryId: props?.countryId,
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
                    target="_blank"
                  >
                    {t("pages.pricing.BuyNow")}
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4th row */}
      {props?.data.Platinum && (
        <div id="platinum-list-tile" className="row">
          <h3>{props.data.Platinum[0].package_title}</h3>
          <div
            className="col-lg-6 list--item"
            dangerouslySetInnerHTML={{
              __html: props?.data.Platinum[0].package_discription,
            }}
          ></div>
          <div className="col-lg-6">
            <div className="usage--tile">
              <div className="tile--content">
                <div
                  dangerouslySetInnerHTML={{
                    __html: props?.data?.Platinum[0]?.package_text_before,
                  }}
                ></div>
                {/* <ul>
                  <li>
                    {props.data.Platinum[0].package_price}€/ Year per company
                  </li>
                  <li> {t("pages.pricing.List1")}</li>
                  <li>{t("pages.pricing.List3")}</li>
                </ul> */}
                  <Link
                    className="tile-btn"
                    href={{
                      pathname: `${BASE_URL_LOGIN_SIGNUP}/register`,
                      query: {
                        id: props?.data?.Platinum[0]?.id,
                        usertype: props?.data?.Platinum[0]?.usertype,
                        countryId: props?.data?.Platinum[0]?.package_country_id,
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
