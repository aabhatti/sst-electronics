import * as z from "zod";
import mongoose, { Types } from "mongoose";
import { dbId } from "../../utils";

const ObjectId = mongoose.Types.ObjectId;

const InstallmentSchema = z.object({
  id: dbId.optional(),
  userName: z.string().default(""),
  userId: z.instanceof(ObjectId).nullable().default(null),
  dealName: z.string().default(""),
  dealDues: z.number().default(0),
  dealId: z.instanceof(ObjectId).nullable().default(null),
  amount: z.number().default(0),
  status: z.string().default("due"),
  date: z.string().default(""),
  receipt: z.string().default(""),
  paymentMethode: z.string().default(""),
  createdBy: z.instanceof(ObjectId).nullable().default(null),
  updatedBy: z.instanceof(ObjectId).nullable().default(null),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

// Updated IInstallment interface
interface IInstallment {
  id?: string | Types.ObjectId;
  userName: String;
  userId: Types.ObjectId | null;
  dealName: String;
  dealDues: Number;
  dealId: Types.ObjectId | null;
  amount: Number;
  status: String;
  date: string;
  receipt: String;
  paymentMethode: String;
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Installment {
  id?: string | Types.ObjectId;
  userName: string;
  userId: Types.ObjectId | null;
  dealName: string;
  dealDues: Number;
  dealId: Types.ObjectId | null;
  amount: number;
  status: string;
  date: string;
  receipt: string;
  paymentMethode: string;
  createdBy: Types.ObjectId | null;
  updatedBy: Types.ObjectId | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(possibleUser: IInstallment) {
    const parsed = InstallmentSchema.parse(possibleUser);
    this.id = parsed.id || "";
    this.userName = parsed.userName;
    this.userId = parsed.userId ?? null;
    this.dealName = parsed.dealName;
    this.dealDues = parsed.dealDues;
    this.dealId = parsed.dealId ?? null;
    this.amount = parsed.amount ?? 0;
    this.status = parsed.status;
    this.date = parsed.date;
    this.receipt = parsed.receipt;
    this.paymentMethode = parsed.paymentMethode;
    this.createdBy = parsed.createdBy ?? null;
    this.updatedBy = parsed.updatedBy ?? null;
    this.createdAt = parsed.createdAt ?? null;
    this.updatedAt = parsed.updatedAt ?? null;
  }

  toSerialized() {
    return { ...this };
  }
}

export { Installment, type IInstallment };
