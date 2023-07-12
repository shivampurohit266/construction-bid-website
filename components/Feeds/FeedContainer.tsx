import * as React from "react";
import { useLocalization } from "../../utils/localization";
import { MyPagination } from "../Pagination/Pagination";
import { FeedEntry, type Entry } from "./FeedEntry";

// import "./_feed-container.scss";

export type FeedResponse = {
  data: Entry[];
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  current_page: number;
  last_page: number;
  per_page: string;
  total: number;
  to: number;
  from: number;
};

export const FeedPagination = ({
  onPrevPage,
  onNextPage,
  currentPage,
  lastPage,
}: {
  currentPage: number;
  lastPage: number;
  onPrevPage?: () => void;
  onNextPage?: () => void;
}) => {
  const [t] = useLocalization();

  if (!onPrevPage && !onNextPage) {
    return null;
  } else {
    return (
      <div className="feed-container__pagination">
        {onPrevPage ? (
          <a onClick={onPrevPage}>
            {t("pages.feed.prevPage", "Previous page")}
          </a>
        ) : (
          <span>{t("pages.feed.prevPage", "Previous page")}</span>
        )}

        <span>{`${currentPage}/${lastPage}`}</span>
        {onNextPage ? (
          <a onClick={onNextPage}>{t("pages.feed.nextPage", "Next page")}</a>
        ) : (
          <span>{t("pages.feed.nextPage", "Next page")}</span>
        )}
      </div>
    );
  }
};

export const FeedContainer = ({
  ip,
  queryIdx,
  apiUrl,
  imageUrl,
}: {
  ip: any;
  queryIdx: any;
  apiUrl: string;
  imageUrl: string;
}) => {
  const [t, language] = useLocalization();

  const [countryId, setCountryId] = React.useState<any>(72);
  if (ip.country_name == "Spain" && countryId != 195) {
    setCountryId(195);
  } else if (ip.country_name == "Finland" && countryId != 72) {
    setCountryId(72);
  }

  interface query {
    search: string;
    offer_api: number;
    request: number;
    extra_include: Array<number>;
    city: number;
    type: string;
    state: any;
  }

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [feeds, setFeeds] = React.useState<Entry[]>([]);
  const [state, setState] = React.useState<any>("");
  const [feedState, setFeedState] = React.useState<
    "idle" | "loading" | "error"
  >("idle");
  const [query, setQuery] = React.useState<query>({
    search: "",
    offer_api: 1,
    request: 1,
    city: 0,
    extra_include: [],
    type: "",
    state: "",
  });

  const { search, offer_api, city, request, extra_include, type } = query;

  const feedStateRef = React.useRef<any>(null);
  feedStateRef.current = feedState;

  const lastPageRef = React.useRef<any>(null);

  // React.useEffect(() => {
  //   fetch(
  //     `https://appv2.proppu.com/proppu/public/api/state_by_country/${countryId}/${
  //       language === "english" ? "en" : "fi"
  //     }`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     // fetch(`${apiUrl}state/en`, {
  //     //   method: "GET",
  //     // })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setQuery({ ...query, state: data?.data });
  //     });
  // }, []);

  React.useEffect(() => {
    LoadData();
  }, [
    queryIdx,
    offer_api,
    request,
    search,
    type,
    extra_include,
    city,
    currentPage,
  ]);
  React.useEffect(() => {
    // offerRequest();
    getStates();
  }, [countryId, language]);

  const LoadData = () => {
    const data = new FormData();

    extra_include.forEach((tag) => data.set("extra_include[]", tag as any));
    data.set("search", search);
    // data.set("offer", offer_api as any);
    // data.set("request", request as any);
    data.set("state", city as any);
    data.set("type", type);
    if (queryIdx == "1") {
      console.log(queryIdx, "name1");
      data.set("offer", "1");
      data.set("request", "0");
    } else if (queryIdx === "2") {
      console.log(queryIdx, "name2");
      data.set("offer", "0");
      data.set("request", "1");
    } else {
      console.log(queryIdx, "name3");
      data.set("offer", "1");
      data.set("request", "1");
    }

    fetch(`${apiUrl}global_feed${currentPage ? `?page=${currentPage}` : ""}`, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then(({ data, last_page: lastPage }: FeedResponse) => {
        if (data) {
          setFeeds(data);
        } else {
          setFeeds([]);
        }
        lastPageRef.current = lastPage;

        setFeedState("idle");
      })
      .catch(() => {
        setFeedState("error");
      });
  };

  const searchSpace = (e: any) => {
    const { value } = e.target;
    if (e.target.value.length >= 3) {
      setQuery({ ...query, search: value });
    }
    if (!e.target.value.length) {
      setQuery({ ...query, search: value });
    }
  };

  const offerRequest = () => {
    // const { name } = e.target;

    if (queryIdx == "1") {
      console.log(queryIdx, "name1");
      setQuery({ ...query, offer_api: 1, request: 0 });
    } else if (queryIdx === "2") {
      console.log(queryIdx, "name2");
      setQuery({ ...query, ["request"]: 1, ["offer_api"]: 0 });
    } else if (queryIdx === "0") {
      console.log(queryIdx, "name3");
      setQuery({ ...query, ["request"]: 1, ["offer_api"]: 1 });
    }
  };
  console.log(query.offer_api, query.request, "name1122");
  const getStates = () => {
    fetch(
      `${apiUrl}state_by_country/${countryId}/${
        language === "english" ? "en" : language === "spanish" ? "es" : "fi"
      }`,
      {
        method: "GET",
      }
    )
      // fetch(`${apiUrl}state/en`, {
      //   method: "GET",
      // })
      .then((response) => response.json())
      .then((data) => {
        setState(data?.data);
      });
  };
  // const included = (e) => {
  //     if (e.target.checked) {
  //         setQuery({ ...query, extra_include: [...extra_include, e.target.value] });

  //         LoadData();
  //     } else {
  //         const index = extra_include.indexOf(e.target.value);
  //         extra_include.splice(index, 1);
  //         setQuery({ ...query, extra_include: extra_include });
  //         LoadData();
  //     }
  // };

  const changeType: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    if (value === "--Select--") {
      setQuery({ ...query, [name]: "" });

      LoadData();
    } else {
      setQuery({ ...query, [name]: value });
      LoadData();
    }
  };

  if (!feeds || feedState === "loading") {
    return (
      <div className="feed-container feed-container--loading">
        <p>{t("pages.feed.loadingFeeds", "Loading feeds...")}</p>
      </div>
    );
  } else if (feedState === "error") {
    return (
      <div className="feed-container feed-container--error">
        <p>
          {t(
            "pages.feed.thereWasAnError",
            "There was an error while loading the feed!"
          )}
        </p>
        <p>
          <a
            className="feed-container__try-again"
            onClick={() => setFeedState("idle")}
          >
            {t("pages.feed.tryAgain", "Try to load feed again")}
          </a>
        </p>
      </div>
    );
  } else {
    return (
      <div className="feed-container feed-container--list">
        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                            onClick={(e) => offerRequest('offer_api')}
                        >
                            {t("pages.feed.filter.offer")}
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                            onClick={(e) => offerRequest('request')}
                        >
                            {t("pages.feed.filter.request")}
                        </button>
                    </li>
                </ul> */}

        <div className="search-container">
          <h3>{t("pages.feed.filter.searchFilters")}</h3>

          <div className="row search-fields">
            <div className="col-md-12 input-filters-wrap">
              <label>
                {/* {t("pages.feed.filter.search")} */}
                {t("pages.feed.search")}
                <input
                  className="search-input"
                  type="text"
                  placeholder={t("pages.feed.search")}
                  name="search"
                  onChange={(e) => searchSpace(e)}
                />
              </label>
              <label>
                {t("pages.feed.chooseArea")}
                {/* {t("pages.feed.filter.chooseArea")} */}
                <select
                  name="city"
                  className="search-input"
                  onChange={(e) => changeType(e)}
                >
                  <option value="--Select--">
                    {t("pages.feed.chooseArea1")}
                  </option>
                  {state &&
                    state.map((city: any) => (
                      <option key={city.state_id} value={city.state_id}>
                        {city.state_name}
                      </option>
                    ))}
                </select>
              </label>
              <label>
                {t("pages.feed.chooseType")}
                {/* {t("pages.feed.filter.chooseType")} */}
                <select
                  name="type"
                  className="search-input"
                  onChange={(e) => changeType(e)}
                >
                  <option value="--Select--">
                    {t("pages.feed.chooseType1")}
                  </option>
                  <option value="Material">{t("pages.feed.material")}</option>
                  <option value="Work">{t("pages.feed.work")}</option>
                </select>
              </label>
            </div>
            {/* <div className="col-md-4">
                                    <span className="job-type">
                                        <span>{t("pages.feed.filter.select")}</span>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="1"
                                                name="offer_api"
                                                onChange={(e) => offerRequest(e)}
                                            />
                                            {t("pages.feed.filter.offer")}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="2"
                                                name="request"
                                                onChange={(e) => offerRequest(e)}
                                            />
                                            {t("pages.feed.filter.request")}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="2"
                                                onChange={(e) => included(e)}
                                            />
                                            {t("pages.feed.filter.materialIncluded")}
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="1"
                                                onChange={(e) => included(e)}
                                            />
                                            {t("pages.feed.filter.workIncluded")}
                                        </label>
                                    </span>
                                </div> */}
          </div>
        </div>

        {feeds.map((feedEntry) => (
          <FeedEntry
            key={feedEntry.id}
            imageUrl={imageUrl}
            feedEntry={feedEntry}
          />
        ))}
        {feeds && feedState === "idle" ? (
          <div className="mt-2">
            <FeedPagination
              currentPage={currentPage}
              lastPage={lastPageRef.current}
              onNextPage={
                currentPage < lastPageRef.current
                  ? () => setCurrentPage(currentPage + 1)
                  : undefined
              }
              onPrevPage={
                currentPage > 1
                  ? () => setCurrentPage(currentPage - 1)
                  : undefined
              }
            />
          </div>
        ) : null}
      </div>
    );
  }
};
