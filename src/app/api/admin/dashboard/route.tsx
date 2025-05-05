import { connection } from "@/database/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { InstallmentRepository } from "@/repositories/InstallmentRepository";
import { DealRepository } from "@/repositories/DealRepository";
import { fetchDashboardSummary } from "@/usecases/admin/dashboard/fetchDashboardSummary";
import { authGuard } from "@/lib/guard/authGuard";
import { UserRepository } from "@/repositories/UserRepository";

connection();
export const GET = authGuard(async (_: NextRequest, jwt: any) => {
  const resp = await fetchDashboardSummary(jwt, {
    userRepository: new UserRepository(),
    installmentRepository: new InstallmentRepository(),
    dealRepository: new DealRepository(),
  });

  return NextResponse.json({ ...resp }, { status: 200 });
});
