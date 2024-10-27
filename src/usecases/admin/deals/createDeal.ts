import { ClientSession, Types } from "mongoose";
const { isEmpty } = require("lodash");
import { DealRepository } from "../../../repositories/DealRepository";
import { UserRepository } from "../../../repositories/UserRepository";
import { InstallmentRepository } from "../../../repositories/InstallmentRepository";
import { IDeal, Deal } from "../../../models/Deal";
import { Installment } from "../../../models/Installment";
import { NotFound, InternalServerError, Conflict } from "../../../../errors";
import {
  UserMessages,
  DealMessages,
  GenericMessages,
  HttpStatusCode,
} from "../../../../constants";
import {
  addMonthsToDate,
  DayMonthYearDateFormate,
  MonthYearDateFormate,
} from "../../../../utils";

interface CreateDeps {
  dealRepository: DealRepository;
  userRepository: UserRepository;
  installmentRepository: InstallmentRepository;
}

interface FetchDealResponse {
  code: number;
  message: string;
  data: IDeal | null;
}

// Create a new interface excluding 'due'
interface IDealBody extends Omit<IDeal, "paid due"> {
  advance: number;
}

async function createDeal(
  body: IDealBody,
  { userRepository, dealRepository, installmentRepository }: CreateDeps,
  session?: ClientSession | undefined
): Promise<FetchDealResponse> {
  let {
    name,
    description,
    userId,
    worth,
    advance,
    noOfInstallments,
    referenceOne,
    referenceTwo,
  } = body;

  let user, userOne, userTwo;
  user = await userRepository.findById(userId?.toString() || "");
  userOne = await userRepository.findById(referenceOne?.toString() || "");
  userTwo = await userRepository.findById(referenceTwo?.toString() || "");

  if (isEmpty(user)) {
    throw new NotFound(UserMessages.FAILED_TO_FIND_USER);
  }
  if (isEmpty(userOne)) {
    throw new NotFound(`${UserMessages.FAILED_TO_FIND_USER} Reference One`);
  }
  if (isEmpty(userTwo)) {
    throw new NotFound(`${UserMessages.FAILED_TO_FIND_USER} Reference Two`);
  }

  if (referenceOne === referenceTwo) {
    throw new Conflict(`${UserMessages.REFERENCES_NOT_SAME}`);
  }

  let createDeal = new Deal({
    name,
    userName: user?.name || "",
    description,
    userId: userId ? new Types.ObjectId(userId) : null,
    worth: Number(worth),
    paid: Number(advance),
    due: Number(worth),
    paidInstallments: 0,
    noOfInstallments: Number(noOfInstallments),
    referenceOne: referenceOne ? new Types.ObjectId(referenceOne) : null,
    referenceTwo: referenceTwo ? new Types.ObjectId(referenceTwo) : null,
  });

  let deal = await dealRepository.save(createDeal, session);
  if (!deal) {
    throw new InternalServerError(GenericMessages.FAILED_TO_SAVE_RECORD);
  }

  if (Number(advance) > 0) {
    const date = DayMonthYearDateFormate(new Date());
    const due = Number(deal?.due || 0) - Number(advance || 0);
    let createInstallmet = new Installment({
      userName: user?.name || "",
      userId: userId ? new Types.ObjectId(userId) : null,
      dealName: deal?.name || "",
      dealDues: due,
      dealId: deal?.id ? new Types.ObjectId(deal.id) : null,
      amount: Number(advance || 0),
      status: "paid",
      date,
      receipt: "",
      createdBy: userId ? new Types.ObjectId(userId) : null,
      updatedBy: userId ? new Types.ObjectId(userId) : null,
    });

    await installmentRepository.save(createInstallmet, session);
    deal.paidInstallments = 1;
    deal.due = due;
    await dealRepository.save(deal, session);
  }
  if (session) {
    await session.commitTransaction();
    session.endSession();
  }
  return {
    data: deal,
    code: HttpStatusCode.CREATED,
    message: DealMessages.CREATE_SUCCESS,
  };
}

export { createDeal };
