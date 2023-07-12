// Gatsby requirements
import React from "react";

// Components
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getLanguagePrefix, useLocalization, withPageLanguage } from "../utils/localization";

//css
// import "../styles/error404.scss";
import Link from "next/link";

const IndexPage = () => {
    const [t] = useLocalization();
    return (
        <Layout>
            <Seo
                title="404 – Proppu"
                description="Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
                thumbnail={null}
                type="website"
                url="/"
                noindex={true}
            />
            <main>
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>{t("pages.Error404.heading")}</h2>
                        <p className="mb-5">{t("pages.Error404.headingdescription")}</p>

                        <Link href="/">{t("pages.Error404.buttonbackhome")}</Link>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default withPageLanguage(IndexPage);
