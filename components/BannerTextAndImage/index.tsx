import Image from "next/image";
import React from "react";
import BannerImg from "../../images/banner-text-img.svg";
import { useLocalization } from "../../utils/localization";

const index = () => {
  const [t, language] = useLocalization();
  return (
    <div>
      <section className="banner banner--text-img">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-left">
              <h1>
                {t("pages.pricing.Bannertitle")}{" "}
                {/* Choose the plan according to your needs */}
              </h1>
            </div>
            <div className="col-lg-6 col-right">
              <Image
                src={BannerImg}
                alt="Banner Image"
                className="pricing--banner-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
