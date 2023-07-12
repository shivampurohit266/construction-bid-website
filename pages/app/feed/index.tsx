import * as React from "react";
// import Accordion from 'react-bootstrap/Accordion';
import {
  useLocalization,
  getPagePath,
  getUiLanguage,
} from "../../../utils/localization";
import rightArrow from "../../../images/slider-right-arrow.svg";
import leftArrow2 from "../../../images/slider-left-arrow.svg";
import attachArrow from "../../../images/attachment-icon.svg";
import NoImg from "../../../images/No-preview.jpg";
import NoImgFi from "../../../images/no-img-fi.jpg";
// import ProppuNoImg from "../../../images/blog-placholder.svg";
import ProppuNoImg from "../../../images/talo-place-holder.png";
import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
// import Card from 'react-bootstrap/Card';

// import "./feed-details.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Accordian from "../../../components/Accordian";
import Link from "next/link";
import {
  BASE_URL,
  BASE_URL_LOGIN_SIGNUP,
  origin,
  proppuUrl,
  proppuUrlFi,
} from "../../../utils/constant";

const FeedDetails = (props: any) => {
  const router = useRouter();
  // const origin = typeof window !== "undefined" && window?.location.origin;
  // const proppuUrl = "https://proppu.com";
  const detailsUrl = `${BASE_URL}/api/feed_details/`;
  // console.log(router, "router-feed-details");
  const [data, setData] = React.useState<any>([]);
  const [imgGallery, setimgGallery] = React.useState<any>([]);
  const [index, setIndex] = React.useState<any>(0);
  const [type, setType] = React.useState<any>([]);
  const [reqOrOffer, setreqOrOffer] = React.useState<any>("");
  const [preview, setPreview] = React.useState("");
  const [feedID, setFeedID] = React.useState<any>(router?.asPath.split("=")[1]);
  const [accodian, setAccodian] = React.useState<any>(false);
  const [t, language] = useLocalization();
  const finnish =
    typeof window !== "undefined" &&
    window.localStorage.getItem("__proppu:language");

  console.log("ip=>", props);

  React.useEffect(() => {
    fetch(`${detailsUrl}${feedID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
      });
  }, [feedID]);

  React.useEffect(() => {
    setFeedID(router.query.id);
    Gallery();
    MatOrWork();
    ReqOrOffer();
    Preview();
  }, [data]);

  const Gallery = () => {
    const featured_images = data && data.tender_featured_image;
    const featured_images_arr = [featured_images];
    const slider_images = data && data.tender_slider_images;
    const imgValue = slider_images ? Object.values(slider_images) : "";
    const gallery = featured_images_arr?.concat(imgValue);
    setimgGallery(gallery);
  };

  const Carousel = () => {
    let li: any = [];
    imgGallery && imgGallery.forEach((img: any, index: any) => li.push(index));

    return (
      <ol className="carousel_indicators">
        {li.map((slide: any, i: any) => {
          return (
            <li
              key={i}
              className={index === slide ? "active" : ""}
              value={i}
              onClick={(e: any) => setIndex(e.target.value)}
            >
              {slide}
            </li>
          );
        })}
      </ol>
    );
  };

  const CitiesOrState = () => {
    // console.log(data);
    if (data?.tender_city?.length === 0) {
      return <p className="location-text">{data?.tender_state}</p>;
    } else
      return data?.tender_city?.map((city: any) => {
        return (
          <p className="location-text" key={city}>
            {city}
          </p>
        );
      });
  };

  const setImageIndex = (index: any) => {
    console.log(index);

    setIndex(index);
  };
  const nextImg = () => {
    if (index !== imgGallery.length - 1 && imgGallery[index+1]) {
      console.log(imgGallery[index], "????????");

      setIndex(index + 1);
    } else setIndex(0);
  };

  const prevImg = () => {
    if (index !== 0 && imgGallery[index -1]) {
      console.log(imgGallery[index], "??????????");
      
      setIndex(index - 1);
    } else if(imgGallery[length - 1]){
      console.log(imgGallery.length - 1, "???????>>>");
       setIndex(imgGallery.length - 1);
    }
  };

  const ReqOrOffer = () => {
    if (data && data.tender_type === "Request" && language === "finnish") {
      return setreqOrOffer("Tarjouspyyntö");
    }
    if (data && data.tender_type === "Offer" && language === "finnish") {
      return setreqOrOffer("Tarjous");
    }
    if (data && data.tender_type === "Request" && language === "english") {
      return setreqOrOffer("Request");
    }
    if (data && data.tender_type === "Offer" && language === "english") {
      return setreqOrOffer("Offer");
    }
  };
  const MatOrWork = () => {
    if (
      data &&
      data.tender_category_type === "Material" &&
      language === "finnish"
    ) {
      return setType("Materiaali");
    }
    if (
      data &&
      data.tender_category_type === "Work" &&
      language === "finnish"
    ) {
      return setType("Työ");
    }
    if (
      data &&
      data.tender_category_type === "Material" &&
      language === "english"
    ) {
      return setType("Material");
    }
    if (
      data &&
      data.tender_category_type === "Work" &&
      language === "english"
    ) {
      return setType("Work");
    }
  };

  const Preview = () => {
    if (language === "finnish") {
      return setPreview("Ei esikatselua");
    }
    if (language === "english") {
      return setPreview("No preview");
    }
  };

  const IMAGE_PREFIX = "marketplace/material/";
  const imageUrl = `${BASE_URL}/images/`;

  const handleAcordian = () => {
    setAccodian(true);
  };

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
      {origin === proppuUrl ||
      (origin === proppuUrlFi &&
        (props.ip.country_name === "Finland" ||
          props.ip.country_name === "Spain" ||
          props.ip.country_name === "India")) ? (
        <main
          style={{
            marginBottom: "20px",
            minHeight: "50vh",
          }}
          className="feed-page wrapper"
        >
          {/* {language === "finnish" ? (
            <h3 className="job_details">Työn Tiedot</h3>
          ) : (
            <h3 className="job_details">Job Details</h3>
          )} */}
          <div className="feed--title">
            <h4>{data && data.tender_title}</h4>
            <div className="d-flex">
              {data?.tender_category_type === "Material" ? (
                <p>{t("pages.feed.material")}</p>
              ) : (
                <p>{t("pages.feed.work")}</p>
              )}
              {data?.tender_type === "Request" ? (
                <p className="me-1 ms-1">{t("pages.feed.filter.request")}</p>
              ) : (
                <p className="me-1 ms-1">{t("pages.feed.filter.offer")}</p>
              )}
              {data?.tender_state ? <p>{data.tender_state}</p> : null}
            </div>

            {data?.tender_type === "Request" && (
              <p>{t("pages.feed.filter.request")}</p>
            )}
            {data?.tender_type === "Offer" && (
              <p>{t("pages.feed.filter.offer")}</p>
            )}
          </div>
          <section className="details_section">
            <article className="left_article left_article-slider">
              <div className="img_container">
                <Carousel />

                {imgGallery && imgGallery.length > 1 ? (
                  <div className="d-flex">
                    <Image
                      src={leftArrow2}
                      className="left_arrow"
                      alt="left_arrow"
                      onClick={() => prevImg()}
                    />
                    <Image
                      src={rightArrow}
                      className="right_arrow"
                      alt="right_arrow"
                      onClick={() => nextImg()}
                    />
                  </div>
                ) : (
                  ""
                )}

                {data && data.tender_featured_image ? (
                  <img
                    src={`${imageUrl}${IMAGE_PREFIX}${
                      imgGallery && imgGallery[index]
                    }`}
                    alt={data && data.tender_title}
                    className="imageStyle"
                  />
                ) : getUiLanguage() === "english" ? (
                  <Image
                    src={ProppuNoImg}
                    alt="No image"
                    className="imageStyle"
                  />
                ) : (
                  <Image
                    src={ProppuNoImg}
                    alt="No image"
                    className="imageStyle"
                  />
                )}
              </div>
            </article>
            <article className="right_article form_area">
              <div className="details_register">
                <a
                  target="_blank"
                  href={`${BASE_URL_LOGIN_SIGNUP}/register`}
                  className="mb-3"
                >
                  {language === "finnish" ? (
                    <button>
                      {data.tender_type === "offer"
                        ? "Rekisteröidy jättääksesi tarjouksen"
                        : "Rekisteröidy ja jätä tarjous"}
                    </button>
                  ) : (
                    <button>{t("pages.feed.registerToBid")}</button>
                  )}
                </a>
                {language === "finnish" ? (
                  <p>
                    Voit jättää tarjouksen ainoastaan rekisteröityneenä
                    käyttäjänä
                  </p>
                ) : (
                  <p>{t("pages.feed.bidIfRegistered")}</p>
                )}
              </div>
            </article>
            {imgGallery.length > 1 && (
              <div className="slider--img-area">
                {imgGallery.map((imgUrl: any, ind: any) => (
                  <img
                    className={
                      `${imageUrl}${IMAGE_PREFIX}${
                        imgGallery && imgGallery[index]
                      }` === `${imageUrl}${IMAGE_PREFIX}${imgUrl}`
                        ? "slider-img active"
                        : "slider-img"
                    }
                    src={`${imageUrl}${IMAGE_PREFIX}${imgUrl}`}
                    height={50}
                    width={50}
                    onClick={() => setImageIndex(ind)}
                  />
                ))}
              </div>
            )}
            <article className="left_article left_artile-content">
              <p>{data && data.tender_description}</p>
              {data &&
              data.tender_attachment &&
              data.tender_attachment != "null" ? (
                <Link
                  className="attachment-link"
                  href={`${imageUrl}${IMAGE_PREFIX}${
                    data && data.tender_attachment
                  }`}
                  target={"_blank"}
                >
                  <Image
                    src={attachArrow}
                    className="attachment-icon"
                    alt="attach"
                  />
                  {data && data.tender_attachment}
                </Link>
              ) : null}
            </article>

            <article className="right_article">
              <div className="right_article-table">
                <p>
                  {language === "finnish" ? "Kategoria" : "Category"}

                  <span className="state">{data && data.category}</span>
                </p>
                {/* {data && data.tender_attachment ? (
                  <p>
                    <a
                      href={`${imageUrl}${IMAGE_PREFIX}${
                        data && data.tender_attachment
                      }`}
                    >
                      {data && data.tender_attachment}
                    </a>
                  </p>
                ) : null} */}
                {data && data.tender_quantity ? (
                  <p>
                    {language === "finnish"
                      ? "Tarvittava määrä"
                      : "Volume Needed"}

                    <span className="values">
                      {data && data.tender_quantity} {data && data.tender_unit}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <p className="details_location">
                  {language === "finnish" ? "Alue" : "Location"}{" "}
                  <CitiesOrState />
                </p>
                <p>
                  {type.length ? type : ""}{" "}
                  <span className="values" style={{ marginLeft: "1rem" }}>
                    {language === "finnish" ? "Sisältyy" : "Included"}
                  </span>
                </p>
                <p>
                  {language === "finnish" ? "Erääntyy" : "Expires on"}{" "}
                  <span className="values" style={{ marginLeft: "1rem" }}>
                    {data && data?.tender_expiry_date}
                  </span>
                </p>
              </div>
            </article>
          </section>

          {/* {window.location.origin === "https://proppu.com" ? (
            ""
          ) : (
            <section className="feed--accordion">
              <h5>{t("pages.feed.extraDetails")}</h5>
              <Accordian />
            </section>
          )} */}
        </main>
      ) : origin !== proppuUrl &&
        (props.ip.country_name === "Finland" ||
          props.ip.country_name === "Spain" ||
          props.ip.country_name === "Greece" ||
          props.ip.country_name === "India") ? (
        <main
          style={{
            marginBottom: "20px",
            minHeight: "50vh",
          }}
          className="feed-page wrapper"
        >
          {/* {language === "finnish" ? (
            <h3 className="job_details">Työn Tiedot</h3>
          ) : (
            <h3 className="job_details">Job Details</h3>
          )} */}

          <div className="feed--title">
            <h4>{data && data.tender_title}</h4>
            <div className="d-flex">
              {data?.tender_category_type === "Material" ? (
                <p>{t("pages.feed.material")}</p>
              ) : (
                <p>{t("pages.feed.work")}</p>
              )}
              {data?.tender_type === "Request" ? (
                <p className="me-1 ms-1">{t("pages.feed.filter.request")}</p>
              ) : (
                <p className="me-1 ms-1">{t("pages.feed.filter.offer")}</p>
              )}
              {data?.tender_state ? <p>{data.tender_state}</p> : null}
            </div>
          </div>

          <section className="details_section">
            <article className="left_article left_article-slider">
              <div className="img_container">
                <Carousel />

                {imgGallery && imgGallery.length > 1 ? (
                  <div className="d-flex">
                    <Image
                      src={leftArrow2}
                      className="left_arrow"
                      alt="left_arrow"
                      onClick={() => prevImg()}
                    />
                    <Image
                      src={rightArrow}
                      className="right_arrow"
                      alt="right_arrow"
                      onClick={() => nextImg()}
                    />
                  </div>
                ) : (
                  ""
                )}

                {data && data.tender_featured_image ? (
                  <img
                    src={`${imageUrl}${IMAGE_PREFIX}${
                      imgGallery[index] && imgGallery[index] !="" && imgGallery[index]
                    }`}
                    alt={data && data.tender_title}
                    className="imageStyle"
                  />
                ) : getUiLanguage() === "english" ? (
                  <Image
                    src={ProppuNoImg}
                    alt="No image"
                    className="imageStyle"
                  />
                ) : (
                  <Image
                    src={ProppuNoImg}
                    alt="No image"
                    className="imageStyle"
                  />
                )}
              </div>
            </article>
            <article className="right_article form_area">
              <div className="details_register">
                <a
                  target="_blank"
                  href={`${BASE_URL_LOGIN_SIGNUP}/register`}
                  className="mb-3"
                >
                  {language === "finnish" ? (
                    <button>
                      {data.tender_type === "offer"
                        ? "Rekisteröidy jättääksesi tarjouksen"
                        : "Rekisteröidy ja jätä tarjous"}
                    </button>
                  ) : (
                    <button>{t("pages.feed.registerToBid")}</button>
                  )}
                </a>
                {language === "finnish" ? (
                  <p>
                    Voit jättää tarjouksen ainoastaan rekisteröityneenä
                    käyttäjänä
                  </p>
                ) : (
                  <p>{t("pages.feed.bidIfRegistered")}</p>
                )}
              </div>
            </article>
            {imgGallery.length > 1 && (
              <div className="slider--img-area">
                {imgGallery.map((imgUrl: any, ind: any) => (
                  imgUrl &&
                  <img
                    className={
                      `${imageUrl}${IMAGE_PREFIX}${
                        imgGallery && imgGallery[index]
                      }` === `${imageUrl}${IMAGE_PREFIX}${imgUrl}`
                        ? "slider-img active"
                        : "slider-img"
                    }
                    src={`${imageUrl}${IMAGE_PREFIX}${imgUrl}`}
                    height={50}
                    width={50}
                    onClick={() => setImageIndex(ind)}
                  />
                ))}
              </div>
            )}
            <article className="left_article left_artile-content">
              <p>{data && data.tender_description}</p>
              {data &&
              data.tender_attachment &&
              data.tender_attachment != "null" ? (
                <Link
                  className="attachment-link"
                  href={`${imageUrl}${IMAGE_PREFIX}${
                    data && data.tender_attachment
                  }`}
                  target={"_blank"}
                >
                  <Image
                    src={attachArrow}
                    className="attachment-icon"
                    alt="attach"
                  />
                  {data && data.tender_attachment}
                </Link>
              ) : null}
            </article>

            <article className="right_article">
              <div className="right_article-table">
                <p>
                  {language === "finnish" ? "Kategoria" : "Category"}

                  <span className="state">{data && data.category}</span>
                </p>
                {/* {data && data.tender_attachment ? (
                  <p>
                    <a
                      href={`${imageUrl}${IMAGE_PREFIX}${
                        data && data.tender_attachment
                      }`}
                    >
                      {data && data.tender_attachment}
                    </a>
                  </p>
                ) : null} */}
                {data && data.tender_quantity ? (
                  <p>
                    {language === "finnish"
                      ? "Tarvittava määrä"
                      : "Volume Needed"}

                    <span className="values">
                      {data && data.tender_quantity} {data && data.tender_unit}
                    </span>
                  </p>
                ) : (
                  ""
                )}
                <p className="details_location">
                  {language === "finnish" ? "Alue" : "Location"}{" "}
                  <CitiesOrState />
                </p>
                <p>
                  {type.length ? type : ""}{" "}
                  <span className="values" style={{ marginLeft: "1rem" }}>
                    {language === "finnish" ? "Sisältyy" : "Included"}
                  </span>
                </p>
                <p>
                  {language === "finnish" ? "Erääntyy" : "Expires on"}{" "}
                  <span className="values" style={{ marginLeft: "1rem" }}>
                    {data && data.tender_expiry_date}
                  </span>
                </p>
              </div>
            </article>
          </section>
          {data?.tender_type === "Request" && (
            <>
              {/* <section className="feed--accordion">
                <h5>{t("pages.feed.extraDetails")}</h5>
                <Accordian />
              </section> */}
            </>
          )}
        </main>
      ) : (
        <main
          style={{
            marginBottom: "20px",
            minHeight: "20vh",
          }}
          className="feed-page wrapper"
        >
          <div className="card">
            <div className="cardbody">
              <div className="cardtitle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <h3 className="text-warning-title text-dark">
                  Sorry we are not available at your location currently we only
                  provide our services in Finland and Spain{" "}
                </h3>
              </div>
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
};

export default FeedDetails;
