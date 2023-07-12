import * as React from "react";
import Layout from "../components/Layout";
import { getPagePath, useLocalization, withPageLanguage } from "../utils/localization";
import Seo from "../components/Seo";
// import * as CSS from "./_tos-and-privacy.module.scss";

const Privacy = () => {
    const [t] = useLocalization();

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
            <main className="wrapper">
                <section className={"tosAndPrivacyPage"}>
                    <h2>{t("pages.OurPrivacy.privacyTitle")}</h2>
                    <p>{t("pages.OurPrivacy.published")}</p>
                    <p>{t("pages.OurPrivacy.privacyDescription")}</p>
                    <ol>
                        <li>
                            <h3>{t("pages.OurPrivacy.privacy-p1")}</h3>
                            <p>{t("pages.OurPrivacy.privacy-p2")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.privacy-p3")}</h3>
                            <p>{t("pages.OurPrivacy.privacy-p4")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.privacy-p5")}</h3>
                            <p>{t("pages.OurPrivacy.privacy-p6")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.privacy-p7")}</h3>
                            <p>{t("pages.OurPrivacy.privacy-p8")}</p>
                            <ul>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p9")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p10")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p11")}</p>
                                </li>
                            </ul>
                            <p>{t("pages.OurPrivacy.privacy-p12")}</p>
                            <ul>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p13")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p14")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p15")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p16")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p17")}</p>
                                </li>
                                <li>
                                    <p>{t("pages.OurPrivacy.privacy-p18")}</p>
                                </li>
                            </ul>
                            <p>{t("pages.OurPrivacy.privacy-p19")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.DatastoredHeading")}</h3>
                            <p>{t("pages.OurPrivacy.Datastored-p1")}</p>
                            <p>{t("pages.OurPrivacy.Datastored-p2")}</p>
                            <p>{t("pages.OurPrivacy.Datastored-p3")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.OriginHeading")}</h3>
                            <p>{t("pages.OurPrivacy.origin-p1")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.DatatransferHeading")}</h3>
                            <p>{t("pages.OurPrivacy.Datatransfer-p1")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.DataprotectionHeading")}</h3>
                            <p>{t("pages.OurPrivacy.Dataprotection-p1")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.RighttoviewHeading")}</h3>
                            <p>{t("pages.OurPrivacy.Righttoview-p1")}</p>
                            <p>{t("pages.OurPrivacy.Righttoview-p2")}</p>
                        </li>
                        <li>
                            <h3>{t("pages.OurPrivacy.Otherrightsheading")}</h3>
                            <p>{t("pages.OurPrivacy.Otherrights-p1")}</p>
                        </li>
                    </ol>
                </section>
            </main>
        </Layout>
    );
};

export default withPageLanguage(Privacy);
