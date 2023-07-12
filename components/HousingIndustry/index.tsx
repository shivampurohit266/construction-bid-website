import React from "react";
import { getLanguagePrefix, useLocalization } from "../../utils/localization";
import Link from "next/link";
import Image from "next/image";

const AccordionItem = (props:any) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <>
            <div className="accordion-items">
                <h3 onClick={() => setIsExpanded(!isExpanded)} className="accordion-heading">
                    <div className="accordion-heading__content">
                        <span className="accordion-heading__numbers">{props.title[0]}</span>
                        {props.title.substring(1)}
                    </div>
                </h3>
            </div>
        </>
    );
};

const HousingIndustry = (props:any ,{ list = null  }) => {
    const [t, language] = useLocalization();
    const isFinnish = language === "finnish";

    return (
        <div className="housing-industry-wrapper">
            <section className="housing-industry">
                <div className="housing__industry-left">
                    <h2 id="housing-industry" className="housing-industry__heading">
                        {t("pages.index.accordionTitle", "Platform uniting the housing industry")}
                    </h2>

                    {props.list ? (
                        props.list.map((item:any, index:number) => {
                            return <AccordionItem title={item}>
                                <ul key={index}>
                                    <li>{item}</li>
                                </ul>
                            </AccordionItem>;
                        })
                    ) : (
                        <>
                            <AccordionItem title={t("pages.index.housing-industry.item1")}>
                                <ul>
                                    {isFinnish ? (
                                        <>
                                            <li>
                                                Markkinapaikassa voit tarjota palveluitasi, tehdä
                                                materiaalihankintoja tai hankkia lisäkäsiä
                                            </li>
                                        </>
                                    ) : null}
                                </ul>
                            </AccordionItem>
                            <AccordionItem title={t("pages.index.housing-industry.item2")}>
                                <ul>
                                    <li>{t("pages.index.housing-industry.for-consumers-1")}</li>
                                    {isFinnish ? (
                                        ""
                                    ) : (
                                        <li>{t("pages.index.housing-industry.for-consumers-2")}</li>
                                    )}
                                </ul>
                            </AccordionItem>
                            <AccordionItem title={t("pages.index.housing-industry.item3")}>
                                <ul>
                                    <li>
                                        {t("pages.index.housing-industry.for-material-suppliers-1")}
                                    </li>
                                    <li>
                                        {t("pages.index.housing-industry.for-material-suppliers-2")}
                                    </li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title={t("pages.index.housing-industry.item4")}>
                                <ul>
                                    <li>{t("pages.index.housing-industry.for-freelancers-1")}</li>
                                    <li>{t("pages.index.housing-industry.for-freelancers-2")}</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title={t("pages.index.housing-industry.item5")}>
                                <ul>
                                    <li>{t("pages.index.housing-industry.for-investors-1")}</li>
                                    <li>{t("pages.index.housing-industry.for-investors-2")}</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem title={t("pages.index.housing-industry.item6")}>
                                <ul>
                                    <li>{t("pages.index.housing-industry.for-investors-1")}</li>
                                    <li>{t("pages.index.housing-industry.for-investors-2")}</li>
                                </ul>
                            </AccordionItem>
                        </>
                    )}

                    <Link href={getLanguagePrefix("/feed")}>
                        <button className="btn-proppu-view-listings button-purple" style={{ width: "auto"}}>
                            {t("pages.index.housing-industry.view-listings")}
                        </button>
                    </Link>
                    <br />
                </div>
                <div>
                    <Image
                        src={props.image}
                        alt="man working on the ceiling"
                        className="housing__industry-image"
                        loading="lazy"
                    />
                </div>
            </section>
        </div>
    );
};

export default HousingIndustry;
