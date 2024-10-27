"use client";
import React from "react";
import { loginWithGoogle, loginWithGithub } from "@/lib/actions/auth.actions";

const AuthLoginForm = () => {
  const handleActionLogin = (formData: any) => {
    const action = formData.get("action");
    if (action === "google") {
      loginWithGoogle();
    }
    if (action === "github") {
      loginWithGithub();
    }
  };

  return (
    <form action={handleActionLogin}>
      <div className="grid grid-cols-2 gap-4 border-t pt-2 mt-2">
        <button
          type="submit"
          value="google"
          name="action"
          className="p-2 rounded-md text-secondary text-sm bg-primary"
        >
          Login with Google
        </button>
        <button
          type="submit"
          value="github"
          name="action"
          className="p-2 rounded-md text-secondary text-sm bg-basePrimary"
        >
          Login with Github
        </button>
      </div>
    </form>
  );
};

export default AuthLoginForm;
