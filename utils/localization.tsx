import * as React from "react";
import { finnish } from "./locales/finnish";
import { english } from "./locales/english";
import { spanish } from "./locales/spanish";

const { useState, useEffect } = React;

export type Languages = "english" | "finnish" | "spanish";

const DEFAULT_LANG = "finnish";

const LS_PREFIX = "__proppu:";
const LS_LANG = `${LS_PREFIX}language`;
const SS_AUTOSET_LANG = `${LS_PREFIX}languageHasBeenSet`;

export const autoSelectPageLanguage = () => {
    
    if (typeof window !== "undefined" ) {
        let language: Languages = 'finnish';
        const langInLocalStorage: Languages = sessionStorage.getItem(LS_LANG) as Languages ;

        if (langInLocalStorage !== null) {
            // console.log('=>iiiiiifffffffff');
            language = langInLocalStorage;
            setUiLanguage(language, false);
        } else {
            // console.log('=>eeeelllllllssssseeeee');
            language = window.location.pathname.startsWith("/en/") ? "english" : "finnish" ?? DEFAULT_LANG;
            setUiLanguage(language, false);
        }
        
        if (sessionStorage.getItem(SS_AUTOSET_LANG) !== "true") {
            // Language autoset should only be performed once
            sessionStorage.setItem(SS_AUTOSET_LANG, "true");
            setUiLanguage(language, false);
        }
    }
};

let pagePath: string = '';
let uiLanguage: Languages = 'finnish';

export const getPagePath = () => pagePath;

export const setUiLanguage = (language: Languages, forceRedirect = false) => {
    uiLanguage = language;
    // console.log('=>lannnggg',uiLanguage);
    
    sessionStorage.setItem(LS_LANG, language);

    if (forceRedirect && !window.location.pathname.startsWith("/app/feed/") && !window.location.pathname.startsWith("/app/blog/")) {
        if (language === "english" && !window.location.pathname.startsWith("/en/")) {
            window.location.href = `/en${window.location.pathname}`;
        } else if (language === "finnish" && window.location.pathname.startsWith("/en/")) {
            window.location.href = window.location.pathname.substring(3);
        }
    }

    notifySubscribers();
};

export const getUiLanguage = (): Languages => uiLanguage ?? DEFAULT_LANG;
export const getLanguagePrefix = (path: string): string => {
    if (getUiLanguage() === "english") {
        return `${path}`;
    } else {
        return path;
    }
};

// You can force the current page path to other localization format by giving the wanted prefix.
// This is probably only useful with "FI" and "EN" header links where you want to force the
// links to point to the same page but use the corresponding language prefix.
export const localizedPagePath = (localization: "/" | "/en") => {
    let strippedPath: string = pagePath ?? "";
    // console.log(localization, strippedPath);
    if (strippedPath.startsWith("/en")) {
        strippedPath = strippedPath.substring("/en".length);
    }

    if (localization === "/en" && !strippedPath.includes('/app')) {
        return `/en${strippedPath}`;
    } else {
        return strippedPath;
    }
};

type SubscriberFunc = () => void;

const subscriptions: Set<SubscriberFunc> = new Set();
const subscribeToLanguageChanges = (subscriberFunc: SubscriberFunc) => {
    subscriptions.add(subscriberFunc);

    // return unsubscription function
    return () => {
        subscriptions.delete(subscriberFunc);
    };
};

const notifySubscribers = () => {
    subscriptions.forEach((subscriberFunc) => subscriberFunc());
};

const languagePacks: { [key in Languages]: LanguageObject } = { finnish, english, spanish };

type LanguageObject = {
    [key: string]: string | LanguageObject;
};

const intlDateTimeFormats = {
    finnish: new Intl.DateTimeFormat("fi-FI"),
    english: new Intl.DateTimeFormat("en-US"),
    spanish: new Intl.DateTimeFormat("sp-SP"),
    swedish: new Intl.DateTimeFormat("sv"),
    russian: new Intl.DateTimeFormat("ru"),
    estonian: new Intl.DateTimeFormat("et"),
    default:  new Intl.DateTimeFormat,
};

intlDateTimeFormats.default = intlDateTimeFormats.english;
Object.freeze(intlDateTimeFormats);

const intlNumberFormats = {
    finnish: new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }),
    english: new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }),
    spanish: new Intl.NumberFormat("sp-SP", { style: "currency", currency: "EUR" }),
    swedish: new Intl.NumberFormat("sv", { style: "currency", currency: "EUR" }),
    russian: new Intl.NumberFormat("ru", { style: "currency", currency: "EUR" }),
    estonian: new Intl.NumberFormat("et", { style: "currency", currency: "EUR" }),
    default: new Intl.NumberFormat,
};

intlNumberFormats.default = intlNumberFormats.english;
Object.freeze(intlNumberFormats);

interface TranslateFunc {
    (localizationStr: string, fallback?: string): string;
    (date: Date, fallback?: string): string;
    (amount: number, fallback?: string): string; // for formatting currency
}

// Translate function takes in localization path and optionally fallback.
// Returns translation that is defined in the language's locale package
export const t: TranslateFunc = (localizationStr: any, fallback?: any) => {
    const uiLanguage = getUiLanguage();

    if (typeof localizationStr === "number") {
        const numberFormat = intlNumberFormats?.[uiLanguage] ?? intlNumberFormats.default;
        return numberFormat.format(localizationStr);
    } else if (localizationStr instanceof Date) {
        if (isNaN(localizationStr.getTime())) {
            return "invalid date";
        }

        const dateTimeFormat = intlDateTimeFormats?.[uiLanguage] ?? intlDateTimeFormats.default;
        return dateTimeFormat.format(localizationStr);
    } else if (!localizationStr || uiLanguage === null) {
        return fallback ?? localizationStr;
    } else {
        const path = localizationStr.split(".");

        let current: LanguageObject | string = languagePacks?.[uiLanguage] ?? {};
        while (path.length) {
            const currentPath = path.shift();
            if (typeof current !== "string" && currentPath in current) {
                current = current[currentPath];
            } else {
                break;
            }
        }

        return typeof current === "string"
            ? current
            : fallback ?? localizationStr ?? "<#! untranslated text !#>";
    }
};

// useLocalization hook is what you want to use with your pages and other components.
// It gives you the access for the translation function t and also returns the current
// user interface language. Note that there is also dynamic page support, if needed.
export const useLocalization = (): [TranslateFunc, Languages] => {
    const [uiLanguage, setUiLanguage] = useState<Languages>(getUiLanguage());

    useEffect(() => {
        const unsubscribe = subscribeToLanguageChanges(() => {
            const language = getUiLanguage();
            setUiLanguage(language);
        });

        return () => unsubscribe();
    }, [setUiLanguage]);

    return [t, uiLanguage];
};

export const withPageLanguage = <T extends Record<string, any>>(
    Component: React.ComponentType<T>
) => {

    return (props: T) => {
        // const {
        //     pageContext: { pageLanguage },
        //     location: { pathname },
        // } = props;
        // uiLanguage = getUiLanguage() ;
        // pagePath = pathname;
        return <Component {...props} />;
    };
};

autoSelectPageLanguage();
