import axios from "axios"

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json"
    }
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiInstance;