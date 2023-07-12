import Link from "next/link";
import React from "react";
import { useLocalization } from "../../utils/localization";
import "./styles.scss";

const Solutions = () => {
    const [t] = useLocalization();

    return (
        <section className="solutions">
            <img
                loading="lazy"
                src="/images/computer.jpg"
                alt="Fully customized solutions"
                className="solutions-img"
            />
            <div className="solutions__right">
                <h3 id="solutions" className="solutions__title">
                    {t("pages.index.solutions.title", "Let us tailor the solution for your needs")}
                </h3>
                <ul className="solutions__list">
                    <li>{t("pages.index.solutions.solutionList-2", "Resource planning")}</li>
                    <li>{t("pages.index.solutions.solutionList-3", "Project management")}</li>
                    <li>
                        {t(
                            "pages.index.solutions.solutionList-4",
                            "Customer relationship management"
                        )}
                    </li>
                    <li>
                        {t(
                            "pages.index.solutions.solutionList-5",
                            "Invoicing, accounting integration"
                        )}
                    </li>
                    <li>
                        {t(
                            "pages.index.solutions.solutionList-6",
                            "Centralized documentation and contract management"
                        )}
                    </li>
                    <li>
                        {t(
                            "pages.index.solutions.solutionList-7",
                            "Ecommerce combined with business tools"
                        )}
                    </li>
                    <li>{t("pages.index.solutions.solutionList-1", "Tailormade websites")}</li>
                </ul>
                <Link href="/#contact-us">
                    <button className="ask-for-a-quote-button">
                        {t("pages.index.solutions.askForAQuote", "Ask for a quote")}
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Solutions;
