import React from "react";
import styles from "../../styles/Home.module.scss";
import heroImage from "../../images/heroImage.png";
import { getLanguagePrefix, useLocalization } from "../../utils/localization";
import Link from "next/link";
import Image from "next/image";

const HomeHero = () => {
  const [t] = useLocalization();

  return (
    <div className={styles.proppuHomeWrapper}>
      <section className={styles.proppuHome}>
        <Image
          loading="eager"
          src={heroImage}
          alt=""
          className={styles.heroImage}
        />
        <div className="proppu-home__right">
          <h1 className={styles.mainHeading}>{t("pages.index.title")}</h1>
          <p className={styles.proppuHome__text}>
            {t("pages.index.description")}
          </p>
          <Link href={getLanguagePrefix("#contact-us")}>
            <button className={styles.proppuHome__bookADemo}>
              {t("footer.bookDemo")}
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
