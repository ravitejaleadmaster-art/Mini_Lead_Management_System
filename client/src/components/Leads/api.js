import axios from 'axios';

const BASE = 'http://localhost:3000/api/leads';

// 1. Initialize the axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// 2. Request Interceptor: Attach the token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 3. Response Interceptor: Handle 401 errors and auto-logout
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // If we get a 401, the token is dead. 
      // Clear storage and boot the user to login.
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

// 4. Updated API functions using the 'api' instance
export async function fetchLeads(page = 1, limit = 50) {
  // api.get automatically uses the baseURL and headers
  const res = await api.get(`/leads?page=${page}&limit=${limit}`);
  return res.data; // Axios returns data in the 'data' property
}

export async function createLead(payload) {
  const res = await api.post('/leads', payload);
  return res.data;
}

export async function updateLeadStatus(id, status) {
  const res = await api.patch(`/leads/${id}/status`, { status });
  return res.data;
}