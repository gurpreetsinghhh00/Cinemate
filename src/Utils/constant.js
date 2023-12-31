export const TMDB_KEY = String(process.env.TMDB_KEY);
export const TMDB_HEADER = String(process.env.TMDB_HEADER);
export const APPWRITE_URL = String(process.env.APPWRITE_URL);
export const APPWRITE_PROJECT_ID = String(process.env.APPWRITE_PROJECT_ID);

export const APT_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_HEADER}`,
  },
};

export const BG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

export const IMAGE_URL = "https://image.tmdb.org/t/p/original";
