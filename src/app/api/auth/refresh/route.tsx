import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../repositories/UserRepository";
import { connection } from "../../../../database/dbConnection";
import { HttpStatusCode } from "../../../../../constants";
import { refreshGuard } from "@/lib/guard/refreshGuard";
import { refreshToken } from "@/usecases/auth/refreshToken";
import { IJwtPayload } from "@/utils/interfaces";

connection();

export const GET = refreshGuard(async (_: NextRequest, jwt: IJwtPayload) => {
  const resp = await refreshToken(jwt, {
    userRepository: new UserRepository(),
  });

  return NextResponse.json({ ...resp }, { status: HttpStatusCode.OK });
});
