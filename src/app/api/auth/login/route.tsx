import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../../repositories/UserRepository";
import { loginUser } from "../../../../../usecases/auth/loginUser";
import { connection } from "../../../../../database/dbConnection";
import { HttpStatusCode } from "../../../../../constants";
import { cookies } from "next/headers";

connection();
export async function POST(req: NextRequest) {
  // login route
  try {
    const body = await req.json();
    console.log("body >>>", body);

    const resp = await loginUser(body, {
      userRepository: new UserRepository(),
    });

    console.log("resp >>>", resp);

    cookies().set("token", resp.token, {
      httpOnly: true,
      maxAge: 300,
      sameSite: "strict",
    });

    cookies().set("refreshToken", resp.refreshToken, {
      httpOnly: true,
      // maxAge: 24 * 60 * 60,
      sameSite: "strict",
    });
    return NextResponse.json({ ...resp }, { status: HttpStatusCode.OK });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
