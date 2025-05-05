import { METHODES } from "@/utils/constants";
import { authApi } from "../../../../constants";

export const configMap = {
  register: {
    method: METHODES.POST,
    url: authApi.register,
  },
  login: {
    method: METHODES.POST,
    url: authApi.login,
  },
  emailLogin: {
    method: METHODES.POST,
    url: authApi.emailLogin,
  },
  fetchUsers: {
    method: METHODES.GET,
    url: authApi.register,
  },

  refreshTokens: {
    method: METHODES.GET,
    url: authApi.refresh,
  },
};

// Define apiNames as a strongly typed object
export const apiNames = Object.keys(configMap).reduce(
  (a, v) => ({ ...a, [v]: v }),
  {} as { [K in keyof typeof configMap]: K }
);
