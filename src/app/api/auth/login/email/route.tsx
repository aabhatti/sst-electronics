import { NextRequest, NextResponse } from "next/server";
import { connection } from "@/database/dbConnection";
import { UserRepository } from "@/repositories/UserRepository";
import { HttpStatusCode } from "../../../../../../constants";
import { loginUserWithEmail } from "@/usecases/auth/loginUserWithEmail";
import { authGuard } from "@/lib/guard/authGuard";
import { loginKeyGuard } from "@/lib/guard/loginKeyGuard";

connection();
// export async function POST(req: NextRequest) {
//   // login route
//   try {
//     const body = await req.json();

//     const resp = await loginUserWithEmail(body, {
//       userRepository: new UserRepository(),
//     });

//     return NextResponse.json({ ...resp }, { status: HttpStatusCode.OK });
//   } catch (err: any) {
//     console.log("err in login api catch>>", err);
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     );
//   }
// }

export const POST = loginKeyGuard(async (req: NextRequest) => {
  const body = await req.json();
  if (!body?.email) {
    return NextResponse.json(
      { message: "Email is required!" },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }
  const resp = await loginUserWithEmail(body.email, {
    userRepository: new UserRepository(),
  });

  return NextResponse.json({ ...resp }, { status: HttpStatusCode.OK });
});
