import * as z from "zod";
import mongoose, { Types } from "mongoose";
import { dbId } from "../../utils";

const ObjectId = mongoose.Types.ObjectId;

const DealSchema = z.object({
  id: dbId.optional(),
  name: z.string(),
  userName: z.string().optional(),
  userId: z.instanceof(ObjectId).nullable().default(null),
  worth: z.number().default(0),
  paid: z.number().default(0),
  due: z.number().default(0),
  paidInstallments: z.number().default(0),
  noOfInstallments: z.number().default(0),
  description: z.string().default(""),
  referenceOne: z.instanceof(ObjectId).nullable().default(null),
  referenceTwo: z.instanceof(ObjectId).nullable().default(null),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

// Updated IDeal interface
interface IDeal {
  id?: string | Types.ObjectId;
  name: String;
  userName?: String | undefined;
  userId: Types.ObjectId | null;
  worth: Number;
  paid: Number;
  due: Number;
  paidInstallments: Number;
  noOfInstallments: Number;
  description: String;
  referenceOne: Types.ObjectId | null;
  referenceTwo: Types.ObjectId | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Deal {
  id?: string | Types.ObjectId;
  name: string;
  userName?: string;
  userId: Types.ObjectId | null;
  worth: number;
  paid: number;
  due: number;
  paidInstallments: number;
  noOfInstallments: number;
  description: string;
  referenceOne: Types.ObjectId | null;
  referenceTwo: Types.ObjectId | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;

  constructor(possibleUser: IDeal) {
    const parsed = DealSchema.parse(possibleUser);
    this.id = parsed.id || "";
    this.name = parsed.name;
    this.userName = parsed.userName;
    this.userId = parsed.userId ?? null;
    this.worth = parsed.worth ?? 0;
    this.paid = parsed.paid ?? 0;
    this.due = parsed.due ?? 0;
    this.paidInstallments = parsed.paidInstallments ?? 0;
    this.noOfInstallments = parsed.noOfInstallments ?? 0;
    this.description = parsed.description;
    this.referenceOne = parsed.referenceOne ?? null;
    this.referenceTwo = parsed.referenceTwo ?? null;
    this.createdAt = parsed.createdAt ?? null;
    this.updatedAt = parsed.updatedAt ?? null;
  }

  toSerialized() {
    return { ...this };
  }
}

export { Deal, type IDeal };
