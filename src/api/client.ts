import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_POLYGON_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_POLYGON_API_KEY}`,
  },
});
export default client;
