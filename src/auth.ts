import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { loginSchema } from "@/utils/zodValidations";
import { loginUser } from "./usecases/auth/loginUser";
import { UserRepository } from "./repositories/UserRepository";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "./config";

interface IUser {
  id?: string;
  token?: string | undefined;
  refreshToken?: string | undefined;
  userInfo?: string | undefined;
  email?: string | undefined;
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: githubClientId,
      clientSecret: githubClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<IUser | null> => {
        try {
          let user = null;
          const data = await loginSchema.parseAsync(credentials);
          const resp = await loginUser(data, {
            userRepository: new UserRepository(),
          });

          user = resp ?? null;
          if (!user) {
            throw new Error("User not found.");
          }

          // return user object with their profile data
          return {
            ...user,
            email: credentials?.email?.toString() || "",
          };
        } catch (err: any) {
          throw new Error(err?.message?.toString() || "internal server error");
        }
      },
    }),
  ],
});