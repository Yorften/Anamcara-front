import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
  let token = Cookies.get("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (response.status == 401) {
        localStorage.removeItem("ACCESS_TOKEN");
      }
      throw error;
    } else {
      console.error("Network error (connection refused):", error);
    }
  }
);

export default axiosClient;
