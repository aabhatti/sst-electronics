import { ClientSession, Types } from "mongoose";
import isEmpty from "lodash/isEmpty";
import { DealRepository } from "../../../repositories/DealRepository";
import { InstallmentRepository } from "../../../repositories/InstallmentRepository";
import { UserRepository } from "../../../repositories/UserRepository";
import { Installment, IInstallment } from "../../../models/Installment";
import { NotFound } from "../../../../errors";
import {
  UserMessages,
  DealMessages,
  InstallmentMessages,
  HttpStatusCode,
} from "../../../../constants";
import { DayMonthYearDateFormate } from "../../../../utils";
import { PdfService } from "@/services/PdfService";
import { constrainedMemory } from "node:process";
import { encryptData } from "../../../../utils/encryptDecrypt";

interface CreateDeps {
  dealRepository: DealRepository;
  installmentRepository: InstallmentRepository;
  userRepository: UserRepository;
  pdfService: PdfService;
}

interface CreateInstallmentResponse {
  code: number;
  message: string;
  data: IInstallment | null;
}

interface IInstallmentBoy
  extends Omit<IInstallment, "status createdBy updatedBy"> {}

async function createInstallment(
  body: IInstallmentBoy,
  {
    userRepository,
    dealRepository,
    installmentRepository,
    pdfService,
  }: CreateDeps,
  session?: ClientSession | undefined
): Promise<CreateInstallmentResponse> {
  const { userId, dealId, amount } = body;

  let user = await userRepository.findById(userId?.toString() || "");
  if (isEmpty(user)) {
    throw new NotFound(UserMessages.FAILED_TO_FIND_USER);
  }

  let deal = await dealRepository.findOne({
    _id: dealId,
    userId,
  });
  if (isEmpty(deal)) {
    throw new NotFound(DealMessages.FAILED_TO_FIND_DEAL);
  }

  if (Number(deal.due) - Number(amount) < 0) {
    throw new NotFound(InstallmentMessages.FAILED_TO_CREATE_INSTALLMENT);
  }

  const date = DayMonthYearDateFormate(new Date());
  let createInstallment = new Installment({
    userName: user?.name || "",
    userId: userId ? new Types.ObjectId(userId) : null,
    dealName: deal?.name || "",
    dealDues: 0,
    dealId: dealId ? new Types.ObjectId(dealId) : null,
    amount: Number(amount || 0),
    status: "paid",
    date,
    receipt: "",
    createdBy: userId ? new Types.ObjectId(userId) : null,
    updatedBy: userId ? new Types.ObjectId(userId) : null,
  });

  let installment = await installmentRepository.save(
    createInstallment,
    session
  );

  if (deal && installment) {
    deal.due = Number(deal?.due || 0) - Number(installment?.amount || 0);
    deal.paid = Number(deal?.paid || 0) + Number(installment?.amount || 0);
    deal.paidInstallments = Number(deal?.paidInstallments || 0) + 1;
    deal.noOfInstallments =
      Number(deal?.noOfInstallments) - Number(deal?.paidInstallments) <= 0 &&
      Number(deal.due) > 0
        ? Number(deal.paidInstallments) + 1
        : deal.noOfInstallments;
    deal = await dealRepository.save(deal, session);

    installment.dealDues = Number(deal?.due || 0);
    installment = await installmentRepository.save(installment, session);
  }

  const no = deal?.paidInstallments?.toString() || "0";
  let fileName = `${no}-${deal?.name || ""}.pdf`;
  fileName = fileName.replace(" ", "-");
  const receipt = encryptData({
    fileName,
    no,
    amount: installment?.amount || 0,
    methode: "",
    date: date,
    deal: deal?.name,
    userName: user?.name,
    cnic: user?.cnic,
    mobile: user?.mobile,
    email: user?.email,

    paidInstallments: deal?.paidInstallments,
    dueInstallments:
      Number(deal?.noOfInstallments || 0) - Number(deal?.paidInstallments || 0),
    totalAmount: deal?.worth,
    paidAmount: deal?.paid,
    dueAmount: deal?.due,
    receivedBy: "Admin",
    signature: "____________________________",
  });
  // const receipt = await pdfService.generateInstallmentReceiptPDF();
  if (receipt && installment) {
    installment.receipt = receipt;
    await installmentRepository.save(installment, session);
  }

  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
  return {
    data: installment,
    code: HttpStatusCode.CREATED,
    message: InstallmentMessages.CREATE_SUCCESS,
  };
}

export { createInstallment };
