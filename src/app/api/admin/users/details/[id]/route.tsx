// import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "@/database/dbConnection";
import { DealRepository } from "@/repositories/DealRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { fetchUserDetails } from "@/usecases/admin/users/fetchUserDetails";
import { NextRequest, NextResponse } from "next/server";

connection();
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const resp = await fetchUserDetails(userId, {
      userRepository: new UserRepository(),
      dealRepository: new DealRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
