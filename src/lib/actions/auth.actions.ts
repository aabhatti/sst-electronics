"use server";
import { ILoginInput, IRegisterInput } from "@/utils/interfaces";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/utils/routes";
import { apiNames, configMap } from "../utils/getConfig";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
import { HttpStatusCode, GenericMessages } from "../../../constants";

export async function authenticate(formData: ILoginInput) {
  try {
    const resp = await signIn("credentials", {
      ...formData,
      redirect: false,
    });
    if (resp) {
      return {
        status: HttpStatusCode.OK,
        message: GenericMessages.LOGIN_SUCCESSFULLY,
      };
    } else {
      return {
        status: HttpStatusCode.BAD_REQUEST,
        error: GenericMessages.INTERNAL_SERVER_ERROR,
      };
    }
  } catch (error: any) {
    console.log("error in authenticate signIn>", error);

    let errorMessage =
      error?.cause?.err?.message || error?.message || "Something went wrong.";
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        errorMessage = "Invalid credentials.";
      }
    }
    return {
      status: HttpStatusCode.BAD_REQUEST,
      error: errorMessage,
      message: errorMessage,
    };
  }
}

export async function loginWithGoogle() {
  try {
    await signIn("google", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
  } catch (error) {
    console.log("error in loginWithGoogle>", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function loginWithGithub() {
  try {
    await signIn("github", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error in loginWithGithub>", error);
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function handleLogout() {
  try {
    await signOut({ redirectTo: "/login" });
    return true;
  } catch (error) {
    console.log("error in handleLogout>>>>>", error);
    throw error;
  }
}

export async function register(formData: IRegisterInput) {
  try {
    const config = configMap[apiNames.register];
    return await ExecuteHttpRequest(config, formData, true);
  } catch (error: any) {
    throw error;
  }
}

export async function login(formData: ILoginInput) {
  try {
    const config = configMap[apiNames.login];
    return await ExecuteHttpRequest(config, formData, true);
  } catch (error: any) {
    console.log("error in login catch>>");
    throw error;
  }
}

export async function getRefreshTokens(refreshToken: string) {
  try {
    const config = configMap[apiNames.refreshTokens];
    return await ExecuteHttpRequest(config, {}, false, { refreshToken });
  } catch (error: any) {
    console.log("error in getRefreshTokens catch>>");
    throw error;
  }
}
