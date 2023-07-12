import React from "react";
import { useLocalization } from "../../utils/localization";
import ConstructionWorkerIcon from "../../static/images/icons/healthicons_construction-worker-outline.png";
import ConsumerIcon from "../../static/images/icons/fluent_people-audience-20-regular.png";
import CompanyLogos from "../../images/companieslogo.png";
import MaterialIcon from "../../static/images/icons/simple-icons_databricks.png";
import CondominiumIcon from "../../static/images/icons/cil_building.png";
import EntrepreneurIcon from "../../static/images/icons/clarity_employee-line.png";
// import { useStaticQuery, graphql } from "gatsby";
// import "./styles.scss";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL_LOGIN_SIGNUP, origin, proppuUrl } from "../../utils/constant";
import Banner from "../Banner/Banner";
interface dataFormProps {
  onSubmit: any;
  country_name: string;
}
const BenefitsSection = ({ onSubmit, country_name }: dataFormProps) => {
  const [t, language] = useLocalization();

  // const platformUrl: string = useStaticQuery(graphql`
  //     query {
  //         site {
  //             siteMetadata {
  //                 platformUrl
  //             }
  //         }
  //     }
  // `).site.siteMetadata.platformUrl;

  //icons
  const imageOne = <Image src={ConsumerIcon} alt=" people icon" />;
  const imageTwo = (
    <Image src={ConstructionWorkerIcon} alt=" construction worker icon" />
  );
  const imageThree = (
    <Image src={MaterialIcon} style={{ width: "100%" }} alt=" material icon" />
  );
  const imageFour = (
    <Image
      src={CondominiumIcon}
      style={{ width: "100%" }}
      alt=" building icon"
    />
  );
  const imageFive = (
    <Image
      src={EntrepreneurIcon}
      style={{ width: "100%" }}
      alt=" person icon"
    />
  );
  return (
    <div className="benefits__wrapper">
      <h2 id="benefits" className="benefits__heading">
        {t("pages.benefits.header", "Benefits provided by our application")}
      </h2>
      <section className="benefits">
        <div className="benefits__container-box">
          <div>{imageOne}</div>
          <div className="benefits__container-text">
            <div className="benefits__container-title">
              {t("pages.benefits.titleOne", "Consumers")}
            </div>
            <p>{t("pages.benefits.descriptionOne")}</p>
          </div>
        </div>
        <div className="benefits__container-box">
          <div>{imageFour}</div>
          <div className="benefits__container-text">
            <div className="benefits__container-title">
              {t("pages.benefits.titleFour", "Condominiums")}
            </div>
            <p>{t("pages.benefits.descriptionFour")}</p>
          </div>
        </div>
        <div className="benefits__container-box">
          <div>{imageTwo}</div>
          <div className="benefits__container-text">
            <div className="benefits__container-title">
              {t(
                "pages.benefits.titleTwo",
                "Professionals in the building industry"
              )}
            </div>
            <p>{t("pages.benefits.descriptionTwo")}</p>
          </div>
        </div>
        <div className="benefits__container-box">
          <div> {imageFive}</div>
          <div className="benefits__container-text">
            <div className="benefits__container-title">
              {t("pages.benefits.titleFive", "Entrepreneurs and freelancers")}
            </div>
            <p>{t("pages.benefits.descriptionFive")}</p>
          </div>
        </div>
        <div className="benefits__container-box">
          <div>{imageThree}</div>
          <div className="benefits__container-text">
            <div className="benefits__container-title">
              {t("pages.benefits.titleThree", "Material suppliers")}
            </div>
            <p>{t("pages.benefits.descriptionThree")}</p>
          </div>
        </div>
      </section>
      {/* {origin !== proppuUrl && <Banner onSubmit={onSubmit} />} */}
      <section>
        <div className="benefits__companies-container">
          <div className="benefits__companies-left">
            <div className="benefits__companies-header">
              {t("pages.Professionals.title")}
            </div>
            <p className="benefits__companies-text">
              {t("pages.Professionals.text")}
            </p>

            <Link href={`${BASE_URL_LOGIN_SIGNUP}/register`} target="_blank">
              <button className="benefits__companies-signup">
                {t("cta.signup", "SIGN UP")}
              </button>
            </Link>
          </div>
          <div className="benefits__companies-right">
            <Image
              className="benefits__companies-logos"
              src={CompanyLogos}
              alt="companies logos"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenefitsSection;
