import React from "react";
import { withPageLanguage, useLocalization, getPagePath } from "../utils/localization";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

import Text from "../components/Text";

import { RenovationCalcGrid } from "../components/RenovationCalcGrid/RenovationCalcGrid";

const ConsumersUrlPage = () => {
    const [t, language] = useLocalization();

    return (
        <Layout>
            <Seo
                title={t("pages.renovate.meta.title", "Renovate your apartment – Proppu")}
                description={t(
                    "pages.renovate.meta.description",
                    "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
                )}
                url={getPagePath()}
            />
            <main>
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
                        <div className="renovate__calculator-header mt-5">
                            {language === "english"
                                ? "Start by selecting an area"
                                : "Aloita valitsemalla alue"}
                        </div>
                    </div>

                    <RenovationCalcGrid />
                </Text>
            </main>
        </Layout>
    );
};

export default withPageLanguage(ConsumersUrlPage);
