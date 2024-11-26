import axios from 'axios';
import axiosInstance from './axiosInstance';

export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access-token');
};

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refresh-token');
};

export const setTokens = (access, refresh) => {
  localStorage.setItem('access-token', access);
  localStorage.setItem('refresh-token', refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
};

export const refreshAccessToken = async () => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) throw new Error('No refresh token available');

    const response = await axiosInstance.post('/user-management/token/refresh/', {
      refresh
    });

    if (response.data.access) {
      localStorage.setItem('access-token', response.data.access);
      return response.data.access;
    }
    throw new Error('No access token in refresh response');
  } catch (error) {
    clearTokens();
    throw error;
  }
}; 