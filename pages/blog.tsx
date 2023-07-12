// Gatsby requirements
import React from "react";
import Blog from "../components/Blog";


// Components
import {
    getPagePath,
    useLocalization,
    withPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";


import Seo from "../components/Seo";
import dynamic from "next/dynamic";

const IndexPage = () => {
    const [t] = useLocalization();
    return (
        <Layout>
            <Seo
                title="Proppu – Blog page"
                metaTitle="Proppu – blog page"
                description="Proppu blog page"
                thumbnail={null}
                url={getPagePath()}
            />

            <main>
                <Blog />
            </main>
        </Layout>
    );
};

export default withPageLanguage(IndexPage);
