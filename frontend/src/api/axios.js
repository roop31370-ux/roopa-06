import axios from 'axios';

const API = axios.create({
  // ✅ Changed from 'localhost' to '127.0.0.1' to match your Vite server
  baseURL: 'http://127.0.0.1:5000/api', 
  withCredentials: true,
});

// Automatically attaches the JWT token to every request header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Standardizing the Authorization header format
    req.headers.Authorization = `Bearer ${token}`; 
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;