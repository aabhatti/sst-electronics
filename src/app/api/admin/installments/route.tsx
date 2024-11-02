import { NextRequest, NextResponse } from "next/server";
import { DealRepository } from "../../../../repositories/DealRepository";
import { InstallmentRepository } from "../../../../repositories/InstallmentRepository";
import { UserRepository } from "../../../../repositories/UserRepository";
import { connection } from "../../../../database/dbConnection";
import { createInstallment } from "../../../../usecases/admin/installments/createInstallment";
import { fetchInstallments } from "../../../../usecases/admin/installments/fetchInstallments";
import { PdfService } from "@/services/PdfService";

connection();
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "";
    const offset = searchParams.get("offset") || "";
    const searched = searchParams.get("searched") || "";

    const resp = await fetchInstallments(
      { page, offset, searched },
      {
        installmentRepository: new InstallmentRepository(),
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
    const resp = await createInstallment(body, {
      userRepository: new UserRepository(),
      dealRepository: new DealRepository(),
      installmentRepository: new InstallmentRepository(),
      pdfService: new PdfService(),
    });

    return NextResponse.json({ ...resp }, { status: 200 });
  } catch (err: any) {
    console.log("err in createInstallment route>", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
