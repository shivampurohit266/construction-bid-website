import React, { useState, useReducer, useContext } from "react";
import FormLayout from "../components/FormLayout";
import Seo from "../components/Seo";
import { cn } from "../utils/cn";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
  getLanguagePrefix,
} from "../utils/localization";
// import { Link } from "gatsby";
// import "../styles/form.scss";
import axios from "axios";
import { reducer } from "../components/Modal/reducer";
import Modal from "../components/Modal/Modal";
// import { navigate } from "gatsby";
import {
  createWebMaterialRequest,
  createWebWorkRequest,
} from "../services/api";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../AppContext";
import { BASE_URL, origin, proppuUrl } from "../utils/constant";

const MaterialRequirementInput = ({
  className,
  inputType,
  name,
  onChange,
  required,
  value,
}: {
  className: string;
  inputType: React.HTMLInputTypeAttribute;
  name: string;
  onChange: (newValue: string) => void;
  required?: boolean;
  value?: string;
}) => {
  const inputProps = {
    className: cn("form__four-input", className ?? null),
    name,
    required,
    type: inputType,
    value,
    onChange: ((event) =>
      onChange((event.target as any).value)) as React.FormEventHandler,
  };
  return <input {...inputProps} />;
};

const defaultState = {
  isModalOpen: false,
  modalContent: "",
  status: false,
};

const RequestForm = (props: any, { location }: any) => {
  const values = useContext(AppContext);
  const router = useRouter();
  const datas = router.query;
  console.log(datas?.file, "propsData");
  const [t, language] = useLocalization();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [status, setStatus] = useState(false);
  const [required, setRequired] = useState(false);
  const [disable, setDisable] = useState<boolean>(false);
  const value =
    typeof window !== "undefined" && window.localStorage.getItem("value");
  // const origin = typeof window !== "undefined" && window?.location.origin;
  const [state, dispatch] = useReducer(reducer, defaultState);
  const langParam = language === "english" ? "en" : "fi";
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  // const proppuUrl = "https://proppu.com";
  const workUrl =
    `${BASE_URL}/api/web-work-request/create`;
  const materialUrl =
    `${BASE_URL}/api/web-material-request/create`;

  const workFormData: any = {
    workFrom2_query: window.sessionStorage.getItem("workFrom2_query"),
    workFrom2_title: window.sessionStorage.getItem("workFrom2_title"),
    workFrom2_categoryId: window.sessionStorage.getItem("workFrom2_categoryId"),
    workFrom2_description: window.sessionStorage.getItem(
      "workFrom2_description"
    ),
    workFrom2_stateId: window.sessionStorage.getItem("workFrom2_stateId"),
    workFrom2_rate: window.sessionStorage.getItem("workFrom2_rate"),
    workFrom2_available_from: window.sessionStorage.getItem(
      "workFrom2_available_from"
    ),
    workFrom2_available_to: window.sessionStorage.getItem(
      "workFrom2_available_to"
    ),
    workFrom2_expireDateFunc: window.sessionStorage.getItem(
      "workFrom2_expireDateFunc"
    ),
    workFrom2_cityId: window.sessionStorage.getItem("workFrom2_cityId"),
    workFrom2_countryId: window.sessionStorage.getItem("workFrom2_countryId"),
    workForm3_file: window.sessionStorage.getItem("workForm3_file"),
    workForm3_attachment: window.sessionStorage.getItem("workForm3_attachment"),
  };
  const workForm3_attachment: any = JSON.parse(
    workFormData.workForm3_attachment
  );
  const workForm3_fi: any = JSON.parse(workFormData.workForm3_file);
  // const fileTypeAttach = (workForm3_fi?.path).split(".");
  // const newImage: any = new File(
  //   [workForm3_fi?.preview + workForm3_fi.preview + workForm3_fi.preview],
  //   workForm3_fi?.path,
  //   { type: `image/${fileTypeAttach[1]}` }
  // );
  // newImage.path = workForm3_fi.path;
  // newImage.preview = workForm3_fi.preview;
  // console.log(newImage, "MyFileee");
  const workForm3_file: any = JSON.parse(workFormData.workForm3_file);
  const workFrom2_rate: any = JSON.parse(workFormData.workFrom2_rate);
  const workFrom2_query: any = JSON.parse(workFormData.workFrom2_query);

  const materialFormData: any = {
    materialForm2_title: window.sessionStorage.getItem("materialForm2_title"),
    materialForm2_categoryId: window.sessionStorage.getItem(
      "materialForm2_categoryId"
    ),
    materialForm2_description: window.sessionStorage.getItem(
      "materialForm2_description"
    ),
    materialForm2_quantity: window.sessionStorage.getItem(
      "materialForm2_quantity"
    ),
    materialForm2_query: window.sessionStorage.getItem("materialForm2_query"),
    materialForm2_stateId: window.sessionStorage.getItem(
      "materialForm2_stateId"
    ),
    materialForm2_expireDateFunc: window.sessionStorage.getItem(
      "materialForm2_expireDateFunc"
    ),
    materialForm2_cityId: window.sessionStorage.getItem("materialForm2_cityId"),
    materialForm2_countryId: window.sessionStorage.getItem(
      "materialForm2_countryId"
    ),
    materialForm3_file: window.sessionStorage.getItem("materialForm3_file"),
    materialForm3_attachment: window.sessionStorage.getItem(
      "materialForm3_attachment"
    ),
  };

  const materialForm2_query: any = JSON.parse(
    materialFormData.materialForm2_query
  );
  const materialForm3_file: any = JSON.parse(
    materialFormData.materialForm3_file
  );
  const materialForm3_attachment: any = JSON.parse(
    materialFormData.materialForm3_attachment
  );
  console.log("dataaaa", values.state.featuredImage);

  const uploadRequest = async () => {
    //if ((value === "Work" || "Työ") && (value !== "Materiaali" || "Material")) {
    if (
      (langParam === "fi" && value === "Työ") ||
      (langParam === "en" && value === "Work")
    ) {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("email", email);
      formData.append("title", workFormData?.workFrom2_title);
      formData.append("categoryId", workFormData?.workFrom2_categoryId);
      formData.append("description", workFormData?.workFrom2_description);
      formData.append("state", workFormData?.workFrom2_stateId);
      formData.append("budget", workFrom2_rate?.budget);
      formData.append("available_from", workFormData?.workFrom2_available_from);
      formData.append("available_to", workFormData?.workFrom2_available_to);
      formData.append(
        "post_expiry_date",
        workFormData?.workFrom2_expireDateFunc
      );
      formData.append("city", workFormData?.workFrom2_cityId);
      formData.append("featured_image", values?.state?.featuredImage);
      formData.append("language", langParam);
      formData.append("country_name_ip", props?.ip?.country_name);
      formData.append("country_id", workFormData?.workFrom2_countryId);
      values?.state?.attachment?.forEach((file: any) => {
        formData.append("attachment", file);
      });
      // for (const key of Object.keys("null" || values)) {
      //   formData.append(
      //     "attachment",
      //     workForm3_attachment[key])
      // }

      try {
        //const res = await createWebWorkRequest(formData);
        const res = await axios.post(
          workUrl,
          formData
        );
        if (res.status === 201) {
          // router.push("/renovate-request-offer-1");
          setStatus(true);
          dispatch({ type: "SUCCESS" });
          setName("");
          setEmail("");
          localStorage.clear();
          sessionStorage.clear();
          router.push("/feed")
        } else {
          setStatus(false);
          dispatch({ type: "ERROR" });
          dispatch({ type: "EMPTY_VALUES" });
        }
      } catch (error) {
        console.log(error);
        setStatus(false);
        dispatch({ type: "ERROR" });
      }
    } else if (
      (langParam === "fi" && value === "Materiaali") ||
      (langParam === "en" && value === "Material")
    ) {
      const materialForm = new FormData();
      materialForm.append("first_name", name);
      materialForm.append("email", email);
      materialForm.append("title", materialFormData?.materialForm2_title);
      materialForm.append(
        "categoryId",
        materialFormData?.materialForm2_categoryId
      );
      materialForm.append(
        "description",
        materialFormData?.materialForm2_description
      );
      materialForm.append("quantity", materialFormData?.materialForm2_quantity);
      materialForm.append("unit", materialForm2_query?.unit);
      materialForm.append("country_name_select", materialForm2_query?.country);
      materialForm.append("state", materialFormData?.materialForm2_stateId);
      materialForm.append(
        "post_expiry_date",
        materialFormData?.materialForm2_expireDateFunc
      );
      materialForm.append("city", materialFormData?.materialForm2_cityId);
      materialForm.append("featured_image", values?.state?.featuredImage);
      materialForm.append("language", langParam);
      materialForm.append("country_name_ip", props?.ip?.country_name);
      materialForm.append(
        "country_id",
        materialFormData?.materialForm2_countryId
      );
      values?.state?.attachment?.forEach((file: any) => {
        materialForm.append("attachment", file);
      });
      // for (const key of Object.keys("null" || materialForm3_attachment)) {
      //   materialForm.append(
      //     "attachment",
      //     new Blob([materialForm3_attachment[key]], {
      //       type: "application/octet-stream",
      //     })
      //   );
      // }

      try {
        //const res = await createWebMaterialRequest(materialForm);
        const res = await axios.post(
          materialUrl,
          materialForm
        );

        if (res.status === 201) {
          setStatus(true);
          dispatch({ type: "SUCCESS" });
          localStorage.clear();
          sessionStorage.clear();
          setEmail("");
          setName("");
          redirect();
          router.push("/feed")
        } else {
          setStatus(false);
          dispatch({ type: "ERROR" });
          dispatch({ type: "EMPTY_VALUES" });
        }
      } catch (error) {
        console.log(error);
        setStatus(false);
        dispatch({ type: "ERROR" });
      }
    } else {
      const formData = new FormData();
      formData.append("first_name", name);
      formData.append("email", email);
      formData.append("title", workFormData?.workFrom2_title);
      formData.append("categoryId", workFormData?.workFrom2_categoryId);
      formData.append("description", workFormData?.workFrom2_description);
      formData.append("state", workFormData?.workFrom2_stateId);
      formData.append("budget", workFrom2_rate?.budget);
      formData.append("available_from", workFormData?.workFrom2_available_from);
      formData.append("available_to", workFormData?.workFrom2_available_to);
      formData.append(
        "post_expiry_date",
        workFormData?.workFrom2_expireDateFunc
      );
      formData.append("city", workFormData?.workFrom2_cityId);
      formData.append("featured_image", values?.state?.featuredImage);
      formData.append("language", langParam);
      formData.append("country_id", workFormData?.workFrom2_countryId);
      formData.append("country_name", props?.ip?.country_name);
      values?.state?.attachment?.forEach((file: any) => {
        formData.append("attachment", file);
      });
      // for (const key of Object.keys("null" || workForm3_attachment)) {
      //   formData.append(
      //     "attachment",
      //     new Blob([workForm3_attachment[key]], {
      //       type: "application/octet-stream",
      //     })
      //   );
      // }
      formData.append("extra", "1");

      try {
        console.log("both");
        const res = await axios.post(
          workUrl,
          formData
        );
        // const res = await createWebWorkRequest(formData);
        if (res.status === 201) {
          setStatus(true);
          dispatch({ type: "SUCCESS" });
          localStorage.clear();
          sessionStorage.clear();
          setEmail("");
          setName("");
          redirect();
          router.push("/feed")
        } else {
          setStatus(false);
          dispatch({ type: "ERROR" });
          dispatch({ type: "EMPTY_VALUES" });
        }
      } catch (error) {
        console.log(error);
        setStatus(false);
        dispatch({ type: "ERROR" });
      }
    }
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  if (name === "" && email === "" && checkbox === false) {
    // setRequired(true);
    // setCheckbox(false);
  } else if (name !== "" && email !== "" && checkbox === true) {
    // setRequired(false);
    // setCheckbox(true);
  } else {
  }
  console.log(required);
  const modalTwo = (
    <div className="form__modal-box" style={{ textAlign: "center" }}>
      {state.isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalContent={
            language === "english"
              ? "Only consumer account holder can create request here, professional and individual can use the APP."
              : "Tarjouspyynnön jättäminen tällä sivulla on tarkoitettu kuluttajille ja taloyhtiöille. Yritykset voivat rekisteröityä käyttäjiksi kattavampaan palveluun kotisivuillamme ja jättää tarjouspyynnön siellä."
          }
          status={false}
        />
      )}
    </div>
  );
  const modalThree = (
    <div className="form__modal-box" style={{ textAlign: "center" }}>
      {state.isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalContent={
            language === "english"
              ? "Please fill in all required fields."
              : "Täytä kaikki tarvittavat tiedot"
          }
          status={false}
        />
      )}
    </div>
  );

  const modalOne = (
    <div className="form__modal-box" style={{ textAlign: "center" }}>
      {state.isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalContent={
            language === "english"
              ? "Your request was submitted successfully!"
              : "Tarjouspyyntösi on julkaistu!"
          }
          status={true}
        />
      )}
    </div>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
  };
  const redirect = () => {
    setTimeout(() => {
      // window.history.push("https://www.proppu.com/feed/");
    }, 4000);
  };

  console.log(!required, checkbox, disable, status);
  let form = null;
  form = (
    <form onSubmit={onSubmit}>
      <div className="form__four-input-fields">
        <div className="form__four-registration-wrapper">
          <div className="form__four-registration-name">
            <label>{language === "english" ? "First Name" : "Etunimi"}</label>
            <MaterialRequirementInput
              className="registration__password-input"
              inputType="text"
              name="password"
              onChange={setName}
              required={true}
              value={name}
            />
          </div>
          <div className="form__four-registration-email">
            <label>
              {language === "english" ? "Email Address" : "Sähköpostiosoite"}
            </label>
            <MaterialRequirementInput
              className="registration__email-input"
              inputType="text"
              name="email"
              onChange={setEmail}
              required={true}
              value={email}
            />
          </div>
        </div>
        <input
          style={{ marginTop: "30px" }}
          type="checkbox"
          name="checkbox"
          required
          onChange={(e) => handleChange(e)}
        />
        <label>
          {" "}
          {language === "english"
            ? "I have read and accept the"
            : "Olen lukenut ja hyväksyn"}{" "}
          <span>
            <Link
              href={getLanguagePrefix("/terms-service")}
              className="proppu-footer__link"
            >
              {t("footer.terms", "terms")}
            </Link>{" "}
          </span>{" "}
          {language === "english" ? "of use and the" : "ja"}{" "}
          <span>
            {" "}
            <Link
              href={getLanguagePrefix("/our-privacy")}
              className="proppu-footer__link"
            >
              {t("footer.privacy", "privacy statement")}
            </Link>
          </span>{" "}
          *
        </label>
        <br></br>
      </div>
    </form>
  );
  return (
    <FormLayout>
      <Seo
        title={t("pages.contactUs.meta.title", "request-form-4 – Proppu")}
        description={t(
          "pages.contactUs.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />

      {window.location.origin === "https://proppu.com" &&
      (props.ip.country_name === "Finland" ||
        props.ip.country_name === "Spain" ||
        props.ip.country_name === "") ? (
        <div className="form__four-container">
          <div className="form__four-wrapper">
            {status ? modalOne : required ? modalThree : modalTwo}
            <div className="form__four-header">
              <div className="form__four-text">
                {t("pages.requestOfferForms.textThirtyOne")}
              </div>
              <div className="form__four-subtext">
                {t("pages.requestOfferForms.textThirtyTwo")}{" "}
              </div>
            </div>
            <div>{form}</div>

            <div className="form__four-btns-container">
              <button
                className="form__four-publish-btn"
                type="submit"
                disabled={disable}
                onClick={uploadRequest}
              >
                {language === "english"
                  ? "PUBLISH REQUEST"
                  : "Julkaise tarjouspyyntö"}
              </button>
              <Link
                className="form__four-edit-btn"
                href={getLanguagePrefix("/renovate-request-offer-1")}
              >
                &#x3c;{" "}
                {language === "english"
                  ? "EDIT YOUR REQUEST"
                  : "Takaisin alkuun"}
              </Link>
            </div>
          </div>
        </div>
      ) : window.location.origin !== "https://proppu.com" &&
        (props.ip.country_name === "Finland" ||
          props.ip.country_name === "Spain" ||
          props.ip.country_name === "Greece" ||
          props.ip.country_name === "India") ? (
        <div className="form__four-container">
          <div className="form__four-wrapper">
            {status ? modalOne : required ? modalThree : modalTwo}
            <div className="form__four-header">
              <div className="form__four-text">
                {t("pages.requestOfferForms.textThirtyOne")}
              </div>
              <div className="form__four-subtext">
                {t("pages.requestOfferForms.textThirtyTwo")}{" "}
              </div>
            </div>
            <div>{form}</div>

            <div className="form__four-btns-container">
              <button
                className="form__four-publish-btn"
                type="submit"
                disabled={disable}
                onClick={uploadRequest}
              >
                {language === "english"
                  ? "PUBLISH REQUEST"
                  : "Julkaise tarjouspyyntö"}
              </button>
              <Link
                className="form__four-edit-btn"
                href={getLanguagePrefix("/renovate-request-offer-1")}
              >
                &#x3c;{" "}
                {language === "english"
                  ? "EDIT YOUR REQUEST"
                  : "Takaisin alkuun"}
              </Link>
            </div>
          </div>
        </div>
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

      {/* {props.ip.country_name === "Finland" ||
      props.ip.country_name === "Spain" ||
      props.ip.country_name === "Greece" ||
      props.ip.country_name === "India" ? (
        <div className="form__four-container">
          <div className="form__four-wrapper">
            {status ? modalOne : required ? modalThree : modalTwo}
            <div className="form__four-header">
              <div className="form__four-text">
                {t("pages.requestOfferForms.textThirtyOne")}
              </div>
              <div className="form__four-subtext">
                {t("pages.requestOfferForms.textThirtyTwo")}{" "}
              </div>
            </div>
            <div>{form}</div>

            <div className="form__four-btns-container">
              <button
                className="form__four-publish-btn"
                type="submit"
                disabled={disable}
                onClick={uploadRequest}
              >
                {language === "english"
                  ? "PUBLISH REQUEST"
                  : "Julkaise tarjouspyyntö"}
              </button>
              <Link
                className="form__four-edit-btn"
                href={getLanguagePrefix("/renovate-request-offer-1")}
              >
                &#x3c;{" "}
                {language === "english"
                  ? "EDIT YOUR REQUEST"
                  : "Takaisin alkuun"}
              </Link>
            </div>
          </div>
        </div>
      ) : !props.ip ? (
        <div className="form__text-content">
          <div className="form__text--one">Lodding....</div>{" "}
        </div>
      ) : (
        <main
          style={{
            marginBottom: "40px",
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
                <Link
                  className="form__cancel-btn ms-4"
                  href={getLanguagePrefix("/")}
                >
                  {language === "english" ? "Back to home" : "Takaisin kotiin"}
                </Link>
              </div>
            </div>
          </div>
        </main>
      )} */}
    </FormLayout>
  );
};

export default withPageLanguage(RequestForm);
