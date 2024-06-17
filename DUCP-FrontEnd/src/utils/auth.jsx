// src/utils/auth.js

import axios from 'axios';

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const token = localStorage.getItem('access_token');
    console.log("Refresh Token", refreshToken)

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axios.post('http://103.209.199.186:5000/refresh',
      { headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json'}
    });
    const { access_token, refresh_token } = response.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    console.log("New Token here",response.data);

    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
