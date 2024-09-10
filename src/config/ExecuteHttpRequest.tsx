import { serverUrl } from "../config";
import { ParseError, getAuthorizationToken } from "../config/utils";
import instance from "../config/axios";
import { error } from "../components/shared/alert";
import {
  HTTP_STATUS_CODE,
  SERVICE_ERROR,
  HTTP_REQUEST_ERROR,
} from "../utils/constants";
import { isValidResponse } from "./helper";

interface ResponseData {
  status: number;
  message: string;
  [key: string]: any;
}

const responseData: ResponseData = {
  status: HTTP_STATUS_CODE.NOT_EXECUTE,
  message: SERVICE_ERROR,
};

type HttpMethod = "get" | "post" | "put" | "delete";

const mapMethod = (
  method: HttpMethod,
  url: string,
  payload: any = null,
  headers: any = null
): (() => Promise<any>) => {
  const mapRequestMethod: Record<HttpMethod, () => Promise<any>> = {
    get: () => instance[method](serverUrl + url, headers),
    post: () => instance[method](serverUrl + url, payload, headers),
    put: () => instance[method](serverUrl + url, payload, headers),
    delete: () => instance[method](serverUrl + url, headers),
  };

  if (!mapRequestMethod[method]) {
    error(HTTP_REQUEST_ERROR.INCORRECT_METHOD(method));
    throw new Error(HTTP_REQUEST_ERROR.INCORRECT_METHOD(method));
  }

  return mapRequestMethod[method];
};

export const ExecuteHttpRequest = async (
  method: HttpMethod,
  url: string,
  payload: any = null,
  optional: any = {},
  isPublic: boolean = false
): Promise<ResponseData> => {
  let headers = optional;
  if (!isPublic) {
    headers = getAuthorizationToken(optional);
  }

  try {
    const methodFunction = mapMethod(method, url, payload, headers);
    const response = await methodFunction();

    if (isValidResponse(response)) {
      const responseCode = response.data.code;

      if (
        responseCode === HTTP_STATUS_CODE.OK ||
        responseCode === HTTP_STATUS_CODE.CREATED
      ) {
        return { ...response.data, status: HTTP_STATUS_CODE.OK };
      } else {
        return {
          status: HTTP_STATUS_CODE.OK,
          data: response.data,
          message: "",
        };
      }
    } else {
      return {
        ...responseData,
        message: ParseError(response.data) || "",
      };
    }
  } catch (err: any) {
    return {
      ...responseData,
      status: err?.response?.data?.code || HTTP_STATUS_CODE.CREATED,
      message:
        ParseError(
          err.response && err.response.data ? err.response.data : err.message
        ) || "",
    };
  }
};
