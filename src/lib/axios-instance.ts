import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL + "/api/v1", // Replace with your API base URL
});

// Add withCredentials and application json to axios instance

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers["Content-Type"] = "application/json";

// Handle "jwt expired" this message and perform logout

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.data?.message === "jwt expired" ||
      error.response?.data?.message === "Invalid token"
    ) {
      console.error("jwt expired");
      axiosInstance.post("/auth/logout").then(() => {
        window.location.href = "/login";
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
