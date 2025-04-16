import { connection } from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { InstallmentRepository } from "@/repositories/InstallmentRepository";
import { DealRepository } from "@/repositories/DealRepository";
import { fetchDashboardSummary } from "@/usecases/admin/dashboard/fetchDashboardSummary";

connection();
export async function GET(req: NextRequest) {
  try {
    const resp = await fetchDashboardSummary({
      installmentRepository: new InstallmentRepository(),
      dealRepository: new DealRepository(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
