import React from "react";
import "./styles.scss";
import Solutions from "../Solutions";
import { useLocalization } from "../../utils/localization";

const CustomizedConstruction = () => {
    const [t] = useLocalization();

    return (
        <section className="customized-construction">
            <div className="customized-construction__left">
                <h3 id="customized-construction" className="customized-construction__title">
                    {t(
                        "pages.index.customizedConstruction.title",
                        "Customized in-house solution for construction companies"
                    )}
                </h3>
                <p className="customized-construction__text">
                    {t(
                        "pages.index.customizedConstruction.description",
                        "Take a leap in customer acquisition, increase transparency and efficiency, and reduce costs with an in-house solution tailored for your needs."
                    )}
                </p>
            </div>
            <img
                src="/images/painter-working.jpg"
                alt="Painter working hard"
                loading="lazy"
                className="construction-image"
            />
        </section>
    );
};

const CustomizedConstructionAndSolutions = () => (
    <div className="customized-construction-wrapper">
        <CustomizedConstruction />
        <Solutions />
    </div>
);

export default CustomizedConstructionAndSolutions;
