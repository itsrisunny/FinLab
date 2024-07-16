export const API_URL = (process.env.REACT_APP_ENV === 'prod')?'https://api.finlab.com/':((process.env.REACT_APP_ENV ==='test')?"http://34.27.206.42:5000/":"http://localhost:5000/");
export const SIGNZY_USERNAME = "finlab_test";
export const SIGNZY_PASSWORD = "comumlthlnexop86";
export const SIGNZY_URL = (process.env.REACT_APP_ENV === 'prod')?"https://signzy.tech/api/v2/":"https://preproduction.signzy.tech/api/v2/";