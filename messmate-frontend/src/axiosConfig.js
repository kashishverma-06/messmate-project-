import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // ✅ ONLY ROOT URL
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;