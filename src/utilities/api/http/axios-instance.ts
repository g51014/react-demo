import axios from "axios";
import { errorInterceptor, updateHeaderInterceptor } from "@utilities/api/http";

axios.defaults.withCredentials = true;

export const generateAxiosInstance = (url: string, headers?: Record<string, string>) => {
    const axiosInstance = axios.create({ baseURL: url });
    errorInterceptor(axiosInstance);
    updateHeaderInterceptor(axiosInstance, headers);
    return axiosInstance;
};
