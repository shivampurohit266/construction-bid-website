import Link from "next/link";
import React from "react";
import { FaGlobe } from "react-icons/fa";
import {
    useLocalization,
    getLanguagePrefix,
    setUiLanguage,
    localizedPagePath,
    getUiLanguage,
} from "../../utils/localization";
// import * as styles from "./_FormFooter.module.scss";
const FooterItems = ({ arrOfTranslationProps }: { arrOfTranslationProps: FooterListEntries }) => {
    const [t] = useLocalization();
    return (
        <div className={"formFooterList"}>
            {arrOfTranslationProps.map(([localizationPath, fallback, linkPath], idx) => (
                <div key={idx} className={"formFooterItem"}>
                    <Link href={getLanguagePrefix(linkPath)}>{t(localizationPath, fallback)}</Link>
                </div>
            ))}
        </div>
    );
};
type FooterListEntries = [localizationPath: string, fallback: string, linkPath: string][];

const List: FooterListEntries = [
    ["footer.terms", "Terms", "/terms-service"],
    ["footer.privacy", "Privacy", "/our-privacy"],
];
const FormFooter = () => {
    const [t, language] = useLocalization();
    return (
        <div className={"formContainer"}>
            <div className={"formFooterContainer"}>
                <div className="form__footer-left-section">
                    <div>{language === "english" ? "Questions?" : "kysymyksiä"}</div>
                    <div>
                        {language === "english"
                            ? "Contact us at info@proppu.com"
                            : "Ota yhteyttä info@proppu.com"}
                    </div>

                    <FooterItems arrOfTranslationProps={List} />
                </div>
                <footer className="proppu-footer">
      <div className="proppu-footer__primary-content wrapper">
        <div className="proppu-footer__heading row">
          <div className="col-md-6 footer-logo">
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
            </div>
            </div>
            </footer>

                {/* <ul className={"footerLanguageLinks"}>

                <li>
                        <Link onClick={() => setUiLanguage("finnish")} href={localizedPagePath("/")}>
                            FI
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => setUiLanguage("english")}
                            href={localizedPagePath("/")}
                        >
                            EN
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => setUiLanguage("spanish")}
                            href={localizedPagePath("/")}
                        >
                            ES
                        </Link>
                    </li> 
                </ul> */}
                {/* <div> */}
                    {/* <p>
                        {language === "english"
                            ? "The exact address will not be forwarded. The location will only be used to find contractors in the area"
                            : "Tarkkaa osoitetta ei välitetä eteenpäin. Sijaintia käytetään vain alueen urakoitsijoiden etsimiseen"}
                    </p> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default FormFooter;
