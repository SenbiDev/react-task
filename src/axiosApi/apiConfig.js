import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/api/";

let isRefreshing = false;
let failedQueue = [];

export function forceLogout() {
  localStorage.clear();
  window.location.reload();
}

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

const api = axios.create({
  baseURL: BASE_URL,
});

// === REQUEST INTERCEPTOR ===
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR ===
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ⛔️ Jika bukan 401, langsung kembalikan
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Jika sudah ada proses refresh lain, masukkan ke antrian
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    // Mulai proses refresh baru
    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      processQueue(new Error("Refresh token hilang"));
      forceLogout();
      return Promise.reject(new Error("Refresh token tidak ditemukan"));
    }

    try {
      const res = await axios.post(`${BASE_URL}token/refresh/`, { refresh });
      const newToken = res.data.access;

      // Simpan token baru
      localStorage.setItem("access", newToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      // Ulangi semua request yang tertunda
      processQueue(null, newToken);

      // Coba ulang request asli
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
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