import { NextRequest, NextResponse } from "next/server";
import { DealRepository } from "../../../../repositories/DealRepository";
import { InstallmentRepository } from "../../../../repositories/InstallmentRepository";
import { UserRepository } from "../../../../repositories/UserRepository";
import { connection } from "../../../../database/dbConnection";
import { createDeal } from "../../../../usecases/admin/deals/createDeal";
import { fetchDeals } from "../../../../usecases/admin/deals/fetchDeals";

connection();
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "";
    const offset = searchParams.get("offset") || "";
    const searched = searchParams.get("searched") || "";

    const resp = await fetchDeals(
      { page, offset, searched },
      {
        dealRepository: new DealRepository(),
      }
    );

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

connection();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const resp = await createDeal(body, {
      userRepository: new UserRepository(),
      dealRepository: new DealRepository(),
      installmentRepository: new InstallmentRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
