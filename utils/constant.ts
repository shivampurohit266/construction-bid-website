// variable for Api status codes

export const SUCCESS = 200;
export const origin = typeof window !== "undefined" && window?.location.origin;

export const proppuUrl = "https://proppu.com";
export const proppuUrlFi = "https://proppu.fi";

export const WP_BASE_URL = origin === proppuUrl || proppuUrlFi ?`https://proppu.com/tarjous/wp-json/wp/v2`:`https://proppu.com/tarjous/wp-json/wp/v2`
// `https://tarjous-v1.proppu.com/wp-json/wp/v2`

export const WP_GENERIC_BASE_URL = `https://proppu.com/tarjous/wp-json`;

export const APP_BASE_URL = "https://app.proppu.com/proppu/public/api";


export const BASE_URL = origin === proppuUrl || origin === proppuUrlFi ? "https://app.proppu.com/proppu/public" : "https://app.proppu.com/proppu/public"

export const BASE_URL_LOGIN_SIGNUP = origin === proppuUrl || origin === proppuUrlFi ? "https://app.proppu.com" : "https://app.proppu.com"