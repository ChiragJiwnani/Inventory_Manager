// client/src/services/api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Backend URL
  withCredentials: false,           // true only if using cookies
});

export default api;
