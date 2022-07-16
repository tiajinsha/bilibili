import axios from 'axios';


const service = axios.create({
    baseURL: "http://127.0.0.1:25565/",
    withCredentials: true,
    timeout: 15000,
});

service.interceptors.request.use(function(config) {
    if (!config.params) config.params = {};
    return config;
});

service.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
);

export default service;