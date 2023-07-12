import React from "react";
import { useLocalization } from "../../utils/localization";
import "./styles.scss";

const AboutUs = () => {
    const [t, language] = useLocalization();

    return (
        <div className="about-us-wrapper">
            <section id="about-us" className="about-us">
                <h3 id="about-us" className="about-us__title">
                    {t("pages.index.aboutUs.title", "About us")}
                </h3>
                {language === "english" ? (
                    <div className="about-us__paragraph-wrapper">
                        <p className="about-us__p">
                            We are a team of real estate investors, construction and renovation
                            professionals, tech and marketing from Europe and Asia.
                        </p>
                        <p className="about-us__p">
                            ProppU was primarily designed and developed to solve the inefficiencies
                            in the building industry where we have had first-hand experience. We
                            wanted to make our lives easier. Now we want to help you do the same.
                        </p>
                        <p className="about-us__p">
                            ProppU is a one-stop-shop for all stakeholders in the industry.
                        </p>
                    </div>
                ) : (
                    <div className="about-us__paragraph-wrapper">
                        <p className="about-us__p">
                            ProppU Oy on asumisen alan toimijat yhdistävä verkkopalvelu. Alan
                            ammattilaiset saavat uusia töitä ja kätevät liiketoiminnan työkalut.
                            Remontin tilaajat saavat läpinäkyvän, helpon remontin.
                        </p>
                        <p className="about-us__p">
                            Propun tuotekehitys alkoi jo vuonna 2019, ja ensimmäinen versio
                            tuotteesta lanseerattiin vuoden 2022 huhtikuussa. Y-tunnus: 3259950-5
                        </p>
                        <p className="about-us__p">Kotipaikka: Helsinki, Suomi</p>
                    </div>
                )}
                <div className="about-us__team">
                    <dl className="about-us__team__entry about-us__founder">
                        <dt className="about-us__team-title">
                            {t("pages.index.aboutUs.founder", "Founder")}
                        </dt>
                        <dd>Antti Salo</dd>
                    </dl>
                    <dl className="about-us__team__entry about-us__partnership-sales">
                        <dt className="about-us__team-title">
                            {t("pages.index.aboutUs.sales", "Partnership & Sales")}
                        </dt>
                        <dd>Noora Kuisma</dd>
                    </dl>
                    <dl className="about-us__team__entry about-us__developers">
                        <dt className="about-us__team-title">
                            {t("pages.index.aboutUs.product", "Product")}
                        </dt>
                        <dd>Sukhdev Bisht</dd>
                        <dd>Nishant Gupta</dd>
                    </dl>
                    <dl className="about-us__team__entry about-us__sales-contact">
                        <dt className="about-us__team-title">
                            {t("pages.index.aboutUs.contactSales", "Contact our sales executive")}
                        </dt>
                        <dd>Noora Kuisma</dd>
                        <dd>
                            Email:{" "}
                            <a style={{ color: "inherit" }} href="mailto: noora.kuisma@proppu.com">
                                noora.kuisma@proppu.com
                            </a>
                        </dd>
                        <dd>Vili Weurlander</dd>
                        <dd>
                            Email:{" "}
                            <a
                                style={{ color: "inherit" }}
                                href="mailto: vili.weurlander@proppu.com"
                            >
                                vili.weurlander@proppu.com
                            </a>
                        </dd>
                    </dl>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
