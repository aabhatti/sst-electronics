// import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "../../../../../repositories/UserRepository";
import { fetchUsers } from "../../../../../usecases/admin/users/fetchUsers";
import { connection } from "../../../../../database/dbConnection";

connection();
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "";
    const offset = searchParams.get("offset") || "";
    const searched = searchParams.get("searched") || "";

    const resp = await fetchUsers(
      { page, offset, searched },
      {
        userRepository: new UserRepository(),
      }
    );

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
