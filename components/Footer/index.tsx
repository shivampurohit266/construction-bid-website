import React from "react";
// import "./styles.scss";
import footerLogo from "../../images/Full-Logo-lighter.png";
import { addSubscriberApi } from "../../services/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  FaGlobe,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import {
  getLanguagePrefix,
  localizedPagePath,
  setUiLanguage,
  useLocalization,
  getUiLanguage,
} from "../../utils/localization";
import Link from "next/link";
import Image from "next/image";
import { origin, proppuUrl } from "../../utils/constant";

const DemoButton = () => {
  const [t] = useLocalization();
  return (
    <Link href={getLanguagePrefix("/#contact-us")}>
      <button className="book-a-demo">{t("footer.bookDemo")}</button>
    </Link>
  );
};

const FooterList = (props: any) => {
  const [t] = useLocalization();

  return (
    <ul className="proppu-footer__list">
      <h5>{props.heading}</h5>
      {props.arrOfTranslationProps.map(
        ([localizationPath, fallback, linkPath]: any, idx: any) => (
          // console.log(linkPath)

          <li key={idx} className="proppu-footer__item">
            {linkPath === "https://remonttikauppa.proppu.com/" ? (
              <Link
                href={{
                  pathname: getLanguagePrefix("https://remonttikauppa.proppu.com/"),
                  query: { idx },
                }}
                target={"_blank"}
              >
                {t(localizationPath, fallback)}
              </Link>
            ) : (
              <Link
                href={{ pathname: getLanguagePrefix(linkPath), query: { idx } }}
              >
                {t(localizationPath, fallback)}
              </Link>
            )}
          </li>
        )
      )}
    </ul>
  );
};

type FooterListEntries = [
  localizationPath: string,
  fallback: string,
  linkPath: string
][];
const firstList: FooterListEntries = [
  // ["","Services",""],
  [
    "footer.construction-company",
    "Construction Companies",
    "/construction-companies",
  ],
  ["footer.Entepreneur", "Entepreneur", "/professional-enterpreneur"],
  ["footer.material-supplier", "Material Supplier", "/material-suppliers"],
  ["footer.consumer", "Consumers", "/consumers"],
  ["footer.Condominiums", "Condominiums", "/condominium"],
];

const secondList: FooterListEntries = [
  ["footer.feeds", "Browse feed", "/feed"],
  ["footer.offerFeeds", "Browse feed", "/feed"],
  ["footer.requestFeeds", "Browse feed", "/feed"],
  ["footer.Reno", "Renovate", "/renovate"],
  ["footer.renoCalc", "Renovation calculator", "/renovationcalculator"],
  ["footer.request-offer", "Request for Offer", "/renovate-request-offer-1"],
  ["footer.web-shop", "Webshop", "https://remonttikauppa.proppu.com/"],
];

const thirdList: FooterListEntries = [
  ["footer.what-is-proppu", "What is Proppu?", "/what-is-proppu"],
  ["footer.faq", "FAQs", "/faqs"],
  ["footer.contact-us", "Contact us", "/contact-us"],
  ["footer.blog", "Blog", "/blog"],
  // ["footer.helpcenter", "Helpcenter", "/helpcenter"],
];

const Footer = () => {
  const [t] = useLocalization();
  const [sendState, setSendState] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [emailError, setEmailError] = React.useState<false | true>(false);

  const onSubmit = async (payload: any) => {
    setSendState("sending");

    try {
      const res = await addSubscriberApi(payload);
      setSendState("sent");
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.error.email[0] ===
        "The email has already been taken."
      ) {
        setSendState("idle");
        setEmailError(true);
        return;
      }
      setSendState("error");
    }
  };

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required(t("footer.required")),
    email: Yup.string()
      .email(t("footer.invalid-email"))
      .required(t("footer.required")),
  });

  return (
    <footer className="proppu-footer">
      <div className="proppu-footer__primary-content wrapper">
        <div className="proppu-footer__heading row">
          <div className="col-md-6 footer-logo">
            <Link href={getLanguagePrefix("/")}>
              <Image
                draggable={false}
                loading="lazy"
                className="proppu-footer__logo"
                src={footerLogo}
                alt=""
              />
            </Link>
            <div className="language-footer">
              <ul>
                <li
                  className="header__links__dropdown-item"
                  style={{ border: "1px solid #E2E2E2", cursor: "pointer" }}
                >
                  <div>
                    <FaGlobe />
                    {getUiLanguage() === "english" ? " English" : ""}
                    {getUiLanguage() === "finnish" ? " Finnish" : ""}
                    {getUiLanguage() === "spanish" ? "Spanish" : ""}
                    {" \u25bc"}
                  </div>

                  <ul
                    className="header__links__dropdown"
                    style={{ width: "102px" }}
                  >
                    <div className="header__spacer"></div>
                    <li>
                      <Link
                        onClick={() => setUiLanguage("finnish")}
                        href={localizedPagePath("/")}
                        scroll={false}
                      >
                        {getUiLanguage() === "finnish" ? (
                          <strong>FI</strong>
                        ) : (
                          "FI"
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setUiLanguage("english")}
                        href={localizedPagePath("/")}
                        scroll={false}
                      >
                        {getUiLanguage() === "english" ? (
                          <strong>EN</strong>
                        ) : (
                          "EN"
                        )}
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => setUiLanguage("spanish")}
                        href={localizedPagePath("/")}
                        scroll={false}
                      >
                        {getUiLanguage() === "spanish" ? (
                          <strong>ES</strong>
                        ) : (
                          "ES"
                        )}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6 proppu-footer__see-in-action">
            <h3>{t("footer.see-proppu-in-action", "See ProppU in action")}</h3>
            <DemoButton />
          </div>
        </div>
        <div className="proppu-footer__divider" />
        <div className="proppu-footer__content">
          <div className="proppu-footer__subscribe">
            <h3>
              {t("footer.subscribeToNewsletter", "Subscribe to our newsletter")}
            </h3>
            <div className="proppu-footer__subscribe-input-wrapper">
              {sendState === "idle" ? (
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                  }}
                  validationSchema={DisplayingErrorMessagesSchema}
                  onSubmit={(values) => {
                    console.log(values);
                    onSubmit(values);
                  }}
                >
                  {({ errors, touched, handleChange, values }) => (
                    <Form>
                      <input
                        type="text"
                        className="proppu-footer__subscribe-input"
                        placeholder={t("footer.subscriptionName", "Name")}
                        name="name"
                        id="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                      {touched.name && errors.name && (
                        <span style={{ color: "red" }}>{errors.name}</span>
                      )}
                      <input
                        id="email"
                        type="text"
                        className="proppu-footer__subscribe-input"
                        placeholder={t(
                          "footer.subscriptionEmail",
                          "Email address"
                        )}
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                      />
                      {touched.email && errors.email && (
                        <span style={{ color: "red" }}>{errors.email}</span>
                      )}
                      {emailError && (
                        <span style={{ color: "red" }}>
                          {t("footer.the-email-has-already-been-taken")}
                        </span>
                      )}
                      <br />
                      <button
                        type="submit"
                        className="proppu-footer__subscribe-input-send"
                      >
                        {t("footer.submit", "Submit")}
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : sendState === "sending" ? (
                t("footer.sending", "Sending") + "..."
              ) : sendState === "sent" ? (
                t(
                  "footer.thanks-for-subscribing-to-our-newsletter",
                  "Thanks for subscribing to our newsletter"
                )
              ) : (
                t(
                  "footer.something-went-wrong-please-try-again-later",
                  "Something went wrong please try again later"
                )
              )}
            </div>
          </div>

          <FooterList
            arrOfTranslationProps={firstList}
            heading={t("footer.heading1")}
          />

          <FooterList
            arrOfTranslationProps={secondList}
            heading={t("footer.heading2")}
          />

          <FooterList
            arrOfTranslationProps={thirdList}
            heading={t("footer.heading3")}
          />
        </div>
      </div>
      <div className="proppu-footer__copyright">
        <div className="wrapper">
          <div>
            &copy; {new Date().getFullYear()} ProppU.{" "}
            {t("footer.all-rights-reserved", "All rights reserved.")}{" "}
          </div>
          <Link
            href={getLanguagePrefix("/terms-service")}
            className="proppu-footer__link"
          >
            {t("footer.terms")}
          </Link>{" "}
          {t("footer.and")}{" "}
          <Link
            href={getLanguagePrefix("/our-privacy")}
            className="proppu-footer__link"
          >
            {t("footer.privacy")}
          </Link>
          <Link
            href="https://www.facebook.com/proppuplatform"
            target={"_blank"}
            className="footer_social-media-links"
          >
            <FaFacebookSquare />
          </Link>
          <Link
            href="https://www.linkedin.com/company/82746518"
            target={"_blank"}
            className="footer_social-media-links"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://www.instagram.com/proppufinland"
            target={"_blank"}
            className="footer_social-media-links"
          >
            <FaInstagramSquare />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCjrTS-W6lypUst9Aql7Brvg"
            target={"_blank"}
            className="footer_social-media-links"
          >
            <FaYoutube />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
