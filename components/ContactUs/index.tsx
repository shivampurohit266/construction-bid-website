import React from "react";
// import "./styles.scss";
import { cn } from "../../utils/cn";
import { useLocalization } from "../../utils/localization";
import { Form, Formik , Field } from "formik";
import * as Yup from "yup";

const formUrl = "https://proppu.com/campaign/wp-json/contact-form-7/v1/contact-forms/13/feedback";

const ContactUs = () => {
    const [t] = useLocalization();
    const [sendState, setSendState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

    const onSubmit = (payload:any) => {
        const contactData = new FormData();
        contactData.append("your-name", payload.name);
        contactData.append("email", payload.email);
        contactData.append("phone", payload.phone);
        contactData.append("who-are-you", payload.title);
        contactData.append("your-message", payload.message);

        setSendState("sending");
        fetch(formUrl, {
            body: contactData,
            method: "POST",
        })
            .then(() => setSendState("sent"))
            .catch(() => setSendState("error"));
    };

    const DisplayingErrorMessagesSchema = Yup.object().shape({
        name: Yup.string().required(t("footer.required")),
        message: Yup.string().required(t("footer.required")),
        email: Yup.string().email(t("footer.invalid-email")).required(t("footer.required")),
    });

    let form = null;

    if (sendState === "idle") {
        form = "";
    } else if (sendState === "sending") {
        form = <p className="contact-form-text">{t("footer.sending")}</p>;
    } else if (sendState === "sent") {
        form = <p className="contact-form-text">{t("footer.contact-us-success-message")}</p>;
    }

    return (
        <section className="contact-us" style={{ backgroundColor: "#F3F1F6" }}>
            <div className="contact-form-heading-div">
                <h2 id="contact-us" className="contact-form-heading">
                    {t("pages.index.contactForm.getStarted")}
                </h2>
                <p className="contact-form-text">{t("pages.index.contactForm.submitYourQuery")}</p>
                {form}
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        phone: "",
                        title: "",
                        message: "",
                    }}
                    validationSchema={DisplayingErrorMessagesSchema}
                    onSubmit={(values,action) => {
                        onSubmit(values);
                        action.resetForm();
                        
                        
                    }}
                >
                    {({ errors, touched, handleChange, values}) => (
                        <Form className="contact-us__form">
                            <div className="contact-us__form__fields">
                                <div style={{ position: "relative", textAlign: "left" }}>
                                    <input
                                        className={cn("contact-us-input", "name-input")}
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        placeholder={t("pages.index.contactForm.name")}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && (
                                        <span style={{ color: "red" }}>{errors.name}</span>
                                    )}
                                </div>
                               
                                <div style={{ position: "relative", textAlign: "left" }}>
                                    <input
                                        className={cn("contact-us-input", "")}
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        placeholder={t("pages.index.contactForm.email")}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && (
                                        <span style={{ color: "red" }}>{errors.email}</span>
                                    )}
                                </div>
                                <div style={{ position: "relative", textAlign: "left" }}>
                                    <input
                                        className={cn("contact-us-input", "phone-number-input")}
                                        type="tel"
                                        name="phone"
                                        onChange={handleChange}
                                        placeholder={t("pages.index.contactForm.phone")}
                                        value={values.phone}
                                    />
                                    {touched.phone && errors.phone && (
                                        <span style={{ color: "red", position: "absolute" }}>
                                            {errors.phone}
                                        </span>
                                    )}
                                </div>
                                <div style={{ position: "relative", textAlign: "left" }}>
                                    <input
                                        className={cn("contact-us-input", "who-input")}
                                        type="select"
                                        name="title"
                                        onChange={handleChange}
                                        placeholder={t("pages.index.contactForm.whoAreYou")}
                                        value={values.title}
                                    />
                                    {touched.title && errors.title && (
                                        <span style={{ color: "red" }}>{errors.title}</span>
                                    )}
                                </div>
                                <div
                                    style={{
                                        position: "relative",
                                        gridColumn: "span 2",
                                        textAlign: "left",
                                    }}
                                >
                                    <textarea
                                        className={cn("contact-us-input", "message-input")}
                                        name="message"
                                        onChange={handleChange}
                                        placeholder={t("pages.index.contactForm.message")}
                                        value={values.message}
                                    />
                                    {touched.message && errors.message && (
                                        <span style={{ color: "red" }}>{errors.message}</span>
                                    )}
                                </div>

                                <input
                                    type="submit"
                                    className="submit-btn"
                                    value={t("pages.index.contactForm.submit")}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default ContactUs;
