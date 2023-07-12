// Gatsby requirements
import * as React from "react";
import {
  getLanguagePrefix,
  getUiLanguage,
  useLocalization,
} from "../../utils/localization";
import { Input } from "../Input/Input";
// import * as CSS from "./index.module.scss";
import heroImage from "../../images/consumer-hero.jpg";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "../../utils/fetchData";
import locationSvg from "../../images/Loactionvector.svg";
import { BASE_URL } from "../../utils/constant";

const RenovateHero = (props: any) => {
  const [t, language] = useLocalization();
  console.log("ipss=>", props.ip);
  const [countryId, setCountryId] = React.useState<any>(null);

  if (props?.ip.country_name == "Spain" && countryId != 195) {
    setCountryId(195);
  } else if (props.ip.country_name == "Finland" && countryId != 72) {
    setCountryId(72);
  }

  const [loadingState, errorState, dataState] = useFetch(
    `${BASE_URL}/api/state_by_country/${countryId}/${
      language === "english" ? "en" : "fi"
    }`,
    "GET",
    "body"
  );
  return (
    <section className={"section"}>
      <div className="wrapper">
        <h1>{t("pages.renovate.title")}</h1>

        <form>
          {/* <div className="select_country">
              <Image src={locationSvg} alt="location" />
              <select
                name="state"
                className="state-input"
                // onChange={(e) => changeType(e)}
                aria-label={t("pages.renovate.zipcodeInput")}
                placeholder={t("pages.renovate.zipcodeInput")}
                id="zipcode"
              >
                <option value="--Select--">
                  {t("pages.renovate.zipcodeInput")}
                </option>
                {dataState?.data.map((state: any) => (
                  <option key={state.state_id}>{state.state_name}</option>
                ))}
              </select>
            </div> */}

          {/* <Input
            aria-label={t("pages.renovate.zipcodeInput")}
            placeholder={t("pages.renovate.zipcodeInput")}
            id="zipcode"
            type="number"
            withShadow={true}
          /> */}

          <Input
            aria-label={t("pages.renovate.textInput")}
            placeholder={t("pages.renovate.textInput")}
            id="result"
            type="text"
            withShadow={true}
          />

          <Link
            className="button-blue"
            href={getLanguagePrefix("/feed/?idx=1")}
          >
            {t("pages.renovate.search", "Search")}
          </Link>
        </form>
      </div>

      <Image src={heroImage} loading="eager" aria-hidden="true" alt="" />
    </section>
  );
};

export default RenovateHero;
