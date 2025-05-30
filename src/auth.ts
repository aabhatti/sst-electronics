import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { loginSchema } from "@/utils/zodValidations";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "./config";
import {
  handleLogout,
  login,
  loginWithEmail,
} from "./lib/actions/auth.actions";
import { HttpStatusCode } from "../constants";

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
            const resp = await loginWithEmail(email);
            if (resp && resp.status === HttpStatusCode.OK && resp.data) {
              const { token: accessToken, refreshToken, userInfo } = resp.data;
              return {
                ...token,
                accessToken,
                refreshToken,
                user: userInfo || token.user,
              };
            }
          } catch (err: any) {
            console.error("OAuth login token generation error:", err);
            handleLogout();
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

      // if (token && token.accessToken && token.refreshToken) {
      //   const accessToken = decryptData(token.accessToken);
      //   const jwtToken = verifyAccessToken(accessToken);
      //   if (!jwtToken) {
      //     const refrshToken = decryptData(token.refreshToken);
      //     let rJwtToken = verifyRefreshToken(refrshToken);

      //     const currentTime = moment().valueOf();

      //     if (rJwtToken && isObject(rJwtToken) && rJwtToken.id) {
      //       const isExpired = currentTime > rJwtToken.expiredAt;
      //       if (isExpired) return token;
      //       const newTokens = await handleRefreshToken({
      //         id: rJwtToken.id,
      //         expiredAt: rJwtToken.expiredAt,
      //       });

      //       token = {
      //         ...token,
      //         accessToken: (newTokens && newTokens.token) || token.accessToken,
      //         refreshToken:
      //           (newTokens && newTokens.refreshToken) || token.refreshToken,
      //       };
      //       return token;
      //     } else return token;
      //   }
      // }
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
