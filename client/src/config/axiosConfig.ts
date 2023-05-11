import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const token = localStorage.getItem('truck-reports');
const Axios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

Axios.defaults.headers.common.Authorization =  `Bearer ${token}`;
Axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AxiosInstance = Axios;
