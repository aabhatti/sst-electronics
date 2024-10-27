// import { NextRouter, useRouter } from "next/router";
// import { ExecuteHttpRequest } from "../../config/ExecuteHttpRequest";
import { serverUrl } from "../../config";
import instance from "../../config/axios";

import { clearLocalStorageItems } from "../../config/helper";
import { METHODES } from "../constants";

// export const ClearSession = async () => {
//   await ExecuteHttpRequest(METHODES.GET, "/logout", {
//     withCredentials: true,
//   });

//   await clearLocalStorageItems();
//   return true;
// };

export const authLogout = async () => {
  return await instance.get(serverUrl + "/auth/logout", {
    withCredentials: true,
  });
};

export const Logout = async (): Promise<void> => {
  // authLogout();
  // await ClearSession();
  // const router: NextRouter = useRouter();
  // router.push("/login");
};
