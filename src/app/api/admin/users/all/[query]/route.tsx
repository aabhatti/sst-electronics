import { connection } from "@/database/dbConnection";
import { UserRepository } from "@/repositories/UserRepository";
import { fetchAllQueriedUsers } from "@/usecases/admin/users/fetchAllQueriedUsers";
import { NextRequest, NextResponse } from "next/server";

connection();
export async function GET(
  req: NextRequest,
  { params }: { params: { query: string } }
) {
  try {
    const query = params?.query || "";

    const resp = await fetchAllQueriedUsers(query, {
      userRepository: new UserRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
