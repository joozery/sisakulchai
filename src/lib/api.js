import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.seesakulchai.com';
const TOKEN_KEY = 'scc_admin_token';
const REFRESH_KEY = 'scc_admin_refresh';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

// ใส่ Authorization header อัตโนมัติ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// auto refresh บน 401 (ถ้ามี refreshToken)
let isRefreshing = false;
let queue = [];
api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem(REFRESH_KEY);
      if (!refreshToken) throw error;

      if (isRefreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject })).then((t) => {
          original.headers.Authorization = `Bearer ${t}`;
          return api(original);
        });
      }

      try {
        isRefreshing = true;
        const { data } = await axios.post(`${API_BASE}/api/admin/auth/refresh`, { refreshToken });
        const newToken = data?.token;
        if (!newToken) throw error;
        localStorage.setItem(TOKEN_KEY, newToken);
        queue.forEach(({ resolve }) => resolve(newToken));
        queue = [];
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (e) {
        queue.forEach(({ reject }) => reject(e));
        queue = [];
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_KEY);
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  }
);

export default api;