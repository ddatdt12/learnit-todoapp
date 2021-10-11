import axios from 'axios';

export const apiAxios = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_URL,
  withCredentials: true,
});
