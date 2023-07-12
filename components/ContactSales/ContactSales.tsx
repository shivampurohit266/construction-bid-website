import * as React from "react";
import { useLocalization } from "../../utils/localization";
// import * as CSS from "./_contact-sales.module.scss";

export const ContactSales = () => {
    const [t] = useLocalization();

    return (
        <div className={"contactSales"}>
            <div className={"contactPicture"} />
            <div>
                <h2>{t("contactSales.contactSalesTitle", "Contact our sales executive")}</h2>
                <h3>Vili Weurlander</h3>
                <p>
                    {t("contactSales.sendEmail", "Send email to")}{" "}
                    <a href="mailto:vili.weurlander@proppu.com">vili.weurlander@proppu.com</a>
                </p>
            </div>
        </div>
    );
};
