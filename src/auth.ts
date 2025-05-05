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
import { getRefreshTokens, login } from "./lib/actions/auth.actions";
import { decryptData } from "../utils/encryptDecrypt";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";
import { refreshToken } from "./usecases/auth/refreshToken";
import { isObject } from "lodash";
import moment from "moment";
import { loginUserWithEmail } from "./usecases/auth/loginUserWithEmail";

interface IUser {
  id?: string;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
  userInfo?: string | undefined;
  email?: string | undefined;
}

interface ErrorResponse {
  error?: string;
  status?: number;
  message?: string;
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
          let resp = await login(data);
          user = resp ?? null;
          if (!(user && user.status === 200)) {
            throw new Error(resp.message?.toString() || "User not found.");
          }

          // return user object with their profile data
          user = user.data ?? {};
          return {
            ...user,
            accessToken: user.token || "",
            email: credentials?.email?.toString() || "",
          };
        } catch (err: any) {
          console.log("err in authorize sigin>>>", err);
          throw new Error(err?.message?.toString() || "internal server error");
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        if (user.email && !user.accessToken) {
          try {
            // Use the email from Google/Github to fetch/generate your tokens
            const email = user.email.toString();
            const resp = await loginUserWithEmail(email, {
              userRepository: new UserRepository(),
            });

            if (resp && resp.token && resp.refreshToken && resp.userInfo) {
              const { token: accessToken, refreshToken } = resp;
              return {
                ...token,
                accessToken,
                refreshToken,
                user: resp.userInfo,
              };
            }
          } catch (err: any) {
            console.error("OAuth login token generation error:", err);
            throw new Error(
              err?.message?.toString() || "internal server error"
            );
          }
        } else {
          const accessToken = user.accessToken || "";
          const refreshToken = user.refreshToken || "";
          return {
            ...token,
            accessToken,
            refreshToken,
            user,
          };
        }
      }

      if (token && token.accessToken && token.refreshToken) {
        const accessToken = decryptData(token.accessToken);
        const jwtToken = verifyAccessToken(accessToken);
        if (!jwtToken) {
          const refrshToken = decryptData(token.refreshToken);
          let rJwtToken = verifyRefreshToken(refrshToken);

          const currentTime = moment().valueOf();

          if (rJwtToken && isObject(rJwtToken) && rJwtToken.id) {
            const isExpired = currentTime > rJwtToken.expiredAt;
            if (isExpired) return token;

            const newTokens = await refreshToken(
              {
                id: rJwtToken.id,
                expiredAt: rJwtToken.expiredAt,
              },
              {
                userRepository: new UserRepository(),
              }
            );

            token = {
              ...token,
              accessToken: (newTokens && newTokens.token) || token.accessToken,
              refreshToken:
                (newTokens && newTokens.refreshToken) || token.refreshToken,
            };
            return token;
          } else return token;
        }
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken || "";
        session.refreshToken = token.refreshToken || "";
      }
      return session;
    },
  },
});
