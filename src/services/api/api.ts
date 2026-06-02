import axios from 'axios'

const BASE_URL = "http://localhost:3000";
const BASE_URL_API = `${BASE_URL}/api`;

const instance = axios.create({
    baseURL: BASE_URL_API,
})

export default instance