// apiConfig.js
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/";

let isRefreshing = false;
let failedQueue = [];

export function forceLogout() {
  localStorage.clear();
  window.location.reload();
}

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
}

const api = axios.create({
  baseURL: BASE_URL,
});

// Tambah token otomatis sebelum request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token otomatis kalau 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      forceLogout();
      return Promise.reject(new Error("Refresh token tidak ditemukan"));
    }

    try {
      const res = await axios.post(BASE_URL + "token/refresh/", { refresh });
      const newToken = res.data.access;

      localStorage.setItem("access", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      processQueue(null, newToken);
      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);
      forceLogout();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
