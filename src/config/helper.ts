import { HTTP_STATUS_CODE } from "../utils/constants";

interface Response {
  data: {
    code?: number;
    [key: string]: any;
  };
  status: number;
}

export const isValidResponse = (response: Response): boolean => {
  const responseData = response.data;
  return (
    responseData &&
    (responseData.code === HTTP_STATUS_CODE.OK ||
      responseData.code === HTTP_STATUS_CODE.CREATED ||
      response.status === HTTP_STATUS_CODE.OK)
  );
};

export const parseUrl = (
  url: string,
  dictionary?: Record<string, string>
): string => {
  return url.replace(
    /\{(\w+)\}/g,
    (match, p1) => (dictionary && dictionary[p1]) || match
  );
};

export const clearLocalStorageItems = async () => {
  return await localStorage.clear();
};
