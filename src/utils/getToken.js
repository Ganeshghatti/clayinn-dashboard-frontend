export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access-token');
    if (!token) {
      throw new Error('No token found. Please login again.');
    }
    return token;
  }
  return null;
};

export const handleTokenRefresh = async () => {
  const refresh_token = localStorage.getItem('refresh-token');
  try {
    const response = await axios.post(
      'https://clayinn-dashboard-backend.onrender.com/user-management/token/refresh/',
      {
        refresh: refresh_token,
      }
    );
    localStorage.setItem('access-token', response.data.access);
    return response.data.access;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
