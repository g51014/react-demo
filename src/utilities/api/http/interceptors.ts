import { AxiosError, AxiosInstance, HttpStatusCode } from "axios";

export const errorInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.request?.status === HttpStatusCode.Unauthorized) {
        // authorize();
      } else {
        // errorMessage(`code: ${error.code}, message: ${error.message}`, {}, "Network");
        throw error;
      }
    }
  );
};

/**
 * @param authorization 自訂請求認證頭
 */
export const updateHeaderInterceptor = (
  axiosInstance: AxiosInstance,
  headers: Record<string, string> = {}
) => {
  axiosInstance.interceptors.request.use((config) => {
    // const jwtToken = sessionStorage.getItem(SessionStorageItem.AccessToken);
    // if (jwtToken) {
    //   config.headers.Authorization = `Bearer ${sessionStorage.getItem(
    //     SessionStorageItem.AccessToken
    //   )}`;
    // }
    Object.keys(headers).forEach((key) => (config.headers[key] = headers[key]));
    return config;
  });
};
