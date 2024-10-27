import { ClientSession, Types } from "mongoose";
const { isEmpty } = require("lodash");
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

interface CreateDeps {
  dealRepository: DealRepository;
  installmentRepository: InstallmentRepository;
  userRepository: UserRepository;
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
  { userRepository, dealRepository, installmentRepository }: CreateDeps,
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
    deal = await dealRepository.save(deal, session);

    installment.dealDues = Number(deal?.due || 0);
    installment = await installmentRepository.save(installment, session);
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
