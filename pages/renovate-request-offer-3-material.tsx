import React, { useContext, useState } from "react";
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
import Upload from "../images/upload-thumbnail.png";
import Attachment from "../images/clarity_attachment-line.png";
// import Files from "react-files";
import Dropzone, { useDropzone } from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AppContext from "../AppContext";

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
  return <input {...inputProps} />;
};

const RequestForm = (props: any) => {
  const values = useContext(AppContext);

  const router = useRouter();
  const [t, language] = useLocalization();
  const [message, setMessage] = React.useState(
    (typeof window !== "undefined" && window.localStorage.getItem("message")) ||
      ""
  );
  const [file, setFile] = useState<any>(Upload);
  const [fileName, setFileName] = useState<any>([]);
  const [upload, setUpload] = useState(false);
  const [uploadAttachment, setUploadAttachment] = useState(false);
  const [attachment, setAttachement] = useState<any>(Attachment);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const onFilesChange = (files: any) => {
    if (files[0]) {
      setFile(files[0]);
      setUpload(true);
    }
  };
  const onFileAttachment = (files: any) => {
    if (files) {
      files.map((file: any) => {
        console.log(file);
        fileName.push(file);
        setAttachement(file);
        setUploadAttachment(true);
      });
    }
  };

  fileName.forEach((file: any) => {
    console.log(file?.preview);

    if (file?.preview.url === undefined) {
      var blob = new Blob([file], { type: "octet/stream" });
      const doc = URL.createObjectURL(blob);
      file.preview = doc;
    } else {
    }
  });

  if (typeof window !== "undefined") {
    localStorage.setItem("message", message);
  }

  const setItemsToStorage = () => {
    // message,
          //   file: file,
          //   attachments: fileName.map((attachment:any) => attachment),
    window.sessionStorage.setItem('materialForm3_message',message)
    window.sessionStorage.setItem('materialForm3_file',JSON.stringify(file))
    const attachment = fileName.map((attachment:any, index:number) => attachment)
    window.sessionStorage.setItem('materialForm3_attachment',JSON.stringify(attachment))
  }
  let form = null;
  form = (
    <form onSubmit={onSubmit}>
      <div className="form__three-input-fields">
        <div className="form__three-material-wrapper">
          <label style={{ marginBottom: "31px" }}>
            {t("pages.requestOfferForms.textTwentyFour", "")}
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
          <div>{t("pages.requestOfferForms.textTwentyFive", "")}</div>
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
                                    src={!upload ? file : file?.preview.url}
                                    style={{ width: "150px", height: "150px" }}
                                />
                            </label>
                        </Files> */}

            <Dropzone
              onDrop={(acceptedFiles) => {
                if (acceptedFiles[0]) {
                  console.log(acceptedFiles);
                values.setfeaturedImage(acceptedFiles[0])
                  
                  setFile(
                    Object.assign(acceptedFiles[0], {
                      preview: URL.createObjectURL(acceptedFiles[0]),
                    })
                  );
                  setUpload(true);
                }
              }}
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "file-dropzone" })}>
                  <input {...getInputProps()} />
                  <label htmlFor="attachment">
                    {upload ? (
                      <Image
                        width={150}
                        height={150}
                        src={file.preview}
                        alt=""
                      />
                    ) : (
                      <Image width={150} height={150} src={file} alt="" />
                    )}
                  </label>
                </div>
              )}
            </Dropzone>

            <label className="form__three-thumbnail-text">
              {language === "english" ? "Upload Image" : "Lataa kuva"}
            </label>
          </div>
          <div className="form__three-thumbnail-subtext">
            {t("pages.requestOfferForms.textTwentySix", "")}
          </div>
        </div>
        <div className="form__three-attachment-wrapper">
          <div className="form__three-header">
            {" "}
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
                onDrop={(acceptedFiles) => {
                  if (acceptedFiles) {
                    values.setattachment(acceptedFiles)
                    acceptedFiles.map((file) => {
                      console.log(file);
                      fileName.push(file);

                      setAttachement(
                        Object.assign(file, {
                          preview: URL.createObjectURL(file),
                        })
                      );
                      setUploadAttachment(true);
                    });
                  }
                }}
                multiple={true}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "" })}>
                    <input {...getInputProps()} />
                    <label htmlFor="attachment">
                      {uploadAttachment ? null : (
                        <Image src={attachment} alt="" />
                      )}
                    </label>
                  </div>
                )}
              </Dropzone>
            </div>

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

          <div style={{ marginTop: "9px" }}>
            {t("pages.requestOfferForms.textTwentySeven", "")}
          </div>
          <input style={{ marginTop: "30px" }} type="checkbox" />
          <label>{t("pages.requestOfferForms.textTwentyEight", "")}</label>
          <br></br>
        </div>
      </div>
      <div className="form__three-btns-container">
        <Link
          className="form__three-previous-btn"
          href={getLanguagePrefix("/renovate-request-offer-2-material")}
        >
          {language === "english" ? "PREVIOUS" : "EDELLINEN"}
        </Link>

        <Link
          className="form__three-next-btn"
          href={{
            pathname: "/renovate-request-offer-4",
            // query: {
            //   message,
            //   file,
            //   attachments: fileName.map((attachment: any) => attachment),
            // },
          }}
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
            {" "}
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
