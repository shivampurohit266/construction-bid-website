import React from "react";
import { useLocalization } from "../../utils/localization";
// import * as CSS from "./index.module.scss";

export type PlanTitles = [string, string];
export type PlanDescription = [string, boolean, boolean][];

const TierPlans = ({
    planDescription,
    planTitles: [planBasic, planPremium],
}: {
    planDescription: PlanDescription;
    planTitles: PlanTitles;
}) => {
    const [t] = useLocalization();

    return (
        <div className={"tierPlansWrapper"}>
            <section className={"tierPlans"}>
                <span className={"tierPlanTitle"} />
                <span className={"tierPlanTitle"}>{t(planBasic)}</span>
                <span className={"tierPlanTitle"}>{t(planPremium)}</span>
                {planDescription.flatMap(([description, basic, premium], idx) => {
                    return [
                        <span key={idx * 3 + 1} className={"tierPlanDescription"}>
                            {t(description)}
                        </span>,
                        <span className={"tierPlanState"} key={idx * 3 + 2}>
                            {basic ? "\u2713" : "-"}
                        </span>,
                        <span className={"tierPlanState"} key={idx * 3 + 3}>
                            {premium ? "\u2713" : "-"}
                        </span>,
                    ];
                })}
                <span></span>
                <span>{t("pages.constructionCompanies.tierPlan.basicPlan")}</span>
                <span>{t("pages.constructionCompanies.tierPlan.premiumPlan")}</span>
            </section>
        </div>
    );
};

export default TierPlans;
