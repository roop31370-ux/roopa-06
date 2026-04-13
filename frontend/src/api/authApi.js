import API from './axios';

export const authApi = {
  // POST: http://localhost:5000/api/auth/register
  register: (data) => API.post('/auth/register', data), 
  
  // POST: http://localhost:5000/api/auth/login
  login: (data) => API.post('/auth/login', data),

  // POST: http://localhost:5000/api/auth/forgot-password
  // Sends { email } to the backend
  forgotPassword: (data) => API.post('/auth/forgot-password', data),

  // POST: http://localhost:5000/api/auth/reset-password/:token
  // Sends the token in the URL and the new { password } in the body
  resetPassword: (token, data) => API.post(`/auth/reset-password/${token}`, data),
};