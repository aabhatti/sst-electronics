import { isValidResponse } from "./helper";
import instance from "./axios";
import { AxiosResponse } from "axios";
import { HTTP_STATUS_CODE, METHODES } from "@/utils/constants";
import { getAuthorizationToken, ParseError } from "./utils";

interface Config {
  method: METHODES;
  url: any;
}

interface ResponseData {
  code?: number;
  message?: string | string[];
  [key: string]: any; // Additional fields in response
}

export const ExecuteHttpRequest = async (
  config: Config,
  payload?: any | null,
  isPublic = false
): Promise<ResponseData> => {
  let headers: Record<string, any> = {};

  // If it's not public, you can add authorization logic
  if (!isPublic) {
    headers = getAuthorizationToken();
  }

  try {
    // Properly typed Axios request
    const response: AxiosResponse<ResponseData> = await instance[config.method](
      config.url,
      payload || {},
      {
        headers,
      }
    );

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
        };
      }
    } else {
      return {
        ...response.data,
        message: ParseError(response.data),
      };
    }
  } catch (err: any) {
    console.log("err in ExecuteHttpRequest>>>", err);
    const responseData: Partial<ResponseData> = err.response?.data || {};
    return {
      ...responseData,
      status:
        err?.response?.data?.code ||
        err?.response?.status ||
        HTTP_STATUS_CODE.BAD_REQUEST,
      message: ParseError(
        responseData?.error ||
          responseData.message ||
          err?.response?.message ||
          err?.message
      ),
    };
  }
};
