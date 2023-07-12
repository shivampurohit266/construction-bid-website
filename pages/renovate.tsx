import React from "react";
import {
  withPageLanguage,
  useLocalization,
  getPagePath,
  getLanguagePrefix,
  autoSelectPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import RenovateHero from "../components/RenovateHero";

import Text from "../components/Text";
import { RenovationCalcGrid } from "../components/RenovationCalcGrid/RenovationCalcGrid";
import WallPainting from "../images/wall-painting.png";
import ContactUsRenovate from "../components/ContactUsRenovate/index";
import Link from "next/link";
import Image from "next/image";
const ConsumersPage = (props: any) => {
  const [t, language] = useLocalization();

  return (
    <Layout>
      <Seo
        title={t(
          "pages.renovate.meta.title",
          "Renovate your apartment – Proppu"
        )}
        description={t(
          "pages.renovate.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        url={getPagePath()}
      />
      <main>
        <RenovateHero ip={props.ip} />
        <Text>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 id="renovation-calculator">
              {t("pages.renovate.alwaysRoomForImprovements")}{" "}
            </h2>
            <div className="renovate__text-container">
              <p style={{ textAlign: "start" }}>
                &#10003; {t("pages.renovate.subtitleOne")}
              </p>
              <p style={{ textAlign: "start" }}>
                &#10003; {t("pages.renovate.subtitleTwo")}
              </p>
              <p style={{ textAlign: "start" }}>
                &#10003; {t("pages.renovate.subtitleThree")}
              </p>
              {/* <p
                                style={{
                                    color: "#6480E1",
                                    textAlign: "start",
                                    paddingLeft: "1rem",
                                }}
                            >
                                {language === "english" ? "Learn more" : "Lue lisää"}
                            </p> */}
            </div>
            <div className="renovate__calculator-header">
              {t("pages.renovate.header")}
            </div>
          </div>

          <RenovationCalcGrid />
        </Text>

        <Text>
          <div className="renovate__container">
            <div>
              <h2>{t("pages.renovate.receiveOffersFast")}</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="renovate__text-container"
              >
                <p style={{ textAlign: "start" }}>
                  &#10003; {t("pages.renovate.offerOne")}
                </p>
                <p style={{ textAlign: "start" }}>
                  &#10003; {t("pages.renovate.offerTwo")}
                </p>
                <p style={{ textAlign: "start" }}>
                  &#10003; {t("pages.renovate.offerThree")}
                </p>
                <p style={{ textAlign: "start" }}>
                  &#10003; {t("pages.renovate.offerFour")}
                </p>
              </div>
              <Link
                className="button-tryNow"
                href={getLanguagePrefix("/renovate-request-offer-1")}
              >
                {t("pages.renovate.tryNowButton")}
              </Link>
            </div>
            <div className="renovate__image-wrapper">
              <Image
                style={{ height: "100%", marginTop: "0", width: "100%" }}
                src={WallPainting}
                alt="painting wall"
              />
            </div>
          </div>
        </Text>
        <ContactUsRenovate />
      </main>
    </Layout>
  );
};

export default withPageLanguage(ConsumersPage);
