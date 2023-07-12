import React from "react";
// import "./index.scss";
import axios from "axios";
import { addSubscriberApi } from "../../services/api";
import { WP_BASE_URL } from "../../utils/constant";
// import NoImg from "../../images/No-preview.jpg";
// import NoImgFi from "../../images/no-img-fi.jpg";
import Layout from "../../components/Layout";
import Moment from "moment";
import Seo from "../../components/Seo";
import {
  useLocalization,
  getPagePath,
  getUiLanguage,
} from "../../utils/localization";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const BlogDetails = () => {
  const router = useRouter();
  const [bolgId, setBlogId] = React.useState(router?.asPath.split("=")[1]);
  const [bologData, setBlogData] = React.useState<any>({});
  const [sendState, setSendState] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [emailError, setEmailError] = React.useState<false | true>(false);

  React.useEffect(() => {
    fetchBlogData();
  }, [getUiLanguage()]);

  const [t, language] = useLocalization();

  const fetchBlogData = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);
    const data = await axios.get(`${newBasePath}/posts?slug=${bolgId}`);
    setBlogData(data.data[0]);
  };

  const onSubmit = async (payload: any, action: any) => {
    setSendState("sending");

    try {
      const res = await addSubscriberApi(payload);
      setSendState("sent");
    } catch (error: any) {
      console.log(error);
      if (
        error.response.data.error.email[0] ===
        "The email has already been taken."
      ) {
        setSendState("idle");
        setEmailError(true);
        return;
      }
      setSendState("error");
    }
    action.resetForm();
  };

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string().required(t("footer.required")),
    email: Yup.string()
      .email(t("footer.invalid-email"))
      .required(t("footer.required")),
  });

  // console.log("noImg=>",NoImg)
  return (
    <Layout>
      <Seo
        url={getPagePath()}
        title={t("Blog Detail - Proppu")}
        description={t(
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
      />
      <main
        style={{
          marginBottom: "20px",
          minHeight: "50vh",
        }}
        className="blog-page"
      >
        <section className="blog-details">
          <div className="container">
            <div className="head">
              <h2>
                {" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: bologData?.title?.rendered,
                  }}
                />
              </h2>
              <div className="meta">
                {/* <Link to="#">For housing investors</Link> */}
                <span>{Moment(bologData?.date).fromNow()}</span>
                <span>
                  {Moment(bologData?.date).format("Do MMM YY")}
                </span>
              </div>
              <div className="tags">
                {bologData?.tag_names &&
                  bologData?.tag_names.map((item: any, key: number) => {
                    return <span key={key}>{item}</span>;
                  })}
              </div>
            </div>

            <div className="content">
              {bologData?.fimg_url ? 
                <img src={bologData?.fimg_url} alt="" /> : null}
               {/* ) : getUiLanguage() === "english" ? (
                <img src={`${NoImg.src}`} alt="No image" />
              ) : (
                <img src={`${NoImgFi.src}`} alt="No image" />
               )} */}
              <p
                dangerouslySetInnerHTML={{
                  __html: bologData?.content?.rendered,
                }}
              />
            </div>
          </div>
        </section>

        <section className="news-letter">
          <div className="container">
            <div className="news-content">
              <h2>{t("pages.Blog.newsLetterHeading")}</h2>
              {/* <div className="icon-1"><img src={icon1} alt="" /></div> */}
              <div className="news-body">
                {/* <form className="form">
                                    <div className="mt-4">
                                    <label htmlFor="name">{t("pages.Blog.name")}</label>
                                    <input type="text" className="form-control" />
                                    </div>
                                    <div className="mt-3">
                                    <label htmlFor="name">{t("pages.Blog.email")}</label>
                                    <input type="email" className="form-control" />
                                    </div>
                                    <button className="btn btn-dark  mt-3">{t("pages.Blog.submitButton")}</button>
                                </form> */}
                {sendState === "idle" ? (
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={(values, action) => {
                      console.log(values);
                      onSubmit(values, action);
                    }}
                  >
                    {({ errors, touched, handleChange, values }) => (
                      <Form>
                        <div className="mt-4">
                          <label htmlFor="name">{t("pages.Blog.name")}</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            value={values.name}
                          />
                        </div>
                        {touched.name && errors.name && (
                          <span style={{ color: "red" }}>{errors.name}</span>
                        )}

                        <div className="mt-3">
                          <label htmlFor="name">{t("pages.Blog.email")}</label>
                          <input
                            id="email"
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                          />
                        </div>
                        {touched.email && errors.email && (
                          <span style={{ color: "red", height: "20px" }}>
                            {errors.email}
                          </span>
                        )}
                        {emailError && (
                          <span style={{ color: "red" }}>
                            {t("pages.Blog.the-email-has-already-been-taken")}
                          </span>
                        )}
                        <button type="submit" className="btn btn-dark  mt-3">
                          {t("pages.Blog.submitButton")}
                        </button>
                      </Form>
                    )}
                  </Formik>
                ) : sendState === "sending" ? (
                  <div className="after-message">
                    <h4>{t("pages.Blog.sending")}</h4>
                  </div>
                ) : sendState === "sent" ? (
                  <div className="after-message">
                    <h4>
                      {t(
                        "footer.thanks-for-subscribing-to-our-newsletter",
                        "Thanks for subscribing to our newsletter"
                      )}
                    </h4>
                  </div>
                ) : (
                  t(
                    "footer.something-went-wrong-please-try-again-later",
                    "Something went wrong please try again later"
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default BlogDetails;
