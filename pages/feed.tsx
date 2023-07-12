import * as React from "react";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
} from "../utils/localization";
import Layout from "../components/Layout";
import { FeedContainer } from "../components/Feeds/FeedContainer";

import Seo from "../components/Seo";
import { useRouter } from "next/router";
import { BASE_URL, origin, proppuUrl } from "../utils/constant";

const Feed = (props: any) => {
  const apiUrl = `${BASE_URL}/api/`;
  const imageUrl = `${BASE_URL}/images/`;
  const [t] = useLocalization();
  const router = useRouter();
  const query = router.asPath.split("=")[1]
  console.log(query, "routerrrrrrrr");

  return (
    <Layout>
      <Seo
        url={getPagePath()}
        title={t("pages.feed.meta.title", "Feeds - Proppu")}
        description={t(
          "pages.feed.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
      />
      <div className="feeds--page">
        <main
          style={{ marginBottom: "20px", minHeight: "50vh" }}
          className="feed-page feeds-wrapper"
        >
          <h2 style={{ marginBottom: "20px", marginTop: "20px" }}>
            {t("pages.feed.feedTitle", "Feed")}
          </h2>
          <FeedContainer
            ip={props.ip}
            queryIdx={query}
            apiUrl={apiUrl}
            imageUrl={imageUrl}
          />
        </main>
      </div>
    </Layout>
  );
};

export default withPageLanguage(Feed);
