import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken } from "../../../utils/jwt";
import { decryptData } from "../../../utils/encryptDecrypt";

export function refreshGuard(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      let token = req.headers.get("refreshToken") || "";
      token = decryptData(token);
      const jwt = verifyRefreshToken(token);
      if (!jwt) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid token" },
          { status: 401 }
        );
      }

      return handler(req, jwt);
    } catch (err: any) {
      console.error("Auth error:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
