"use server";
import { IJwtPayload } from "@/utils/interfaces";
import { refreshToken } from "@/usecases/auth/refreshToken";
import { UserRepository } from "@/repositories/UserRepository";

export async function handleRefreshToken(refreshTokenObj: IJwtPayload) {
  try {
    const newTokens = await refreshToken(refreshTokenObj, {
      userRepository: new UserRepository(),
    });
    return newTokens;
  } catch (error: any) {
    console.log("error in handleRefreshToken catch>>");
    return null;
  }
}
