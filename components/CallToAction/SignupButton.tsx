// import { useStaticQuery, graphql } from "gatsby";
import * as React from "react";
import { BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../../utils/constant";
import { useLocalization } from "../../utils/localization";
// import "./_signupButton.scss";

export const SignUpButton = () => {
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
        <a href={`${BASE_URL_LOGIN_SIGNUP}/register`} target="_blank">
            <button className={"signupButton"}>{t("cta.signup", "Sign up")}</button>
        </a>
    );
};
