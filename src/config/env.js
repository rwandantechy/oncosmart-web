const LOCAL_API_URL = "https://oncosmart-app.vercel.app/";

export const API_BASE_URL = (import.meta.env.VITE_API_URL || LOCAL_API_URL).replace(/\/+$/, "");
