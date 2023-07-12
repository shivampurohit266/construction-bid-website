import * as React from "react";
import { useLocalization } from "../../utils/localization";
// import * as CSS from "./_renovation-calc-grid.module.scss";

const GridEntry = ({
    background,
    content,
    href,
}: {
    background: string;
    content: string;
    href: string;
}) => (
    <a
        href={href}
        style={{
            backgroundImage: `url("${background}")`,
        }}
        className={"calcGridEntry"}
    >
        {content}
    </a>
);

export const RenovationCalcGrid = () => {
    const [t] = useLocalization();

    return (
        <div className={"renovationCalculatorGrid"}>
            <GridEntry
                background="../../static/images/renovation-grid/sauna.jpg"
                content={t("renovationCalculator.sauna", "Sauna")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=Sauna"}
            />
            <GridEntry
                background="../../static/images/renovation-grid/kitchen.jpg"
                content={t("renovationCalculator.kitchen", "Kitchen")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=Keittiö"}
            />
            <GridEntry
                background="../../static/images/renovation-grid/surface-renovation.jpg"
                content={t("renovationCalculator.surfaceRenovation", "Surface renovation")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=Pintaremontti"}
            />
            <GridEntry
                background="../../static/images/renovation-grid/bathroom.jpg"
                content={t("renovationCalculator.bathroom", "Bathroom")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=Kylpyhuone"}
            />
            <GridEntry
                background="../../static/images/renovation-grid/toilet.jpg"
                content={t("renovationCalculator.toilet", "Toilet")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=WC"}
            />
            <GridEntry
                background="../../static/images/renovation-grid/apartment.jpg"
                content={t("renovationCalculator.apartment", "Apartment")}
                href={"https://remontoimassa.proppu.com/public/remonttilaskuri?portion_type=Huoneistoremontti"}
            />
        </div>
    );
};
