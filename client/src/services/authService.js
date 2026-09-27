import { fetchApi } from './api.js';

export const authService = {
  async login(email, password) {
    const data = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      localStorage.setItem('ap_token', data.token);
      localStorage.setItem('ap_user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(userData) {
    const data = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (data.token) {
      localStorage.setItem('ap_token', data.token);
      localStorage.setItem('ap_user', JSON.stringify(data.user));
    }
    return data;
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('ap_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('ap_token');
    localStorage.removeItem('ap_user');
  },

  isAuthenticated() {
    return !!localStorage.getItem('ap_token');
  }
};

export default authService;
