import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { serverUrl } from "./index";
import { Logout } from "../utils/actions";
import { HTTP_STATUS_CODE, ENCRYPTED_KEYS } from "../utils/constants";
import { decryptData, encryptData } from "../../utils/encryptDecrypt";

const instance = axios.create({
  baseURL: serverUrl,
});
let refreshPromise: Promise<AxiosResponse<any>> | null = null;

instance.interceptors.response.use(
  async function (response: AxiosResponse): Promise<AxiosResponse> {
    return response;
  },
  async function (error: AxiosError): Promise<any> {
    if (error?.response?.status === HTTP_STATUS_CODE.Expectation_Failed) {
      Logout();
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // Set the _retry flag to true to avoid infinite loop

      if (!refreshPromise) {
        refreshPromise = axios.get(serverUrl + "/auth/token", {
          withCredentials: true,
        });

        return refreshPromise
          .then(async (resp) => {
            if (
              resp.status === HTTP_STATUS_CODE.OK &&
              resp.data &&
              resp.data.token
            ) {
              const accessToken = resp.data.token;
              let { permissions } = decryptData(accessToken);
              permissions = encryptData(permissions);
              // localStorage.setItem(ENCRYPTED_KEYS.permissions, permissions);
              // localStorage.setItem(ENCRYPTED_KEYS.token, accessToken);

              instance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              (originalRequest.headers as AxiosRequestHeaders)[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              // Retry the original request
              return instance(originalRequest);
            } else {
              Logout();
            }
          })
          .catch((refreshError) => {
            console.log("refreshError>>", refreshError);
            Logout();
          })
          .finally(() => {
            refreshPromise = null;
          });
      } else {
        // If a token refresh is already in progress, wait for it to complete
        return refreshPromise
          .then(async (resp) => {
            const accessToken = resp.data.token;
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            (originalRequest.headers as AxiosRequestHeaders)[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            // Retry original request with new token
            return instance(originalRequest);
          })
          .catch((err) => {
            console.log("refreshPromise err>>", err);
            Logout();
            return Promise.reject(err);
          });
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
