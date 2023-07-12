import * as React from "react";
import {
  useLocalization,
  getPagePath,
  getUiLanguage,
} from "../../utils/localization";
import rightArrow from "../../images/right-arrow-angle-svgrepo-com.svg";
import leftArrow2 from "../../images/left-arrow-angle-svgrepo-com.svg";
import NoImg from "../../images/No-preview.jpg";
import NoImgFi from "../../images/no-img-fi.jpg";
import Layout from "../Layout";
import Seo from "../Seo";

// import "./feed-details.scss";
import { useRouter } from "next/router";
import { origin, proppuUrl } from "../../utils/constant";

const FeedDetails = ({ params }) => {
  const router = useRouter();
  console.log(router, "router-feed-details");
  const [data, setData] = React.useState([]);
  const [imgGallery, setimgGallery] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [type, setType] = React.useState([]);
  const [reqOrOffer, setreqOrOffer] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const [t, language] = useLocalization();
  const finnish =
    typeof window !== "undefined" &&
    window.localStorage.getItem("__proppu:language");

  React.useEffect(() => {
    fetch(`https://app.proppu.com/proppu/public/api/feed_details/${params}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data[0]);
      });
  }, []);

  React.useEffect(() => {
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
    let li = [];
    imgGallery && imgGallery.forEach((img, index) => li.push(index));

    return (
      <ol className="carousel_indicators">
        {li.map((slide, i) => {
          return (
            <li
              key={i}
              className={index === slide ? "active" : ""}
              value={i}
              onClick={(e) => setIndex(e.target.value)}
            >
              {slide}
            </li>
          );
        })}
      </ol>
    );
  };

  const CitiesOrState = () => {
    console.log(data);
    if (data?.tender_city?.length === 0) {
      return <p>{data?.tender_state}</p>;
    } else
      return data?.tender_city?.map((city, index) => {
        return <p key={index}>{city}</p>;
      });
  };

  const nextImg = () => {
    if (index !== imgGallery.length - 1) {
      setIndex(index + 1);
    } else setIndex(0);
  };

  const prevImg = () => {
    if (index !== 0) {
      setIndex(index - 1);
    } else setIndex(imgGallery.length - 1);
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
      return setType("Maateriaali");
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
  const imageUrl = "https://app.proppu.com/proppu/public/images/";

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
      <main
        style={{
          marginBottom: "20px",
          minHeight: "50vh",
        }}
        className="feed-page wrapper"
      >
        {language === "finnish" ? (
          <h3 className="job_details">Työn Tiedot</h3>
        ) : (
          <h3 className="job_details">Job Details</h3>
        )}

        <section className="details_section">
          <article className="left_article">
            <div className="img_container">
              <Carousel />

              {imgGallery && imgGallery.length > 1 ? (
                <div className="d-flex">
                  <img
                    src={leftArrow2}
                    className="left_arrow"
                    onClick={() => prevImg()}
                  />
                  <img
                    src={rightArrow}
                    className="right_arrow"
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
                ></img>
              ) : getUiLanguage() === "english" ? (
                <img src={NoImg} alt="No image" />
              ) : (
                <img src={NoImgFi} alt="No image" />
              )}
            </div>
            <div className="details_register">
              <a
                target="_blank"
                href={
                  `${BASE_URL_LOGIN_SIGNUP}/register`
                }
                className="mb-3"
              >
                {language === "finnish" ? (
                  <button>
                    {data.tender_type === "offer"
                      ? "Rekisteröidy jättääksesi tarjouksen"
                      : "Rekisteröidy ja jätä tarjou"}
                  </button>
                ) : (
                  <button>{t("pages.feed.registerToBid")}</button>
                )}
              </a>
              {language === "finnish" ? (
                <p>
                  Voit jättää tarjouksen ainoastaan rekisteröityneenä käyttäjänä
                </p>
              ) : (
                <p>{t("pages.feed.bidIfRegistered")}</p>
              )}
            </div>
          </article>
          <article className="right_article">
            <h4>{data && data.tender_title}</h4>

            <p>{reqOrOffer}</p>
            <p>{data && data.tender_description}</p>
            <p>
              {language === "finnish" ? "Kategoria" : "Category"}

              <span className="state">{data && data.category}</span>
            </p>
            {data && data.tender_attachment ? (
              <p>
                <a
                  href={`${imageUrl}${IMAGE_PREFIX}${
                    data && data.tender_attachment
                  }`}
                >
                  {data && data.tender_attachment}
                </a>
              </p>
            ) : null}
            {data && data.tender_quantity ? (
              <p>
                {language === "finnish" ? "Tarvittava määrä" : "Volume Needed"}

                <span className="values">
                  {data && data.tender_quantity} {data && data.tender_unit}
                </span>
              </p>
            ) : (
              ""
            )}

            <p className="details_location">
              {language === "finnish" ? "Alue" : "Location"}: <CitiesOrState />
            </p>
            <p>
              {type.length ? type : ""} :{" "}
              <span className="values" style={{ marginLeft: "1rem" }}>
                {language === "finnish" ? "Sisältyy" : "Included"}
              </span>
            </p>
            <p>
              {language === "finnish" ? "Erääntyy" : "Expires in"}:{" "}
              <span className="values" style={{ marginLeft: "1rem" }}>
                {data && data.tender_expiry_date}
              </span>
            </p>
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default FeedDetails;
