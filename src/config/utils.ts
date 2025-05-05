import {
  getLocalStorageItemExect,
  clearLocalStorageItems,
} from "./AuthSetting";
import { METHODES, ENCRYPTED_KEYS } from "../utils/constants";
import {
  EMAIL_PASSWORD_INVALID,
  INVALID_CREDIENTIALS,
  SOMETHING_WENT_WRONG,
} from "./constants";
import { isArray, isString } from "../../utils";
import { auth } from "@/auth";

interface AuthorizationOptions {
  headers?: Record<string, string>;
  [key: string]: any;
}

interface ErrorMessage {
  msg?: string;
}

/**
 * Retrieves the current session's access token.
 */
const getToken = async (): Promise<string> => {
  const session = await auth();
  return session?.accessToken || "";
};

/**
 * Prepares authorization headers with access token if available.
 */
// export const getAuthorizationToken = async (
//   optional: AuthorizationOptions = {}
// ): Promise<AuthorizationOptions> => {
//   const token = await getToken(); // ensure async is awaited

//   if (token) {
//     return {
//       headers: {
//         authorization: `Bearer ${token}`,
//         ...(optional.headers || {}),
//       },
//       ...optional,
//     };
//   } else {
//     return optional;
//   }
// };

export const getAuthorizationToken = async (
  optionalHeaders: Record<string, string> = {}
): Promise<Record<string, string>> => {
  const token = await getToken();

  if (token) {
    return {
      authorization: `Bearer ${token}`,
      ...optionalHeaders,
    };
  }

  return optionalHeaders;
};

/**
 * Parses different formats of error responses into user-friendly messages.
 */
export const ParseError = (error: unknown): string => {
  let err: string = SOMETHING_WENT_WRONG;

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as any).message;

    if (isArray(message)) {
      let first = message[0];

      if (!isString(first) && isArray(first)) {
        const firstError = first[0] as ErrorMessage;
        err = firstError?.msg || JSON.stringify(firstError);
      } else if (
        !isString(first) &&
        typeof first === "object" &&
        "msg" in first
      ) {
        err = (first as ErrorMessage).msg || err;
      } else if (isString(first)) {
        err = first;
      }
    } else if (isString(message)) {
      err = message;
      console.log(err, "string");
    }
  } else if (isString(error)) {
    err = error;
  }

  if (err === INVALID_CREDIENTIALS) {
    err = EMAIL_PASSWORD_INVALID;
  }

  return err;
};

// Optional: Clear session data by hitting logout endpoint and clearing local storage
// export const ClearSession = async (): Promise<boolean> => {
//   await ExecuteHttpRequest(METHODES.GET, "/logout", {
//     withCredentials: true,
//   });
//   await clearLocalStorageItems();
//   return true;
// };
