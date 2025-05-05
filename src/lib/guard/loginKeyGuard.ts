import { NextRequest, NextResponse } from "next/server";
import { loginKey } from "@/config";

export function loginKeyGuard(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    try {
      const key = req.headers.get("loginKey");
      if (!key) {
        return NextResponse.json(
          { error: "Unauthorized: Missing login key" },
          { status: 401 }
        );
      }

      if (key !== loginKey) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid login key" },
          { status: 401 }
        );
      }

      return handler(req); // pass user to handler
    } catch (err: any) {
      console.error("Auth error:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
