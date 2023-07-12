import { getUiLanguage } from "./../utils/localization";
import { WP_GENERIC_BASE_URL, APP_BASE_URL, WP_BASE_URL } from "./../utils/constant";
import axios from "axios";
import { Blog } from "./endpoints";

export const addSubscriberApi = async (payload:any) => {
    const subscriberData = new FormData();
    subscriberData.append("your-email", payload.email);
    subscriberData.append("your-name", payload.name);

    const formUrl = WP_GENERIC_BASE_URL + "/contact-form-7/v1/contact-forms/24/feedback";

    return await axios.post(formUrl, subscriberData);
};

export const storeContactForm = async (payload:any) => {
    const formUrl = WP_GENERIC_BASE_URL + "/contact-form-7/v1/contact-forms/13/feedback";

    const contactData = new FormData();
    contactData.append("your-name", payload.name);
    contactData.append("email", payload.email);
    contactData.append("phone", payload.phone);
    contactData.append("who-are-you", payload.title);
    contactData.append("your-message", payload.message);

    return await axios.post(formUrl, contactData);
};

export const getFeedDetails = async (params:any) => {
    fetch(APP_BASE_URL + `/feed_details/${params}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            return data[0];
        });
};

export const createWebWorkRequest = async (formData:any) => {
    return await axios.post(APP_BASE_URL + "/web-work-request/create", formData);
};

export const createWebMaterialRequest = async (formData:any) => {
    return await axios.post(APP_BASE_URL + "/web-material-request/create", formData);
};

export const getBlogByTag = async (tagId:any) => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);

    return await axios.get(`${newBasePath}/posts?tags=${tagId}&categories=31`);
};

export const getAllBlogs = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);

    return await axios.get(`${newBasePath}/posts?categories=31`);
};

export const getAllTags = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);

    return await axios.get(`${newBasePath}/tags`);
};

export const getBanner = async () => {
    const apiPrefix = getUiLanguage() === "english" ? "" : "/fi";
    const newBasePath = WP_BASE_URL.replace("/language", apiPrefix);

    return await axios.get(`${newBasePath}/posts?categories=107`);
};

export const getBlogs = async () => {
    return await axios.get(Blog);
};
