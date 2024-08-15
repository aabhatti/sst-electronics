"use server";

import { signIn } from "@/app/auth";
export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error) {
      switch (error?.type || "") {
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
    // write logout functionality
    return true;
  } catch (error) {
    throw error;
  }
}
