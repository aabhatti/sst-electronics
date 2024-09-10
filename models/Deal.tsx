import * as z from "zod";
import mongoose, { Types, Schema } from "mongoose";
import { dbId } from "../utils";

const ObjectId = mongoose.Types.ObjectId;

const DealSchema = z.object({
  id: dbId.optional(),
  name: z.string(),
  userName: z.string(),
  userId: z.instanceof(ObjectId).nullable().default(null),
  worth: z.number().default(0),
  due: z.number().default(0),
  referenceOne: z.instanceof(ObjectId).nullable().default(null),
  referenceTwo: z.instanceof(ObjectId).nullable().default(null),
  createdAt: z.instanceof(Date).nullable().optional(),
  updatedAt: z.instanceof(Date).nullable().optional(),
});

// Updated IDeal interface
interface IDeal {
  id?: string | Types.ObjectId;
  name: String;
  userName: String;
  userId: Types.ObjectId | null;
  worth: Number;
  due: Number;
  referenceOne: Types.ObjectId | null;
  referenceTwo: Types.ObjectId | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

class Deal {
  id?: string | Types.ObjectId;
  name: string;
  userName: string;
  userId: Types.ObjectId | null;
  worth: number;
  due: number;
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
    this.due = parsed.due ?? 0;
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
