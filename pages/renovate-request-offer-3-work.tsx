import React, { useContext, useEffect, useState } from "react";
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
import Upload from "../images/upload-thumbnail.png";
import Attachment from "../images/clarity_attachment-line.png";
import Link from "next/link";
// import Files from "react-files";
import Dropzone, { useDropzone } from "react-dropzone";
import Image from "next/image";
import axios from "axios";
import AppContext from "../AppContext";
import { BASE_URL } from "../utils/constant";
import { log } from "console";
import Questionnaire from "../components/Questionnaire";
import { ProgressBar } from "react-bootstrap";

const MaterialRequirementInput = ({
  className,
  useTextarea = true,
  name,
  onChange,
  placeholder,
  required,
  value,
}: {
  className: string;
  useTextarea?: boolean;
  name: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  required?: boolean;
  value?: string;
}) => {
  const inputProps = {
    className: cn("form__three-input", className ?? null),
    useTextarea,
    name,
    placeholder,
    required,
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

const RequestForm = (props: any) => {
  const values = useContext(AppContext);
  const [t, language] = useLocalization();
  const [message, setMessage] = React.useState(
    (typeof window !== "undefined" && window.localStorage.getItem("message")) ||
      ""
  );

  const [file, setFile] = useState<any>(Upload);
  const [upload, setUpload] = useState(0);
  const [fileName, setFileName] = useState<any>([]);
  const [uploadAttachment, setUploadAttachment] = useState(false);
  const [attachment, setAttachement] = useState<any>(Attachment);
  const [questionnaire, setQuestionnaire] = useState<any>([]);
  const [category_id, setCategory_id] = useState<any>(
    window.sessionStorage.getItem("workFrom2_categoryId")
  );
  // console.log("file", file);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };
  // console.log(file, "fileName");

  useEffect(() => {
    getQuestionnaire();
  }, [category_id, language]);
  const getQuestionnaire = async () => {
    if (category_id && language) {
      await axios
        .get(
          `${BASE_URL}/api/tender/get_questions/${category_id}/${
            language === "english" ? "en" : language === "finnish" ? "fi" : "es"
          }`
        )
        .then((res) => {
          if (res?.data?.data) {
            console.log(res?.data?.data, ">>>");
            setQuestionnaire(res?.data?.data);
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onFilesChange = (files: any) => {
    values.setfeaturedImage(files[0]);
    if (files[0]) {
      setFile(
        Object.assign(files[0], {
          preview: URL.createObjectURL(files[0]),
        })
      );
      setUpload(50);
      setTimeout(() => {
      setUpload(80);
      }, 1000);
      setTimeout(() => {
      setUpload(100);
      }, 1500);
    }
  };
  const onFileAttachment = (files: any) => {
    if (files) {
      values.setattachment(files);
      files.map((file: any) => {
        console.log(file);
        fileName.push(file);
        setAttachement(file);
        setUploadAttachment(true);
      });
    }
  };

  fileName.forEach((file: any) => {
    if (file?.preview === undefined) {
      var blob = new Blob([file], { type: "octet/stream" });
      const doc = URL.createObjectURL(blob);
      file.preview = doc;
    }
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("message", message);
  }

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
  const workFrom2_rate: any = JSON.parse(workFormData.workFrom2_rate);

  const setItemsToStorage = async () => {
    window.sessionStorage.setItem("workForm3_message", message);
    window.sessionStorage.setItem("workForm3_file", JSON.stringify(file));
    const attachment = fileName.map(
      (attachment: any, index: number) => attachment
    );
    window.sessionStorage.setItem(
      "workForm3_attachment",
      JSON.stringify(attachment)
    );
  };

  let form = null;
  form = (
    <form onSubmit={onSubmit}>
      <div className="form__three-input-fields">
        <div className="form__three-material-wrapper">
          <label style={{ marginBottom: "31px" }}>
            {t("pages.requestOfferForms.textTwentyNine", "")}
          </label>
          <MaterialRequirementInput
            className="form__message-input"
            name="message"
            onChange={setMessage}
            useTextarea={true}
            required={true}
            value={message}
            placeholder={
              language === "english"
                ? "Eg bathroom waterproofing"
                : "Voit kertoa tässä esimerkiksi milloin kohdetta pääsee katsomaan"
            }
          />
          <div>{t("pages.requestOfferForms.textTwentyFive")}</div>
        </div>
        <div className="form__three-thumbnail-wrapper">
          <div className="form__three-image-wrapper">
            {/* <Files
                            className="files-dropzone"
                            onChange={(e) => onFilesChange(e)}
                            accepts={[
                                "image/gif",
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                                ".svg",
                                ".docx",
                                ".doc",
                            ]}
                            multiple={false}
                            maxFileSize={3145757}
                            minFileSize={10}
                            clickable
                        >
                            <label htmlFor="attachment">
                                <img
                                    style={{ width: "150px", height: "150px" }}
                                    src={!upload ? file : file?.preview.url}
                                />
                            </label>
                        </Files> */}

            {/* <div {...getRootProps({ className: "file-dropzone" })}>
              <input
                {...getInputProps()}
                multiple={false}
                accept={[
                  "image/gif",
                  "image/jpeg",
                  "image/png",
                  "image/jpg",
                  ".svg",
                  ".docx",
                  ".doc",
                ]}
              />
              <label htmlFor="attachment">
                {upload ? (
                  <Image
                    width={150}
                    height={150}
                    src={file.preview}
                  />
                ) : (
                  <Image
                    width={150}
                    height={150}
                    src={file}
                  />
                )}
                <Image
                  style={{ width: "150px", height: "150px" }}
                  src={!upload ? file : file?.preview}
                />
              </label>
            </div> */}
            <Dropzone
              // onDrop={(acceptedFiles) => {
              //   if (acceptedFiles[0]) {
              //     setFile(
              //       Object.assign(acceptedFiles[0], {
              //         preview: URL.createObjectURL(acceptedFiles[0]),
              //       })
              //     );
              //     setUpload(true);
              //   }
              // }}
              onDrop={(e) => onFilesChange(e)}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "file-dropzone" })}>
                  <input {...getInputProps()} />
                  <label htmlFor="attachment">
                    {upload ? (
                      <>
                      <Image
                        width={150}
                        height={150}
                        src={file.preview}
                        alt=""
                      />
                      <ProgressBar className="mt-2" striped now={upload} label={`${upload}%`} />
                      </>
                    ) : (
                      <Image width={150} height={150} src={file} alt="" />
                    )}
                  </label>
                </div>
              )}
            </Dropzone>

            <label className="form__three-thumbnail-text">
              {" "}
              {language === "english" ? "Upload Image" : "Lataa kuva"}
            </label>
          </div>
          <div className="form__three-thumbnail-subtext">
            {t("pages.requestOfferForms.textTwentySix", "")}
          </div>
        </div>
        <div className="form__three-attachment-wrapper">
          <div className="form__three-header">
            {language === "english" ? "Attachment" : "Liite"}
          </div>
          <div className="form__three-icon-wrapper">
            <div>
              {/* <Files
                                className="files-dropzone"
                                onChange={(e) => onFileAttachment(e)}
                                accepts={[
                                    "image/gif",
                                    "image/jpeg",
                                    "image/png",
                                    ".pdf",
                                    ".doc",
                                    ".docx",
                                ]}
                                multiple={true}
                                maxFileSize={3145757}
                                minFileSize={10}
                                clickable
                            >
                                <img
                                    className="form__three-image"
                                    src={!uploadAttachment ? attachment : ""}
                                />
                            </Files> */}
              <Dropzone
                // onDrop={(acceptedFiles) => {
                //   if (acceptedFiles) {
                //     acceptedFiles.map((file) => {
                //       console.log(file);
                //       fileName.push(file);
                //       setAttachement(
                //         Object.assign(file, {
                //           preview: URL.createObjectURL(file),
                //         })
                //       );
                //       setUploadAttachment(true);
                //     });
                //   }
                // }}
                onDrop={(e) => onFileAttachment(e)}
                multiple={true}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "d-flex" })}>
                    <input {...getInputProps()} />
                    <label htmlFor="attachment" className="pt-2 pb-2">
                      {uploadAttachment ? null : (
                        <Image src={attachment} alt="" />
                      )}
                    </label>
            <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
              {!uploadAttachment
                ? language === "english"
                  ? "Add pictures or document"
                  : "Lisää kuva tai asiakirja"
                : fileName?.map((file: any) => (
                    <li key={file.name}>{file.name}</li>
                  ))}
            </ul>
                  </div>
                )}
              </Dropzone>
            </div>
          </div>

          <div style={{ marginTop: "9px" }}>
            {t("pages.requestOfferForms.textTwentySeven", "")}
          </div>
          <input style={{ marginTop: "30px" }} type="checkbox" />
          <label>{t("pages.requestOfferForms.textThirty", "")}</label>
          <br></br>
        </div>
      </div>
      <hr />
      <Questionnaire questionnaire={questionnaire} />

      <div>{}</div>
      <div className="form__three-btns-container">
        <Link
          className="form__three-previous-btn"
          href={getLanguagePrefix("/renovate-request-offer-2-work")}
        >
          {language === "english" ? "PREVIOUS" : "EDELLINEN"}
        </Link>

        <Link
          className="form__three-next-btn"
          href={getLanguagePrefix("/renovate-request-offer-4")}
          // state={{
          //   props.location,
          //   message,
          //   file: file,
          //   attachments: fileName.map((attachment:any) => attachment),
          // }}

          onClick={setItemsToStorage}
        >
          {language === "english" ? "NEXT" : "SEURAAVA"}
        </Link>
      </div>
    </form>
  );

  return (
    <FormLayout>
      <Seo
        title={t("pages.contactUs.meta.title", "request-form-3 – Proppu")}
        description={t(
          "pages.contactUs.meta.description",
          "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
        )}
        thumbnail={null}
        url={getPagePath()}
      />
      <div className="form__three-container">
        <div className="form__three-header">
          <div className="form__three-text">
            {t("pages.requestOfferForms.textTwentyTwo", "")}
          </div>
          <div className="form__three-subtext">
            {t("pages.requestOfferForms.textTwentyThree", "")}
          </div>
        </div>
        <div>{form}</div>
      </div>
    </FormLayout>
  );
};

export default withPageLanguage(RequestForm);
