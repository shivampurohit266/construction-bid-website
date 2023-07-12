import Head from "next/head";
import Image from "next/image";
import {
  withPageLanguage,
  useLocalization,
  getPagePath,
  getLanguagePrefix,
} from "../utils/localization";
import BeAPartner from "../components/BeAPartner";
import BenefitsSection from "../components/BenefitsSection";
import ContactUs from "../components/ContactUs";
import CustomersFeedback from "../components/CustomersFeedback/CustomersFeedback";
import HomeHero from "../components/Homehero";
import HousingIndustry from "../components/HousingIndustry";
import Layout from "../components/Layout";
import OneStopShopSection from "../components/OneStopShopSection/OneStopShopSection";
import Seo from "../components/Seo";
import refineCeiling from "../images/pexels-tima-miroshnichenko.png";
// import '../styles/Home.module.scss'
import { useEffect, useReducer, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import { origin, proppuUrl, WP_GENERIC_BASE_URL } from "../utils/constant";
import MyModal from "../components/Modal/Modal";
import { reducer } from "../components/Modal/reducer";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import BasicModal from "../components/Modal/BasicModal";
import propuLogo from "../images/Full-Logo-lighter.png";
import remontLogo from "../images/remonti.png";
import talomanLogo from "../images/taloman.png";

const defaultState = {
  isModalOpen: false,
  modalContent: "",
  status: false,
};

export default function Home(props: any) {
  const [t, language] = useLocalization();
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  const modalBody = (
    <>
      <ul>
        <li>
          <Link href="/construction-companies/">
            <div className="text-uppercase">
              <h4>AMMATTILAISILLE</h4>
              <p>RAKENNUSALAN AMMATTILAINEN TAI Materiaalitoimittaja</p>
            </div>
            <Image src={propuLogo} alt="test" />
          </Link>
        </li>
        <li>
          <Link target="blank" href="https://remonttikauppa.com">
            <div className="text-uppercase">
              <h4>REMONTIN TILAAJALLE</h4>
              <p>Kodin omistaja TAI ASUNTOSIJOITTAJA</p>
            </div>
            <Image src={remontLogo} alt="test" />
          </Link>
        </li>
        <li>
          <Link target="blank" href="https://taloman.fi">
            <div className="text-uppercase">
              <h4>Taloyhtiölle</h4>
              <p>HALLITUKSELLE TAI Isännöitsijälle</p>
            </div>
            <Image src={talomanLogo} alt="test" />
          </Link>
        </li>
      </ul>
    </>
  );

  const router = useRouter();
  // router.reload()
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const modalOne = (
    <div className="form__modal-box" style={{ textAlign: "center" }}>
      {state.isModalOpen && (
        <MyModal
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

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("footer.invalid-email"))
      .required(t("footer.required")),
  });

  const subscribe = async (data: any) => {
    // console.log(email,">>>>>>>>>");
    // const subscriberData = new FormData();
    // subscriberData.append(
    //   "email",
    //   data.email !== undefined ? data.email : data
    // );
    // const formUrl =
    //   WP_GENERIC_BASE_URL + "/contact-form-7/v1/contact-forms/2524/feedback";
    // await axios
    //   .post(formUrl, subscriberData)
    //   .then((response) => {
    //     setShow(false);
    //     window.scrollTo(0, 0);
    //     setStatus(true);
    //     dispatch({ type: "SUCCESS" });
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <div className={""}>
      <Layout>
        <Seo
          title={t(
            "pages.index.meta.title",
            "Proppu – Property platform uniting all of us"
          )}
          description={t(
            "pages.index.meta.description",
            "Proppu is a digital ecosystem that connects all stakeholders in the renovation and building industry."
          )}
          url={getPagePath()}
        />
        <main className="modal-light">
          {status ? modalOne : null}
          <HomeHero />
          <HousingIndustry image={refineCeiling} />
          <BenefitsSection
            country_name={props?.ip?.country_name}
            onSubmit={subscribe}
          />
          <CustomersFeedback />
          <BeAPartner />
          <OneStopShopSection />
          <ContactUs />
          <BasicModal
            show={show}
            handleClose={() => setShow(false)}
            className={`modal-with-bg`}
            modalTitle={<h3>VALITSE SINULLE SOPIVIN PALVELU</h3>}
            modalBody={modalBody}
          />
          {/* <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            id="year_offer"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <h4>
                  {} <br />
                  {t("pages.index.modal.headingbr")}
                </h4>
                <p>{t("pages.index.modal.heading2")}</p>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values, action) => {
                  subscribe(values);
                  action.resetForm();
                }}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form className="contact-us__form">
                    <Row>
                      <Col>
                        <input
                          type="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder={t("pages.index.modal.placeholder")}
                        />
                        <Col className="mb-2">
                          {touched.email && errors.email && (
                            <span style={{ color: "red" }}>{errors.email}</span>
                          )}
                        </Col>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="submit" className="text-uppercase">
                          {t("pages.index.modal.submit")}
                        </Button>
                      </Col>
                    </Row>
                    <Link
                      href={"https://proppu.com/tarjous/remonttitarjous/"}
                      target="_blank"
                    >
                      <p className="know-more">
                        {t("pages.index.banner.headingTwo")}
                      </p>
                    </Link>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal> */}
        </main>
      </Layout>
    </div>
  );
}
