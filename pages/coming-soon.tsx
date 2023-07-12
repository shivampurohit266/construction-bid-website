// Gatsby requirements
import React from "react";

// Components
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getLanguagePrefix, getPagePath, useLocalization, withPageLanguage } from "../utils/localization";


//css
// import "../styles/coming-soon.scss";
import Link from "next/link";
import dynamic from "next/dynamic";

const ComingSoon = () => {
    const [t] = useLocalization();
    return(
        <Layout>
        <Seo
            title="Coming Soon – Proppu"
            description="Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
            thumbnail={null}
            type="website"
            url={getPagePath()}
            noindex={true}
        />
        <main>
            <div id="notfound-coming-soon">
                <div className="notfound-coming-soon">
                    <h2>{t("pages.ComingSoon.Title")}</h2>

                    <Link href={getLanguagePrefix("/")} className="mt-5">{t("pages.Error404.buttonbackhome")}</Link>
                </div>
            </div>
        </main>
    </Layout>
    )
};

export default withPageLanguage(ComingSoon);
