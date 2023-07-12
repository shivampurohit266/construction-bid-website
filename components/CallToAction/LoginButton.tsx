// import { useStaticQuery, graphql } from "gatsby";
import * as React from "react";
import { BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../../utils/constant";
import { useLocalization } from "../../utils/localization";
// import * as CSS from "./_loginButton.module.scss";

export const LoginButton = () => {
    const [t] = useLocalization();
    // const platformUrl: string = useStaticQuery(graphql`
    //     query {
    //         site {
    //             siteMetadata {
    //                 platformUrl
    //             }
    //         }
    //     }
    // `).site.siteMetadata.platformUrl;

    

    return (
        <a href={`${BASE_URL_LOGIN_SIGNUP}`} target="_blank">
            <button className={"loginButton"}>{t("cta.login", "Login")}</button>
        </a>
    );
};
