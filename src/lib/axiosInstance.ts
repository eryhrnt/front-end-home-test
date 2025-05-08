import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://test-fe.mysellerpintar.com/api', // your base API URL
  headers: {
    'Content-Type': 'application/json', // you can adjust headers if needed
  },
});

export default axiosInstance;