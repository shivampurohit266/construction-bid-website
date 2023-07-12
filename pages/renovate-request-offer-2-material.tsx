import React, { useState, useEffect, useReducer } from "react";
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
import Link from "next/link";
import { BASE_URL } from "../utils/constant";
// import DatePicker from "react-datepicker";
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
  const materialForm2_expireDateFuncDate: any = window.sessionStorage.getItem("materialForm2_expireDateFunc")
  const localQuery =
    (typeof window !== "undefined" &&
      window.sessionStorage.getItem("materialForm2_query")) ||
    "{}";
  const [t, language] = useLocalization();

  const [title, setTitle] = useState(
    (typeof window !== "undefined" && window.localStorage.getItem("title")) ||
      ""
  );
  const [description, setDescription] = useState(
    (typeof window !== "undefined" &&
      window.localStorage.getItem("description")) ||
      ""
  );
  const [query, setQuery] = useState<any>(JSON.parse(localQuery));
  const [countryId, setCountryId] = useState<any>(null);
  const [stateId, setStateId] = useState<any>(null);
  const [cityId, setCityId] = useState<any>(null);
  const [quantity, setQuantity] = useState(
    (typeof window !== "undefined" &&
      window.sessionStorage.getItem("materialForm2_quantity")) ||
      ""
  );
  // const [required, setRequired] = useState<any>(false);
  const [categoryId, setCategoryId] = useState<any>(null);
  const [post_expiry_date, setPostExpires] = useState<any>(
    (typeof window !== "undefined" &&
    materialForm2_expireDateFuncDate &&
    materialForm2_expireDateFuncDate) ||
      ""
  );
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [loading, error, data] = useFetch(
    `${BASE_URL}/api/category/${
      language === "english" ? "en" : "fi"
    }`,
    "GET",
    "body"
  );
  //   console.log(loading, error, data);
  const [loadingState, errorState, dataState] = useFetch(
    `${BASE_URL}/api/state_by_country/${countryId}/${
      language === "english" ? "en" : "fi"
    }`,
    "GET",
    "body"
  );
  const [loadingCity, errorCity, dataCity] = useFetch(
    `${BASE_URL}/api/cityId/${stateId}/${
      language === "english" ? "en" : "fi"
    }`,
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

  // get country id
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
  // get state id
  dataState?.data.map((state: any) => {
    if (state.state_name === query.state && stateId !== state.state_id) {
      setStateId(state.state_id);
    }
  });

  // get city id
  dataCity?.data.map((city: any) => {
    if (city.city_name === query.city && city.city_id !== cityId) {
      setCityId(city.city_id);
    }
  });

  // map and filter over the category
  const list = data?.data
    ?.map((category: any) => category)
    ?.filter((ar: any) => ar.category_type === "Material" || "Materiaali");

  // category_id
  data?.data?.map((category: any) => {
    if (
      category.category_name === query.category &&
      categoryId !== category.category_id
    ) {
      console.log(query.category, "category");
      setCategoryId(category.category_id);
    }
  });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };
  const changeType: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (value === "--Select--") {
      setQuery({ ...query, [name]: "" });
    }

    setQuery({ ...query, [name]: value });
  };
  const select = language === "english" ? "--Select--" : "-- --";

  if (
    query["category"] === undefined &&
    query["unit"] === undefined &&
    query["state"] === undefined &&
    query["city"] === undefined &&
    quantity === "" &&
    post_expiry_date === ""
  ) {
    // setRequired(true);
  } else if (
    title !== "" &&
    query["category"] !== undefined &&
    query["unit"] !== undefined &&
    query["state"] !== undefined &&
    query["city"] !== undefined &&
    quantity !== "" &&
    post_expiry_date !== "" &&
    description !== ""
  ) {
    // setRequired(false);
  } else {
  }

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClick = () => {
    if (
      quantity === "" ||
      post_expiry_date === "" ||
      description === "" ||
      stateId === null ||
      categoryId === null
    ) {
      // setRequired(true);
      dispatch({ type: "EMPTY_VALUES" });
    } else {
      window.sessionStorage.setItem(
        "materialForm2_query",
        JSON.stringify(query)
      );
      window.sessionStorage.setItem("materialForm2_quantity", quantity);
      window.sessionStorage.setItem("materialForm2_description", description);
      window.sessionStorage.setItem("materialForm2_categoryId", categoryId);
      window.sessionStorage.setItem("materialForm2_title", title);
      window.sessionStorage.setItem(
        "materialForm2_expireDateFunc",
        expireDateFunc
      );
      window.sessionStorage.setItem("materialForm2_countryId", countryId);
      window.sessionStorage.setItem("materialForm2_stateId", stateId);
      window.sessionStorage.setItem("materialForm2_cityId", cityId);
    }
  };

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
            name="material"
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
              required
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
          <div className="form__two-quantity-wrapper">
            <label>{t("pages.requestOfferForms.textNineteen")}</label>
            <MaterialRequirementInput
              className="quantity-input"
              inputType="text"
              name="quantity"
              onChange={setQuantity}
              required={true}
              placeholder=""
              value={quantity}
            />
          </div>
          <div className="form__two-unit-wrapper">
            <label>{t("pages.requestOfferForms.textTwenty")}</label>
            <select
              name="unit"
              className="unit-input"
              onChange={(e) => changeType(e)}
            >
              {query.unit ? (
                <option value={query.unit}>{query.unit}</option>
              ) : (
                <option value="--Select--">{select}</option>
              )}
              {[
                { unitMeasure: "Kg" },
                { unitMeasure: "M2" },
                { unitMeasure: "Liter" },
                { unitMeasure: "Pcs" },
              ].map((unit, index) => (
                <option key={index}>{unit.unitMeasure}</option>
              ))}
            </select>
          </div>
          <div className="form__two-state-wrapper">
            <label>{t("pages.requestOfferForms.selectCountry")}</label>
            <select
              name="country"
              className="state-input"
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
            <label>{t("pages.requestOfferForms.textSixteen")}</label>
            <MaterialRequirementInput
              className="date-input"
              inputType="date"
              name="date"
              onChange={setPostExpires}
              placeholder="dd-mm-yyyy"
              value={post_expiry_date}
            />
            {/* <DatePicker
              name="date"
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
                ? "Describe your material request..."
                : "Kuvaile materiaalipyyntöäsi"
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
            {t("pages.requestOfferForms.textTwentyOne")}
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
            href={
              quantity === "" ||
              post_expiry_date === "" ||
              description === "" ||
              stateId === null ||
              categoryId === null
                ? { pathname: "/renovate-request-offer-2-material" }
                : {
                    pathname: "/renovate-request-offer-3-material",
                    // query: {
                    //   query,
                    //   quantity,
                    //   description,
                    //   categoryId,
                    //   title,
                    //   expireDateFunc,
                    //   stateId,
                    //   cityId,
                    // },
                  }
            }
            // state={{
            //   query,
            //   quantity,
            //   description,
            //   categoryId,
            //   title,
            //   expireDateFunc,
            //   stateId,
            //   cityId,
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
