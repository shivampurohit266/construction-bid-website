import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import filesIcon from "../../images/files.svg";
import filesIcon2 from "../../images/files-2.svg";
import { cn } from "../../utils/cn";
import FormLayout from "../../components/FormLayout";
import Seo from "../../components/Seo";
import {
  getPagePath,
  useLocalization,
  withPageLanguage,
  getLanguagePrefix,
} from "../../utils/localization";
import Dropzone, { useDropzone } from "react-dropzone";
import axios from "axios";
import AppContext from "../../AppContext";
import { BASE_URL } from "../../utils/constant";
import { log } from "console";
import Upload from "../../images/upload-thumbnail.png";
import Attachment from "../../images/clarity_attachment-line.png";
import { isTemplateExpression } from "typescript";

const QuestionnaireInput = (props: any) => {
  const inputProps = {
    className: cn("", props?.className ?? null),
    name: props?.name,
    placeholder: props?.placeholder,
    required: props?.required,
    answers_array: props?.answers_array,
    value: props?.value,
    type: props?.type,
    label: props?.label,
    lg: props?.lg,
    title: props?.title,
    kpl: props?.kpl,
    onChange: ((event) =>
      props.onChange((event.target as any).value)) as React.FormEventHandler,
  };

  return inputProps?.type === "date" ? (
    <Col lg={inputProps.lg} className="form_group_inner">
      <label htmlFor="name">{inputProps.label}</label>
      <input
        type={inputProps.type}
        className="form-control"
        placeholder="Vuosi xxxx"
      />
      {/* <div className="input_placeholders_date">{inputProps.kpl}</div> */}
    </Col>
  ) : inputProps?.type === "text" ? (
    <Col lg={inputProps.lg} className="form_group_inner">
      <label htmlFor="name">{inputProps.label}</label>
      <input
        type={inputProps.type}
        className="form-control"
        placeholder={inputProps.placeholder}
      />
      {/* <div className="input_placeholders_date">{inputProps.kpl}</div> */}
    </Col>
  ) : inputProps?.type === "file" ? (
    <>
      <Col lg={inputProps.lg} className="form_group_inner">
        <label htmlFor="name">
          Yleiskuva, jossa näkyy tila kokonaisuudessaan
        </label>
      </Col>
      <Col lg={inputProps.lg} className="form_group_inner">
        <input type="file" title="Liitä kuva" />
        <div className="input_placeholders_file">
          <Image src={filesIcon} alt="" /> Liitä kuva
        </div>
      </Col>
    </>
  ) : inputProps?.type === "fileFull" ? (
    <>
      <Col lg={inputProps.lg} className="form_group_inner">
        <label htmlFor="name">Uuden tilan visuaalinen ilme</label>
      </Col>
      <Col lg={inputProps.lg} className="form_group_inner">
        <input type="file" title="Liitä kuva" className="input_file_full" />
        <div className="input_placeholders">
          <Image src={filesIcon2} alt="" /> Liitä kuva Liitä kuva tai linkki,
          joka vastaa toiveitasi uuden tilan visuaalisesta ilmeestä
        </div>
      </Col>
    </>
  ) : inputProps?.type === "radio" &&
    inputProps.answers_array &&
    inputProps.answers_array?.length <= 5 ? (
    <Col lg={inputProps.lg} className="form_group_inner">
      <label htmlFor="name">{inputProps.label}</label>
      <Form.Group className="d-flex gap-3 align-items-center">
        {inputProps.answers_array?.map((data: any, index: any) => {
          // console.log(data,"mapss");
          return (
            data?.length > 3 && (
              <Form.Check
                key={index}
                type="radio"
                label={data}
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            )
          );
        })}
        {/* <Form.Check
          type="radio"
          label={inputProps.label}
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        /> */}
      </Form.Group>
    </Col>
  ) : inputProps?.type === "radio" &&
    inputProps.answers_array &&
    inputProps.answers_array?.length > 5 ? (
    <Col lg={inputProps.lg} className="form_group_inner">
      <h5>{inputProps.title}</h5>
      <label htmlFor="name">{inputProps?.label}</label>
      <Form.Group className="d-flex gap-3  flex-column">
        {inputProps.answers_array?.map((data: any, index: any) => {
          return (
            data?.length > 3 && (
              <Form.Check
                key={index}
                type="radio"
                label={data}
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
            )
          );
        })}
        {/* <Form.Check
          type="radio"
          label={inputProps.label}
          name="formHorizontalRadios"
          id="formHorizontalRadios36"
        />
        <Form.Check
          type="radio"
          label={inputProps.label}
          name="formHorizontalRadios"
          id="formHorizontalRadios35"
        />
        <Form.Check
          type="radio"
          label={inputProps.label}
          name="formHorizontalRadios"
          id="formHorizontalRadios34"
        /> */}
      </Form.Group>
    </Col>
  ) : (
    <Col
      lg={inputProps.lg}
      className="form_group_inner justify-content-center pt-md-5 pt-3"
    >
      <label htmlFor="name">{inputProps.label}</label>
    </Col>
  );
};

const Questionnaire = (props: any) => {
  const DataForQ = props?.questionnaire;
  // console.log(DataForQ,"props");

  const QuestionnaireData = [
    {
      Pipes: [
        {
          question_id: 1,
          question: "When have these been renewed?",
          question_placeholder: "Date xxxx",
          question_type: "date",
          answers_array: "",
          question_hint: "",
          question_group_id: 1,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 2,
          question: "Does the location need to be changed?",
          question_placeholder: "kpl",
          question_type: "text",
          answers_array: "",
          question_hint: "",
          question_group_id: 1,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 3,
          question: "How many water outlets are in the space at the moment?",
          question_placeholder: "kppl",
          question_type: "text",
          answers_array: "",
          question_hint: "",
          question_group_id: 1,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 4,
          question: "How many water outlets are needed after the renovation?",
          question_placeholder: "kkpll",
          question_type: "text",
          answers_array: "",
          question_hint: "",
          question_group_id: 1,
          question_category_id: 2,
          lang_id: 2,
        },
      ],
    },
    {
      Sewer: [
        {
          question_id: 5,
          question: "When has it been done?",
          question_placeholder: "",
          question_type: "date",
          answers_array: "",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 6,
          question: "Does the location need to be changed?",
          question_placeholder: "",
          question_type: "radio",
          answers_array: "['Plates and wood chipping','I don\\’t know']",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 7,
          question: "Do you want to renew the floor drain?",
          question_placeholder: "",
          question_type: "radio",
          answers_array:
            "['Plates and wood chipping','Concrete','I don\\’t know']",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 8,
          question: "Toilet seat location remains the same?",
          question_placeholder: "",
          question_type: "radio",
          answers_array: "['Yes','I don\\’t know']",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 9,
          question: "Sink location remains the same?",
          question_placeholder: "",
          question_type: "radio",
          answers_array: "['Concrete','I don\\’t know']",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
        {
          question_id: 10,
          question:
            "Washing machine and dryer location remains the same (sewer, incoming water, electrical outlet)?",
          question_placeholder: "",
          question_type: "radio",
          answers_array: "['Plates and wood chipping','Concrete']",
          question_hint: "",
          question_group_id: 2,
          question_category_id: 2,
          lang_id: 2,
        },
      ],
    },
    {
      "Flooring structure": [
        {
          question_id: 11,
          question: "What material is underneath the floor tiles? ",
          question_placeholder: "",
          question_type: "radio",
          answers_array:
            "['Plates and wood chipping','Concrete','I don\\’t know']",
          question_hint: "",
          question_group_id: 3,
          question_category_id: 2,
          lang_id: 2,
        },
      ],
    },
  ];
  // console.log(Object?.keys(DataForQ[0]), "ooooo");

  // console.log(props?.questionnaire[0].Pipes, "?????");

  // let keyss = Object.keys(props?.questionnaire[0]);

  const values = useContext(AppContext);
  const [t, language] = useLocalization();
  // console.log(QuestionnaireData, ">>>>setQuestionnaire");
  return DataForQ.length > 0 ? (
    <section className="questionnaire_section">
      <div className="questionnaire_title">
      {t("pages.requestOfferForms.questionnaire.title", "")}
      </div>
      <div className="questionnaire_form_box ">
        {/* <form className="questionnaire_form"> */}
        {DataForQ.length &&
          Object.keys(DataForQ[0]).map((item: any, index: any) => {
            let keyss = Object.keys(item);
            // console.log(DataForQ[0][item], "mapppq");
            return (
              <div key={index}>
                <div className="questionnaire_form_inner pt-3">
                  {/* form first section */}
                  <h5>{item}</h5>
                  <Row className="questionnaire_form_group">
                    {DataForQ[0][item]?.length &&
                      DataForQ[0][item]?.map((data: any, index: any) => {
                        // console.log(data?.answers_array?.split("'"),"mappp");
                        return (
                          <QuestionnaireInput
                            key={index}
                            type={data?.question_type}
                            placeholder={data?.question_placeholder}
                            label={data?.question}
                            answers_array={data?.answers_array?.split("'")}
                            lg={6}
                          />
                        );
                      })}
                  </Row>
                </div>
                <hr className="hr" />
              </div>
            );
          })}

        {/* <div className="questionnaire_form_inner pt-3">
          <h5>Viemäri</h5>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="Milloin tehty?" type="date" lg={4} />
            <QuestionnaireInput label="Muut muutokset:" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
          </Row>
        </div>
        <hr className="hr" />
        <div className="questionnaire_form_inner pt-3">
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radioCol" lg={4} />
            <QuestionnaireInput label="tehty?" type="radioCol" lg={4} />
          </Row>
        </div>
        <hr className="hr" />
        <div className="questionnaire_form_inner pt-3">
          <h5>Sähköt</h5>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <Row className="questionnaire_form_group">
              <QuestionnaireInput
                label="Kuinka monta lisää?"
                type="text"
                lg={4}
              />
              <QuestionnaireInput
                label="Vikavirtasuoja löytyy yleensä sähkökeskuksen
                      johdonsuojakatkaisijoiden vierestä. Ennen vuotta 1995
                      tehdyissä sähköasennuksissa vikavirtasuojia ei yleensä
                      ole. Vikavirtasuojan vieressä on yleensä T-kirjaimella
                      merkitty testinappi ja resetointinappi. Katso lisää täältä"
                lg={8}
              />
            </Row>
          </Row>
        </div>
        <hr className="hr" />
        <div className="questionnaire_form_inner pt-3">
          <h5>Muut</h5>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
            <QuestionnaireInput label="tehty?" type="radio" lg={4} />
          </Row>
        </div>
        <hr className="hr" /> */}
        {/* <div className="questionnaire_form_inner pt-3">
          <h5>
            Saadaksesi pitäviä tarjouksia ilman katselmuksia, liitä mukaan kuvat
            seuraavista:
          </h5>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="file" lg={4} />
          </Row>

          <Row className="questionnaire_form_group pt-4">
            <QuestionnaireInput label="tehty?" type="fileFull" lg={12} />
          </Row>
        </div>
        <hr className="hr" /> */}
        {/* <div className="questionnaire_form_inner pt-3">
          <h5>Remonttiin liittyvät yleiset kysymykset</h5>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radioCol" lg={5} />
            <QuestionnaireInput
              label="Monennessa kerroksessa remontoitava kohde sijaitsee? "
              type="text"
              placeholder="Numero "
              lg={5}
            />
          </Row>
          <Row className="questionnaire_form_group">
            <QuestionnaireInput label="tehty?" type="radioCol" lg={12} />
            <QuestionnaireInput label="tehty?" type="radioCol" lg={12} />
          </Row>
        </div> */}
        {/* </form> */}
      </div>
    </section>
  ) : null;
};

export default Questionnaire;
