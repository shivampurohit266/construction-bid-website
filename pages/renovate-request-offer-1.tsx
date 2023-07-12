import React, { useState, useReducer, useEffect } from "react";
import Work from "../static/images/icons/healthicons_construction-worker-outline.png";
import Material from "../images/material-offer.png";
import Both from "../images/both-offer.png";
import { reducer } from "../components/Modal/reducer";
import Modal from "../components/Modal/Modal";

import {
  getPagePath,
  useLocalization,
  withPageLanguage,
  getLanguagePrefix,
} from "../utils/localization";
import Seo from "../components/Seo";
// import "../styles/form.scss";
import FormLayout from "../components/FormLayout";
import Link from "next/link";
import Image from "next/image";
import { origin, proppuUrl, proppuUrlFi } from "../utils/constant";

const defaultState = {
  isModalOpen: false,
  modalContent: "",
  status: false,
};

const RequestForm = (props: any) => {
  const [t, language] = useLocalization();
  const [value, setValue] = useState("");
  const [select, setSelect] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultState);
  const localValue: any = window.localStorage.getItem("value");
  if (localValue && !value) {
    setValue(localValue);
    setSelect(true);
  }


  const btns = [
    {
      word: language === "english" ? "Work" : language === "finnish" ? "Työ" : "Trabajo",
      image: Work,
      text: language === "english" ? "Only need labour?" :language==="finnish"? "Etsitkö tekijää?" : "¿Buscas un autor?",
    },
    {
      word: language === "english" ? "Material" : language==="finnish"? "Materiaali": "Material",
      image: Material,
      text:
        language === "english"
          ? "Only want to order material?"
          :language==="finnish"? "Tarvitsetko vain materiaalit?":"Solo necesitas los materiales?",
    },
    {
      word: language === "english" ? "Both" : language==="finnish"? "Molemmat":"Ambos",
      image: Both,
      text:
        language === "english"
          ? "Looking for the full package?"
          :language==="finnish"? "Haluan tarjouksia työstä ja materiaaleista.":"Quiero ofertas de trabajo y materiales.",
    },
  ];

  const handleClick = (value: string) => {
    setValue(value);
    localStorage.setItem("value", value);
    setSelect(true);
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClick = () => {
    if (!select) {
      dispatch({ type: "NO_VALUE" });
    }
  };
  console.log(state, select, language);
  return (
    <FormLayout props={props}>
      <Seo
        title={t("pages.contactUs.meta.title", "request-form-1 – Proppu")}
        description={t(
          "pages.contactUs.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />
      {(origin === proppuUrl || origin === proppuUrlFi) &&
      (props.ip.country_name === "Finland" ||
        props.ip.country_name === "Spain" ||
        props.ip.country_name === "") ? (
        <div className="form__request-wrapper">
          {state.isModalOpen && (
            <Modal
              closeModal={closeModal}
              modalContent={
                language === "english"
                  ? "Please select an option"
                  : "Valitse sopiva vaihtoehto"
              }
              status={false}
            />
          )}
          <div className="form__text-content">
            <div className="form__text--one">
              {t("pages.requestOfferForms.textOne")}
            </div>
            <div className="form__text--two">
              {t("pages.requestOfferForms.textTwo")}
            </div>
            <div className="form__text--three">
              {t("pages.requestOfferForms.textThree")}
            </div>
          </div>
          <div className="form__images-container">
            {btns.map((btn, index) => {
              return (
                <div
                  key={index}
                  className="form__image-box"
                  style={{
                    
                  }}
                >
                  <div className="form__image-one">
                    <div
                      className="form__imagebox"
                      onClick={() => handleClick(btn.word)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "120px",                       
                        transition: "all 0.3s ease",
                        margin: "0px 1rem",                       
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        backgroundColor: btn.word === value ? "#B2B3EC" : "",
                        cursor: "pointer",
                        // boxShadow:
                        //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      }}
                    >
                      <div style={{ display: "grid", placeItems: "center" }}>
                        <Image
                          style={{
                            backgroundColor:
                              btn.word === value ? "#ffffff" : "",
                            width: "58px",
                            padding: "10px",
                          }}
                          src={btn.image}
                          alt={`the word ${btn.word}`}
                          onClick={() => handleClick(btn.word)}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "26px",
                            margin: "0px",
                            color: btn.word === value ? "#ffffff" : "",
                            padding:"0 10px",
                          }}
                        >
                          {btn.word}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="form_img_box_text" >
                        {btn.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="form__images-container">
            {btns.map((btn, index) => {
              return (
                <div key={index} className="form__image-box">
                  <div className="form__image-one">
                    <div
                      className="form__image-box"
                      onClick={() => handleClick(btn.word)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        height: "120px",
                        border: "2.5px solid #000000",
                        margin: "0px 1rem",
                        width: "240px",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        backgroundColor: btn.word === value ? "#B2B3EC" : "",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "grid", placeItems: "center" }}>
                        <Image
                        className="form__image-box-img"
                          style={{
                            backgroundColor:
                              btn.word === value ? "#ffffff" : "",
                            width: "58px",
                            padding: "10px",
                          }}
                          src={btn.image}
                          alt={`the word ${btn.word}`}
                          onClick={() => handleClick(btn.word)}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "26px",
                            margin: "0px",
                            color: btn.word === value ? "#ffffff" : "",
                          }}
                        >
                          {btn.word}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          paddingTop: "10px",
                        }}
                      >
                        {btn.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}

          {value === "Material" || value === "Materiaali" ? (
            <div className="form__btns-container">
              
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-material"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <button className="form__cancel-btn">
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </button>
            </div>
          ) : (
            <div className="form__btns-container">
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-work"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <Link
                className="form__cancel-btn"
                href={getLanguagePrefix("/renovate")}
              >
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </Link>
            </div>
          )}
        </div>
      ) : origin !== proppuUrl &&
        (props.ip.country_name === "Finland" ||
          props.ip.country_name === "Spain" ||
          props.ip.country_name === "Greece" ||
          props.ip.country_name === "India") ? (
        <div className="form__request-wrapper">
          {state.isModalOpen && (
            <Modal
              closeModal={closeModal}
              modalContent={
                language === "english"
                  ? "Please select an option"
                  : "Valitse sopiva vaihtoehto"
              }
              status={false}
            />
          )}
          <div className="form__text-content">
            <div className="form__text--one">
              {t("pages.requestOfferForms.textOne")}
            </div>
            <div className="form__text--two">
              {t("pages.requestOfferForms.textTwo")}
            </div>
            <div className="form__text--three">
              {t("pages.requestOfferForms.textThree")}
            </div>
          </div>

          <div className="form__images-container">
            {btns.map((btn, index) => {
              return (
                <div
                  key={index}
                  className="form__image-box"
                  style={{
                    
                  }}
                >
                  <div className="form__image-one">
                    <div
                      className="form__imagebox"
                      onClick={() => handleClick(btn.word)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "120px",                       
                        transition: "all 0.3s ease",
                        margin: "0px 1rem",                       
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        backgroundColor: btn.word === value ? "#E1F590" : "",
                        cursor: "pointer",
                        // boxShadow:
                        //   "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      }}
                    >
                      <div style={{ display: "grid", placeItems: "center" }}>
                        <Image
                          style={{
                            backgroundColor:
                              btn.word === value ? "#E1F590" : "",
                            width: "58px",
                            padding: "10px",
                          }}
                          src={btn.image}
                          alt={`the word ${btn.word}`}
                          onClick={() => handleClick(btn.word)}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "26px",
                            margin: "0px",
                            color: btn.word === value ? "#000000" : "",
                            padding:"0 10px",
                          }}
                        >
                          {btn.word}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="form_img_box_text" >
                        {btn.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {value === "Material" || value === "Materiaali" ? (
            <div className="form__btns-container">
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-material"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <button className="form__cancel-btn">
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </button>
            </div>
          ) : (
            <div className="form__btns-container">
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-work"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <Link
                className="form__cancel-btn"
                href={getLanguagePrefix("/renovate")}
              >
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </Link>
            </div>
          )}
        </div>
      ) : (
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
      )}

      {/* {props.ip.country_name === "Finland" ||
      props.ip.country_name === "Spain" ||
      props.ip.country_name === "Greece" ||
      props.ip.country_name === "India" ? (
        <div className="form__request-wrapper">
          {state.isModalOpen && (
            <Modal
              closeModal={closeModal}
              modalContent={
                language === "english"
                  ? "Please select an option"
                  : "Valitse sopiva vaihtoehto"
              }
              status={false}
            />
          )}
          <div className="form__text-content">
            <div className="form__text--one">
              {t("pages.requestOfferForms.textOne")}
            </div>
            <div className="form__text--two">
              {t("pages.requestOfferForms.textTwo")}
            </div>
            <div className="form__text--three">
              {t("pages.requestOfferForms.textThree")}
            </div>
          </div>

          <div className="form__images-container">
            {btns.map((btn, index) => {
              return (
                <div key={index} className="form__image-box">
                  <div className="form__image-one">
                    <div
                      className="form__image-box"
                      onClick={() => handleClick(btn.word)}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        height: "120px",
                        border: "2.5px solid #000000",
                        margin: "0px 1rem",
                        width: "240px",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: "6px",
                        backgroundColor: btn.word === value ? "#B2B3EC" : "",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "grid", placeItems: "center" }}>
                        <Image
                          style={{
                            backgroundColor:
                              btn.word === value ? "#ffffff" : "",
                            width: "58px",
                            padding: "10px",
                          }}
                          src={btn.image}
                          alt={`the word ${btn.word}`}
                          onClick={() => handleClick(btn.word)}
                        />
                      </div>
                      <div>
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "28px",
                            color: btn.word === value ? "#ffffff" : "",
                          }}
                        >
                          {btn.word}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>{btn.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {value === "Material" || value === "Materiaali" ? (
            <div className="form__btns-container">
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-material"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <button className="form__cancel-btn">
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </button>
            </div>
          ) : (
            <div className="form__btns-container">
              <Link
                className="form__next-btn"
                href={getLanguagePrefix(
                  select
                    ? "/renovate-request-offer-2-work"
                    : "/renovate-request-offer-1"
                )}
                onClick={onClick}
              >
                {language === "english" ? "NEXT" : "SEURAAVA"}
              </Link>
              <Link
                className="form__cancel-btn"
                href={getLanguagePrefix("/renovate")}
              >
                {language === "english" ? "CANCEL" : "PERUUTA"}
              </Link>
            </div>
          )}
        </div>
      ) : !props.ip ? (
        <div className="form__text-content">
          <div className="form__text--one">Lodding....</div>{" "}
        </div>
      ) : (
        <main
          style={{
            marginBottom: "40px",
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
                <Link
                  className="form__cancel-btn ms-4"
                  href={getLanguagePrefix("/")}
                >
                  {language === "english" ? "Back to home" : "Takaisin kotiin"}
                </Link>
              </div>
            </div>
          </div>
        </main>
      )} */}
    </FormLayout>
  );
};

export default withPageLanguage(RequestForm);
