import React from "react";

import { cn } from "../../utils/cn";
import { useLocalization } from "../../utils/localization";
// import "./styles.scss";
const ContactInput = ({
    className,
    inputType,
    name,
    onChange,
    placeholder,
    required,
    useTextarea = false,
    value,
}: {
    className: string;
    inputType: React.HTMLInputTypeAttribute;
    name: string;
    onChange: (newValue: string) => void;
    placeholder: string;
    required?: boolean;
    useTextarea?: boolean;
    value?: string;
}) => {
    const inputProps = {
        className: cn("contact-us-input", className ?? null),
        name,
        placeholder,
        required,
        type: inputType,
        value,
        onChange: ((event) => onChange((event.target as any).value)) as React.FormEventHandler,
    };

    if (useTextarea) {
        return <textarea {...inputProps} />;
    } else {
        return <input {...inputProps} />;
    }
};

const formUrl = "https://proppu.com/campaign/wp-json/contact-form-7/v1/contact-forms/13/feedback";

const ContactUsRenovate = () => {
    const [t] = useLocalization();
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [name, setName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [whoAreYou, setWhoAreYou] = React.useState("");

    const [sendState, setSendState] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("your-message", message);
        formData.append("email", email);
        formData.append("your-name", name);
        formData.append("phone", phone);
        formData.append("who-are-you", whoAreYou);

        setSendState("sending");
        fetch(formUrl, {
            body: formData,
            method: "POST",
        })
            .then(() => setSendState("sent"))
            .catch(() => setSendState("error"));
    };

    let form = null;

    if (sendState === "idle") {
        form = (
            <form onSubmit={onSubmit} className="contact-us__form">
                <div className="contact-us__form__fields">
                    <ContactInput
                        className="name-input-renovate"
                        inputType="text"
                        name="Your name"
                        onChange={setName}
                        placeholder={t("pages.index.contactForm.name")}
                        required={true}
                        value={name}
                    />
                    <ContactInput
                        className="email-input-renovate"
                        inputType="email"
                        name="email"
                        onChange={setEmail}
                        placeholder={t("pages.index.contactForm.email")}
                        required={true}
                        value={email}
                    />
                    <ContactInput
                        className="phone-number-input-renovate"
                        inputType="tel"
                        name="Phone"
                        onChange={setPhone}
                        placeholder={t("pages.index.contactForm.phone")}
                        value={phone}
                        required={false}
                    />
                    <ContactInput
                        className="who-input-renovate"
                        inputType="select"
                        name="title"
                        onChange={setWhoAreYou}
                        placeholder={t("pages.index.contactForm.whoAreYou")}
                        value={whoAreYou}
                    />
                    <ContactInput
                        className="message-input-renovate"
                        inputType="text"
                        name="message"
                        onChange={setMessage}
                        placeholder={t("pages.index.contactForm.message")}
                        required={true}
                        useTextarea={true}
                        value={message}
                    />
                    <input
                        type="submit"
                        className="submit-btn"
                        value={t("pages.index.contactForm.submit")}
                    />
                </div>
            </form>
        );
    } else if (sendState === "sending") {
        form = <p className="contact-form-text">Sending...</p>;
    } else if (sendState === "sent") {
        form = (
            <p className="contact-form-text">
                Your message has been sent! We will be in touch soon!
            </p>
        );
    }

    return (
        <section className="contact-us-renovate">
            <div className="contact-form-heading-div">
                <h2 id="contact-us" className="contact-form-heading">
                    {t("pages.index.contactRenovationForm.getSupport")}
                </h2>
                <p className="contact-form-text-renovate">
                    {t("pages.index.contactRenovationForm.text")}
                </p>
                {form}
            </div>
        </section>
    );
};

export default ContactUsRenovate;
