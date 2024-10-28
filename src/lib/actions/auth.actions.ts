"use server";
import { ILoginInput, IRegisterInput } from "@/utils/interfaces";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGGED_IN_REDIRECT } from "@/utils/routes";
import { apiNames, configMap } from "../utils/getConfig";
import { ExecuteHttpRequest } from "@/config/ExecuteHttpRequest";
// import { redirect } from "next/navigation";

export async function authenticate(formData: ILoginInput) {
  try {
    return await signIn("credentials", {
      ...formData,
      redirect: false,
    });
    // if (resp) redirect(DEFAULT_LOGGED_IN_REDIRECT);
  } catch (error: any) {
    console.log("error in authenticate>>", error);
    const errorMessage =
      error?.cause?.err?.message || error?.message || "Something went wrong.";
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        throw new Error("Invalid credentials.");
      }
    }
    console.log("errorMessage in authenticate>>>", errorMessage);
    return {
      status: 500,
      error: errorMessage,
      message: errorMessage,
    };
  }
}

export async function loginWithGoogle() {
  try {
    const resp = await signIn("google", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
    console.log("resp in loginWithGoogle>>>>>", resp);
  } catch (error) {
    console.log("error in loginWithGoogle signin>>>>>", error);
    if (error instanceof AuthError) {
      console.log("error in loginWithGoogle>>>>>", error);
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
    const resp = await signIn("github", {
      redirectTo: DEFAULT_LOGGED_IN_REDIRECT,
    });
    console.log("resp in loginWithGithub>>>>>", resp);
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error in loginWithGithub>>>>>", error);
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
