import React, { useState } from "react";
import BackgroundImage from "../../images/image-227i.png";
import RectangleOne from "../../images/image-226.png";
import RectangleTwo from "../../images/Rectangle-214.png";
import Percent from "../../images/-10.png";
import Image from "next/image";
import Link from "next/link";
import { useLocalization } from "../../utils/localization";
import { Form, Formik } from "formik";
import * as Yup from "yup";


interface dataFormProps {
  onSubmit: (email: string) => string;
}
const Banner = ({ onSubmit }: any) => {
  const [t, language] = useLocalization();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    setEmail("");
  };
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("footer.invalid-email"))
      .required(t("footer.required")),
  });

  return (
    <section>
      <div className="banner__container-section">
        <div className="banner-left">
          <div className="rect-one">
            <Image
              src={RectangleOne}
              alt="rectangle "
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          <div className="rect-two">
            <p className="header">{t("pages.index.banner.header")}</p>
            <Image
              className="rectangle-two"
              src={RectangleTwo}
              alt="rectangle "
            />

            <div className="percent">
              <div style={{ display: "flex" }}>
                <Image className="percent-image" src={Percent} alt="-10%" />
                <p
                  style={{
                    color: "#fff",
                    marginBottom: "0px",
                    alignSelf: "end",
                  }}
                >
                  %
                </p>
              </div>
              <p className="text">{t("pages.index.banner.headingOne")}</p>
            </div>
            <Link
              href={"https://proppu.com/tarjous/remonttitarjous/"}
              target="_blank"
            >
              <p className="know-more">{t("pages.index.banner.headingTwo")}</p>
            </Link>
          </div>
        </div>
        <div className="banner-right">
          <Image
            className="background-banner"
            src={BackgroundImage}
            alt="backroung image"
            style={{ width: "100%" }}
          />
          <p className="text-two">{t("pages.index.banner.headingThree")}</p>

          {/* <form className="contact-us__form" onSubmit={handleSubmit}> */}
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, action) => {
              onSubmit(values);
              action.resetForm();
            }}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form className="contact-us__form">
                <input
                  className="email-input"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder={t("pages.index.banner.button")}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <span className="email-err" style={{ color: "red" }}>{errors.email}</span>
                )}
                <button className="submit" type="submit">
                  {t("pages.index.banner.headingFour")}
                </button>
              </Form>
            )}
          </Formik>
          {/* </form> */}
        </div>
      </div>
    </section>
  );
};
export default Banner;
