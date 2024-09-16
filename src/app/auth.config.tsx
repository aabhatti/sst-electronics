import type { NextAuthConfig } from "next-auth";

// import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";
// import { getUserFromDb } from "@/utils/db";
// import { loginSchema } from "@/utils/zodValidations";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // authorize: async (credentials) => {
      //   try {
      //     let user = null;

      //     const { email, password } = await loginSchema.parseAsync(credentials);

      //     // // logic to salt and hash password
      //     // const pwHash = saltAndHashPassword(password);

      //     // // logic to verify if user exists
      //     // user = await getUserFromDb(email, pwHash);

      //     //   if (!user) {
      //     //     throw new Error("User not found.");
      //     //   }

      //     //   // return json object with the user data
      //     //   return user;
      //   } catch (error) {
      //     if (error instanceof ZodError) {
      //       // Return `null` to indicate that the credentials are invalid
      //       return null;
      //     }
      //   }
      // },
    }),
  ],
} satisfies NextAuthConfig;
