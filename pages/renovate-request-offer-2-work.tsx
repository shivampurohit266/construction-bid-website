import React, { useState, useReducer } from "react";
import FormLayout from "../components/FormLayout";
import Seo from "../components/Seo";
import { cn } from "../utils/cn";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
  getLanguagePrefix,
} from "../utils/localization";
// import "../styles/form.scss";
import { useFetch } from "../utils/fetchData";
import { reducer } from "../components/Modal/reducer";
import Modal from "../components/Modal/Modal";
import { APP_BASE_URL, BASE_URL } from "../utils/constant";
import Link from "next/link";
// import DatePicker from "react-date-picker";
// import DatePicker from "react-datepicker";
// import { format } from "date-fns";
const MaterialRequirementInput = ({
  className,
  inputType,
  name,
  onChange,
  placeholder,
  required,
  value,
  useTextarea = false,
}: {
  className: string;
  inputType: React.HTMLInputTypeAttribute;
  name: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  required?: boolean;
  value?: string;
  useTextarea?: boolean;
}) => {
  const inputProps = {
    className: cn("contact-us-input", className ?? null),
    name,
    placeholder,
    required,
    type: inputType,
    value,
    onChange: ((event) =>
      onChange((event.target as any).value)) as React.FormEventHandler,
  };
  if (useTextarea) {
    return <textarea {...inputProps} />;
  } else {
    return <input {...inputProps} />;
  }
};

const defaultState = {
  isModalOpen: false,
  modalContent: "",
  status: false,
};

const RequestForm = (props: any) => {
  
  const workFrom2_available_fromDate: any = window.sessionStorage.getItem(
    "workFrom2_available_from"
  );
  const workFrom2_available_toDate: any = window.sessionStorage.getItem(
    "workFrom2_available_to"
  );
  const workFrom2_expireDateFuncDate: any = window.sessionStorage.getItem(
    "workFrom2_expireDateFunc"
  );
  const localQuery =
    (typeof window !== "undefined" &&
      window.sessionStorage.getItem("workFrom2_query")) ||
    "{}";

  const localRate =
    (typeof window !== "undefined" &&
      window.sessionStorage.getItem("workFrom2_rate")) ||
    "{}";

  const [t, language] = useLocalization();
  const [title, setTitle] = useState(
    (typeof window !== "undefined" && window.localStorage.getItem("title")) ||
      ""
  );
  const [rate, setRate] = useState<any>(JSON.parse(localRate));
  const [query, setQuery] = useState<any>(JSON.parse(localQuery));
  const [countryId, setCountryId] = useState<any>(null);
  const [stateId, setStateId] = useState<any>(null);
  const [cityId, setCityId] = useState<any>(null);
  const [categoryId, setCategoryId] = useState<any>(null);
  const [post_expiry_date, setPostExpires] = useState<any>(
    (typeof window !== "undefined" &&
      workFrom2_expireDateFuncDate &&
      workFrom2_expireDateFuncDate) ||
      ""
  );
  // const [required, setRequired] = useState(false);
  const [available_from, setAvailableFrom] = useState<any>(
    (typeof window !== "undefined" &&
      workFrom2_available_fromDate &&
      workFrom2_available_fromDate) ||
      ""
  );
  const [available_to, setAvailableTo] = useState<any>(
    (typeof window !== "undefined" &&
      workFrom2_available_toDate &&
      workFrom2_available_toDate) ||
      ""
  );
  const [description, setDescription] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("description")) ||
      ""
  );
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [loading, error, data] = useFetch(
    `${BASE_URL}/api/category/${language === "english" ? "en" : "fi"}`,
    "GET",
    "body"
  );
  const [loadingState, errorState, dataState] = useFetch(
    `${BASE_URL}/api/state_by_country/${countryId}/${
      language === "english" ? "en" : "fi"
    }`,
    "GET",
    "body"
  );
  const [loadingCity, errorCity, dataCity] = useFetch(
    `${BASE_URL}/api/cityId/${stateId}/${language === "english" ? "en" : "fi"}`,
    "GET",
    "body"
  );
  const [loadingCountry, errorCountry, dataCountry] = useFetch(
    `${BASE_URL}/api/country/${
      language === "english" ? "en" : "fi"
    }`,
    "GET",
    "body"
  );
  // get state id
  dataState?.data.map((state: any) => {
    if (state.state_name === query.state && stateId !== state.state_id) {
      setStateId(state.state_id);
    }
  });
  dataCountry?.data.map((country: any) => {
    if (
      (country.country_name === query.country &&
        countryId !== country.country_id) ||
      (country.country_name === props.ip.country_name &&
        countryId !== country.country_id)
    ) {
      setCountryId(country.country_id);
    }
  });

  // get city id
  dataCity?.data.map((city: any) => {
    if (city.city_name === query.city && cityId !== city.city_id) {
      setCityId(city.city_id);
    }
  });

  // map and filter over the category
  const list = data?.data
    ?.map((category: any) => category)
    ?.filter((ar: any) => ar.category_type === "Work" || "Työ");

  // category_id
  data?.data?.map((category: any) => {
    if (
      category.category_name === query.category &&
      categoryId !== category.category_id
    ) {
      setCategoryId(category.category_id);
    }
  });
  console.log(dataCountry);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };
  const changeType: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;

    if (value === "--Select--") {
      setQuery({ ...query, [name]: "" });
    }
    setQuery({ ...query, [name]: value });
  };
  const changeType2: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (value === "--Select--") {
      setRate({ [name]: "" });
    }

    setRate({
      [name]:
        (value === "Fixed" || "Kiinteä urakka" ? "Fixed" : "") ||
        (value === "Hourly" || "Tuntihinnoittelu" ? "Hourly" : ""),
    });
  };

  if (
    query["category"] === undefined &&
    query["state"] === undefined &&
    query["city"] === undefined &&
    rate === undefined &&
    post_expiry_date === "" &&
    available_from === "" &&
    available_to === ""
  ) {
    // setRequired(true);
  } else if (
    title !== "" &&
    query["category"] !== undefined &&
    query["state"] !== undefined &&
    query["city"] !== undefined &&
    rate !== undefined &&
    post_expiry_date !== "" &&
    description !== "" &&
    available_from !== "" &&
    available_to !== ""
  ) {
    // setRequired(false);
  } else {
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClick = () => {
    if (
      post_expiry_date === "" ||
      available_from === "" ||
      available_to === "" ||
      description === "" ||
      title === "" ||
      stateId === null ||
      categoryId === null ||
      rate === ""
    ) {
      dispatch({ type: "EMPTY_VALUES" });
    } else {
      window.sessionStorage.setItem("workFrom2_query", JSON.stringify(query));
      window.sessionStorage.setItem("workFrom2_expireDateFunc", expireDateFunc);
      window.sessionStorage.setItem("workFrom2_available_from", available_from);
      window.sessionStorage.setItem("workFrom2_available_to", available_to);
      window.sessionStorage.setItem("workFrom2_title", title);
      window.sessionStorage.setItem("workFrom2_description", description);
      window.sessionStorage.setItem("workFrom2_categoryId", categoryId);
      window.sessionStorage.setItem("workFrom2_cityId", cityId);
      window.sessionStorage.setItem("workFrom2_stateId", stateId);
      window.sessionStorage.setItem("workFrom2_countryId", countryId);
      window.sessionStorage.setItem("workFrom2_rate", JSON.stringify(rate));
    }
  };

  const select = language === "english" ? "--Select--" : "-- --";

  function addDays(date: any, days: any) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  const date = new Date(post_expiry_date);
  const expireDate = addDays(date, 30);

  const dateFunc = (expDate: any) => {
    const dateConfig = new Date(expDate);
    const year = dateConfig.toLocaleString("default", { year: "numeric" });
    const month = dateConfig.toLocaleString("default", { month: "2-digit" });
    const dayNum = dateConfig.toLocaleString("default", { day: "2-digit" });

    return `${year}-${month}-${dayNum}`;
  };

  const expireDateFunc = dateFunc(expireDate);

  if (typeof window !== "undefined") {
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
  }
  console.log(
    title,
    query["category"],
    query["state"],
    query["city"],
    query["budget"],
    post_expiry_date,
    description,
    available_from,
    available_to,
    rate.budget,
    "hello"
  );
  let form = null;
  form = (
    <form onSubmit={onSubmit}>
      <div className="form__two-input-fields">
        <div className="form__two-material-wrapper">
          <label style={{ marginBottom: "31px" }}>
            {t("pages.requestOfferForms.textNine")}
          </label>
          <MaterialRequirementInput
            className="material-input"
            inputType="text"
            name="work"
            onChange={setTitle}
            required={true}
            placeholder={
              language === "english"
                ? "Eg bathroom waterproofing"
                : "Kylpyhuoneen vesieristys"
            }
            value={title}
          />
        </div>
        <div className="form__two-wrapper">
          <div className="form__two-category-wrapper">
            <label>{t("pages.requestOfferForms.textTen")}</label>
            <select
              name="category"
              className="category-input"
              onChange={(e) => changeType(e)}
            >
              {query.category ? (
                <option value={query.category}>{query.category}</option>
              ) : (
                <option value="--Select--">{select}</option>
              )}
              {list?.map((category: any, index: number) => (
                <option key={index}>{category.category_name}</option>
              ))}
            </select>
          </div>
          <div className="form__two-budget-wrapper">
            <label>{t("pages.requestOfferForms.textEleven")}</label>
            <select
              name="budget"
              className="budget-input"
              onChange={(e) => changeType2(e)}
            >
              {rate.budget ? (
                <option value={rate.budget}>{rate.budget}</option>
              ) : (
                <option value="--Select--">{select}</option>
              )}
              {[
                { rate: language === "english" ? "Fixed" : "Kiinteä urakka" },
                {
                  rate: language === "english" ? "Hourly" : "Tuntihinnoittelu",
                },
              ].map((rate, index) => (
                <option key={index}>{rate.rate}</option>
              ))}
            </select>
          </div>
          <div className="form__two-budget-wrapper">
            <label>{t("pages.requestOfferForms.selectCountry")}</label>
            <select
              name="country"
              className="budget-input"
              onChange={(e) => changeType(e)}
            >
              {query.country ? (
                <option value={query.country}>{query.country}</option>
              ) : (
                <option value="--Select--">{props.ip.country_name}</option>
              )}
              {dataCountry?.data.map((country: any) => (
                <option key={country.country_id}>{country.country_name}</option>
              ))}
            </select>
          </div>
          <div className="form__two-state-wrapper">
            <label>{t("pages.requestOfferForms.textTwelve")}</label>
            <select
              name="state"
              className="state-input"
              onChange={(e) => changeType(e)}
            >
              {" "}
              {query.state ? (
                <option value={query.state}>{query.state}</option>
              ) : (
                <option value="--Select--">{select}</option>
              )}
              {dataState?.data.map((state: any) => (
                <option key={state.state_id}>{state.state_name}</option>
              ))}
            </select>
          </div>
          <div className="form__two-city-wrapper">
            <label>{t("pages.requestOfferForms.textThirteen")}</label>
            <select
              name="city"
              className="city-input"
              onChange={(e) => changeType(e)}
            >
              {" "}
              {query.city ? (
                <option value={query.city}>{query.city}</option>
              ) : (
                <option value="--Select--">{select}</option>
              )}
              {dataCity?.data.map((city: any) => (
                <option key={city.city_id}>{city.city_identifier}</option>
              ))}
            </select>
          </div>

          <div className="form__two-date-wrapper">
            <label>{t("pages.requestOfferForms.textFourteen")}</label>
            <MaterialRequirementInput
              className="date-input"
              inputType="date"
              name="available_from"
              onChange={setAvailableFrom}
              required={true}
              placeholder="yyyy-mm-dd"
              value={available_from}
            />
            {/* <DatePicker
              name="available_from"
              selected={available_from}
              onChange={(date: any) => setAvailableFrom(date)}
              placeholderText="dd/mm/yyyy"
              isClearable
              dateFormat="dd/MM/yyyy"
            /> */}
          </div>
          <div className="form__two-date-wrapper">
            <label>{t("pages.requestOfferForms.textFifteen")}</label>
            <MaterialRequirementInput
              className="date-input"
              inputType="date"
              name="available_to"
              onChange={setAvailableTo}
              required={true}
              placeholder="yyyy-mm-dd"
              value={available_to}
            />
            {/* <DatePicker
              name="available_to"
              className="date-input"
              selected={available_to}
              onChange={(date: any) => setAvailableTo(date)}
              placeholderText="dd/mm/yyyy"
              isClearable
              dateFormat="dd/MM/yyyy"
            /> */}
          </div>
          <div className="form__two-date-wrapper">
          
            <label>{t("pages.requestOfferForms.textSixteen")}</label>
            <MaterialRequirementInput
              className="date-input"
              inputType="date"
              name="post_expiry_date"
              onChange={setPostExpires}
              required={true}
              placeholder="yyyy-mm-dd"
              value={post_expiry_date}
            />
            {/* <DatePicker
              name="post_expiry_date"
              selected={post_expiry_date}
              onChange={(date: any) => setPostExpires(date)}
              placeholderText="dd/mm/yyyy"
              isClearable
              dateFormat="dd/MM/yyyy"
            /> */}
          </div>
        </div>
        <div className="form__two-description-wrapper">
          <label>{t("pages.requestOfferForms.textSeventeen")}</label>
          <MaterialRequirementInput
            className="description-input"
            inputType="text"
            name="description"
            onChange={setDescription}
            required={true}
            placeholder={
              language === "english"
                ? "Describe your work request..."
                : "Kuvaile työtarpeesi"
            }
            value={description}
          />
        </div>
      </div>
    </form>
  );

  return (
    <FormLayout>
      <Seo
        title={t("pages.contactUs.meta.title", "request-form-2 – Proppu")}
        description={t(
          "pages.contactUs.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />
      <div className="form__two-container">
        <div className="form__two-header">
          <div className="form__modal-box">
            {state.isModalOpen && (
              <Modal
                closeModal={closeModal}
                modalContent={
                  language === "english"
                    ? "Please fill in all the required fields"
                    : "Täytä kaikki tarvittavat tiedot"
                }
                status={false}
              />
            )}
          </div>
          <div className="form__two-text">
            {t("pages.requestOfferForms.textSeven")}
          </div>
          <div className="form__text-subtext">
            {t("pages.requestOfferForms.textEight")}
          </div>
        </div>
        <div>
          <div>{form}</div>
        </div>
        <div className="form__two-btns-container">
          <Link
            className="form__two-previous-btn"
            href={getLanguagePrefix("/renovate-request-offer-1")}
          >
            {language === "english" ? "PREVIOUS" : "EDELLINEN"}
          </Link>
          <Link
            className="form__two-next-btn"
            href={getLanguagePrefix(
              post_expiry_date === "" ||
                available_from === "" ||
                available_to === "" ||
                description === "" ||
                title === "" ||
                stateId === null ||
                categoryId === null ||
                rate === ""
                ? "/renovate-request-offer-2-work"
                : "/renovate-request-offer-3-work"
            )}
            // state={{
            //     query,
            //     expireDateFunc,
            //     available_from,
            //     available_to,
            //     title,
            //     description,
            //     categoryId,
            //     cityId,
            //     stateId,
            //     rate,
            // }}
            onClick={onClick}
          >
            {language === "english" ? "NEXT" : "SEURAAVA"}
          </Link>
        </div>
      </div>
    </FormLayout>
  );
};

export default withPageLanguage(RequestForm);
