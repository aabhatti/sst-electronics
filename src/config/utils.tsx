import { isArray, isString } from "lodash";
import {
  getLocalStorageItemExect,
  clearLocalStorageItems,
} from "./AuthSetting";
import { ExecuteHttpRequest } from "./ExecuteHttpRequest";
import { METHODES, ENCRYPTED_KEYS } from "../utils/constants";
import {
  EMAIL_PASSWORD_INVALID,
  INVALID_CREDIENTIALS,
  SOMETHING_WENT_WRONG,
} from "./constants";

interface AuthorizationOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

export const getAuthorizationToken = (
  optional: AuthorizationOptions = {}
): AuthorizationOptions => {
  const token = getLocalStorageItemExect(ENCRYPTED_KEYS.token);
  if (token) {
    return {
      headers: {
        authorization: "Bearer " + token,
      },
      ...optional,
    };
  } else {
    return optional;
  }
};
interface ErrorMessage {
  msg?: string;
}
export const ParseError = (error: any): string => {
  let err: string = SOMETHING_WENT_WRONG;

  if (error.message && isArray(error.message)) {
    err = error.message[0];
    if (!isString(err) && isArray(err)) {
      const firstError = err[0] as ErrorMessage;
      err =
        firstError && firstError.msg
          ? firstError.msg
          : JSON.stringify(firstError);
    } else if (!isString(err) && (err as ErrorMessage).msg) {
      err = (err as ErrorMessage).msg!;
    }
  } else if (error.message && isString(error.message)) {
    err = error.message;
    console.log(err, "string");
  }

  if (err === INVALID_CREDIENTIALS) {
    err = EMAIL_PASSWORD_INVALID;
  }

  return err;
};

export const ClearSession = async (): Promise<boolean> => {
  await ExecuteHttpRequest(METHODES.GET, "/logout", {
    withCredentials: true,
  });

  await clearLocalStorageItems();
  return true;
};
