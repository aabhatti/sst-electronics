// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../repositories/UserRepository";
import { registerUser } from "../../../../usecases/auth/registerUser";
import { connection } from "../../../../database/dbConnection";

connection();
export async function GET(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await registerUser(body, {
      userRepository: new UserRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
