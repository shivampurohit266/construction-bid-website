import * as React from "react";
import {
    getPagePath,
    useLocalization,
    withPageLanguage,
    getLanguagePrefix,
} from "../utils/localization";
import FAQImage from "../images/faq.png";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import { cn } from "../utils/cn";
// import "../styles/faqs.scss";
import Link from "next/link";
import dynamic from "next/dynamic";

const AccordionItem = (props:any) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <>
            <div className="accord-box">
                <div onClick={() => setIsExpanded(!isExpanded)} className="accord-heading">
                    <div className="accord__container">
                        <div className="accord-heading-content">{props.title} </div>
                        <button
                            aria-label="Toggle answer"
                            className={cn(
                                "accord-item__toggle",
                                isExpanded
                                    ? "accord-item__toggle--expanded"
                                    : "accord-item__toggle--collapsed"
                            )}
                        >
                            {isExpanded ? "-" : "+"}
                        </button>
                    </div>
                </div>
                {isExpanded ? <div className="accord-content">{props.children}</div> : null}
            </div>
        </>
    );
};

const Faqs = () => {
    const [t, language] = useLocalization();
    return (
        <Layout>
            <Seo
                title={t("pages.FAQs.meta.title", "FAQs – Proppu")}
                description={t(
                    "pages.FAQs.meta.description",
                    "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
                )}
                thumbnail={null}
                url={getPagePath()}
            />

            <Hero img={FAQImage} alt="faqs banner image" styleClass="mt-4 pt-5 back-purple ">
                <h1 className="text-white">{t("pages.FAQs.bannerTitle")}</h1>
            </Hero>

            <div className="faqs__questionnaire-companies">
                <div className="faqs__header">
                    {language === "english"
                        ? "FAQ Companies"
                        : "Usein kysytyt kysymykset yrityksille"}
                </div>
                <AccordionItem title={t("pages.FAQs.titleOne")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionOne")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleTwo")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionTwo")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleThree")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionThree")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleFour")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionFour")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleFive")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionFive")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleSix")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionSix")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleSeven")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionSeven")}</li>
                    </ul>
                </AccordionItem>
                <AccordionItem title={t("pages.FAQs.titleEight")}>
                    <ul>
                        <li>{t("pages.FAQs.descriptionEight")}</li>
                    </ul>
                </AccordionItem>
                <div className="faqs__footnote_consumer">
                    <div className="faqs__fotenote_inside_text">
                        <p>
                            {t(
                                "pages.FAQs.contactUsText",
                                "In case of any technical difficulties, please contact our customer support at"
                            )}
                        </p>
                        <a href="mailto:info@proppu.com">info@proppu.com</a>
                    </div>
                </div>
                <div className="faqs__questionnaire-consumers">
                    <div className="faqs__header">
                        {language === "english"
                            ? "FAQ Consumers"
                            : "Usein kysytyt kysymykset remontin tilaajalle "}
                    </div>
                    <AccordionItem title={t("pages.FAQsConsumers.titleOne")}>
                        <ul>
                            <li>{t("pages.FAQsConsumers.descriptionOne")}</li>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title={t("pages.FAQsConsumers.titleTwo")}>
                        <ul>
                            <li>{t("pages.FAQsConsumers.descriptionTwo")}</li>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title={t("pages.FAQsConsumers.titleThree")}>
                        <ul>
                            <li>{t("pages.FAQsConsumers.descriptionThree")}</li>
                        </ul>
                    </AccordionItem>
                    <AccordionItem title={t("pages.FAQsConsumers.titleFour")}>
                        <ul>
                            <li>{t("pages.FAQsConsumers.descriptionFour")}</li>
                        </ul>
                    </AccordionItem>
                </div>
            </div>

            <div className="faqs__footnote">
                <div className="faqs__fotenote_inside_text">
                    <p>
                        {t(
                            "pages.FAQs.contactUsText",
                            "In case of any technical difficulties, please contact our customer support at"
                        )}
                    </p>
                    <a href="mailto:info@proppu.com">info@proppu.com</a>
                </div>
                <div className="faqs__fotenote_contact_us">
                    {language === "english"
                        ? "For any other questions "
                        : "Etkö löytänyt vastausta? "}
                    <Link href={getLanguagePrefix("/contact-us/")}>
                        <span>
                            {language === "english" ? "contact us" : " Ota meihin yhteyttä"}
                        </span>
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default withPageLanguage(Faqs);
