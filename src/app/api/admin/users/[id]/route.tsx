import { connection } from "@/database/dbConnection";
import { UserRepository } from "@/repositories/UserRepository";
import { fetchUserById } from "@/usecases/admin/users/fetchUserById";
import { NextRequest, NextResponse } from "next/server";

connection();
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params?.id || "";

    const resp = await fetchUserById(userId, {
      userRepository: new UserRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
