import axios from 'axios'
// import router from '../../router';

const BASE_URL = "http://localhost:3000";
const BASE_URL_API = `${BASE_URL}/api`;

const instance = axios.create({
    baseURL: BASE_URL_API,
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access_token");
            // router.push('/login')
        }

        return Promise.reject(error);
    }
)

export default instance