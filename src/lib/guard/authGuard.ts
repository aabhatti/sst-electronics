import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "../../../utils/jwt";
import { decryptData } from "../../../utils/encryptDecrypt";

export function authGuard(
  handler: (req: NextRequest, user: any) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { error: "Unauthorized: Missing token" },
          { status: 401 }
        );
      }

      let token = authHeader.split(" ")[1];
      token = decryptData(token);
      const jwt = verifyAccessToken(token);
      if (!jwt) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid token" },
          { status: 401 }
        );
      }

      // You can add role/permissions check here if needed
      return handler(req, jwt); // pass user to handler
    } catch (err: any) {
      console.error("Auth error:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
