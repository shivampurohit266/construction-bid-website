import React from "react";
// import "./index.scss";
import axios from "axios";
import NoImgFi from "../../images/no-img-fi.jpg";
import NoImg from "../../images/No-preview.jpg";
import ProppuNoImg from "../../images/blog-placholder.svg";
import { WP_BASE_URL } from "../../utils/constant";
import Moment from "moment";
import { getUiLanguage, useLocalization } from "../../utils/localization";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import { MyPagination } from "../Pagination/Pagination";

const Blog = () => {
  const [t, language] = useLocalization();
  const [blogdata, setBlogData] = React.useState([]);
  const [categorydata, setCategoryData] = React.useState([]);
  const [languageId, setLanguageId] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [tagsdata, setTagsData] = React.useState([]);
  const [activeTag, setActiveTag] = React.useState("");
  const [pageNo, setPageNo] = React.useState<any>(1);
  const [totalPage, setTotalPage] = React.useState<any>(1);
  const [limitPerPage, setLimitPerPage] = React.useState<any>(10);
  const [totalRecords, seTtotalRecords] = React.useState<any>(0);
  const [bannerdata, setBannerData] = React.useState<any>({});
  const [message, setMessage] = React.useState(t("pages.Blog.loading"));
  if(language === 'english' && slug !== "en"){
    setSlug("en")
  }else if(language === "finnish" && slug !== "fi"){
    setSlug("fi")
  }else if(language === "spanish" && slug !== "es"){
    setSlug("es")
  }
  React.useEffect(() => {
    // fetchBlogsData();
    // fetchCategoryData();
    fetchLanguageData();
    fetchBlogData();
    // fetchTagsData();
    // fetchbannerData();
  }, [limitPerPage, pageNo, language, languageId]);
// console.log(languageId,">>>>>>>>>>>>");

const fetchBlogData = async() => {
  if(languageId){
  const data = await axios.get(`${WP_BASE_URL}/posts?language=${languageId}&per_page=${limitPerPage}&page=${pageNo}`);
    setBannerData(data.data.slice(0, 1).pop());
    setBlogData(data.data);
    seTtotalRecords(Number(data.headers["x-wp-total"]));
    setTotalPage(Number(data.headers["x-wp-totalpages"]));
    data.data.length === 0 && setMessage(t("pages.Blog.nodata"));
  }
}
console.log(totalRecords, ">>>>>>>>>>>>>>");

  const fetchLanguageData = async () => {
    const data = await axios.get(`${WP_BASE_URL}/language`);
    let newArray = data?.data.filter(function (el:any)
    { 
      return el.slug === slug
    }
    );
    setLanguageId(newArray[0]?.id)
    
  }

  const fetchBlogsData = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);
    setMessage(t("pages.Blog.loading"));
    const data = await axios.get(
      `${newBasePath}/posts?per_page=${limitPerPage}&page=${pageNo}&categories=31`
    );
    console.log(data);
    setBlogData(data.data);
    seTtotalRecords(Number(Object.values(data.headers)[2]));
    setTotalPage(Number(Object.values(data.headers)[3]));
    data.data.length === 0 && setMessage(t("pages.Blog.nodata"));
  };
  console.log(totalRecords, "record", totalPage, "page", limitPerPage);
  const changePageLimit = (pagelimit: any) => {
    setLimitPerPage(pagelimit);
    setPageNo(1);
    console.log(limitPerPage);

    // fetchBlogsData()
  };
  const changePageNo = (pageNew: any) => {
    setPageNo(pageNew);
    console.log(pageNo);
    // fetchBlogsData()
  };
  const getBlogByTags = async (tagId: any) => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);
    setMessage(t("pages.Blog.loading"));
    const data = await axios.get(
      `${newBasePath}/posts?tags=${tagId}&categories=31`
    );
    data.data.length === 0 && setMessage(t("pages.Blog.nodata"));
    setBlogData(data.data);
    setActiveTag(tagId);
  };

  // const fetchCategoryData = async () => {
  //     const data = await axios.get(`${WP_BASE_URL}/categories`);
  //     setCategoryData(data.data);
  // };

  const fetchTagsData = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);
    const data = await axios.get(`${newBasePath}/tags`);
    setTagsData(data.data);
  };
  const fetchbannerData = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);
    const data = await axios.get(`${newBasePath}/posts?categories=107`);
    // setBannerData(data.data.slice(0, 1).pop());
  };

  // const handleBlogClick = async (blogId) => {
  //     navigate(`/app/blog/${blogId}`);
  // };

  const settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 0,
    // autoplay: true,
    // autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          // dots: true
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="blog-wrapper">
      <div className="">
        {/* <Slider {...settings}>
                {banners?.map((bannerdata, index) => {
                    return (
                        <div className="bk-img">
                        <img src={bannerdata.fimg_url} alt="bk-img-blog"/>
                        <div className="centered">
                            <h2>{bannerdata.title && Parser().parse(bannerdata.title.rendered)}</h2>
                            <p>{Moment(bannerdata.date).format("Do,MMM YY")}2</p>
                            <button className="btn btn-info">
                                <Link className="text-white" to={`/app/blog/${bannerdata.slug}`}>
                                    {t("pages.Blog.bannerButton")}
                                </Link>
                            </button>
                        </div>
                    </div>
                    );
                })}
            </Slider> */}
        {bannerdata?.title && (
          <div className="bk-img">
            {bannerdata?.fimg_url ? (
              <div
                className="blog-bg-img"
                style={{ backgroundImage: `url(${bannerdata.fimg_url})` }}
              ></div>
            ) : // <img src={bannerdata?.fimg_url} alt="bk-img-blog" />
            getUiLanguage() === "english" ? (
              <Image src={NoImg} alt="No image" />
            ) : (
              <Image src={NoImgFi} alt="No image" />
            )}
            <div className="centered">
              <h2 className="text-white">
                <div
                  dangerouslySetInnerHTML={{
                    __html: bannerdata?.title?.rendered,
                  }}
                />
              </h2>
              <p className="text-white">
                {Moment(bannerdata?.date).format("Do,MMM YYYY")}
              </p>
              <button className="btn btn-info">
                <Link
                  className="text-white"
                  href={{
                    pathname: "/blog-details",
                    query: { detail: bannerdata?.slug },
                  }}
                >
                  {t("pages.Blog.bannerButton")}
                </Link>
              </button>
            </div>
          </div>
        )}
        {tagsdata[0] && (
          <div className="tags">
            <span
              className={activeTag === "" ? "active" : ""}
              onClick={() => {
                fetchBlogsData();
                setActiveTag("");
              }}
            >
              All
            </span>
            {tagsdata.map((item: any, key) => {
              return (
                <span
                  key={key}
                  className={item.id == activeTag ? "active" : ""}
                  onClick={() => getBlogByTags(item.id)}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
        )}

        <section className="blog-page">
          <div className="wrapper">
            {/* <div className="col">
                            <ul className="blog-list">
                                <li onClick={() => fetchBlogData()}>All</li>
                                {categorydata.map((item: any , key)=>{
                                return(
                                     <li onClick={() => getBlogByCategory(item.id)}>
                                   
                                        {item.name}
                                    
                                </li>
                                )
                               })}
                            </ul>
                        </div> */}

            <div className="col">
              <div className="blog-grid">
                {blogdata.length !== 0 ? (
                  blogdata.map((item: any, key) => {
                    return (
                      <Link
                        key={key}
                        href={{
                          pathname: "/blog-details",
                          query: { detail: item?.slug },
                        }}
                        className="item"
                        // onClick={() => handleBlogClick(item.id)}
                      >
                        <div className="img-box">
                          {item.fimg_url ? (
                            <Image src={ProppuNoImg} alt="ProppuImg" />
                          ) : getUiLanguage() === "english" ? (
                            <Image src={ProppuNoImg} alt="No image" />
                          ) : (
                            <Image src={ProppuNoImg} alt="No image" />
                          )}
                        </div>

                        <div className="info">
                          <h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item?.title?.rendered,
                              }}
                            />
                          </h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item?.excerpt?.rendered,
                            }}
                          />
                          <p className="date">
                            {Moment(item.date).format("Do,MMM YYYY")}
                          </p>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <h4 className="nodata">{message}</h4>
                )}
              </div>
            </div>
          </div>
          {blogdata.length > 0 && (
            <MyPagination
              page={pageNo}
              totalPage={totalPage}
              totalRecords={totalRecords}
              limit={limitPerPage}
              isLoading={false}
              recordsLength={blogdata.length}
              handleLimitChange={(pagelimit: any) => changePageLimit(pagelimit)}
              handleLoadMoreClick={(pageNew: any) => changePageNo(pageNew)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Blog;
