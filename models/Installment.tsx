import * as z from "zod";
import mongoose, { Types } from "mongoose";
import { dbId } from "../utils";

const ObjectId = mongoose.Types.ObjectId;

const InstallmentSchema = z.object({
  id: dbId.optional(),
  userName: z.string().default(""),
  userId: z.instanceof(ObjectId).nullable().default(null),
  dealName: z.string().default(""),
  dealId: z.instanceof(ObjectId).nullable().default(null),
  amount: z.number().default(0),
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
  dealId: Types.ObjectId | null;
  amount: Number;
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
  dealId: Types.ObjectId | null;
  amount: number;
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
    this.dealId = parsed.dealId ?? null;
    this.amount = parsed.amount ?? 0;
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
