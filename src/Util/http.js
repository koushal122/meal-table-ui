import axios from 'axios'

import { BASE_URL } from '../config'

const http = axios.create({
    baseURL:BASE_URL,
    timeout:60000,
    withCredentials: true
})

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token'); // Retrieve the token from local storage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default http;