import mongoose, {
  Schema,
  Document,
  Model,
  ClientSession,
  PipelineStage,
  Types,
} from "mongoose";
import { Installment } from "../models/Installment";
import { InternalServerError } from "../../errors";
import { GenericMessages, InstallmentMessages } from "../../constants";

interface IInstallmentDocument extends Document {
  userName: String;
  userId: Types.ObjectId;
  dealName: String;
  dealDues: Number;
  dealId: Types.ObjectId;
  amount: Number;
  status: String;
  date: string;
  receipt: String;
  paymentMethode: String;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
}

const InstallmentSchema: Schema<IInstallmentDocument> = new Schema(
  {
    userName: { type: String, default: "" },
    userId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    dealName: { type: String, default: "" },
    dealId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Deal",
    },
    dealDues: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    status: { type: String, default: "due" },
    date: { type: String, default: "" },
    receipt: { type: String, default: "" },
    paymentMethode: { type: String, default: "cash" },
    createdBy: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const InstallmentRecord: Model<IInstallmentDocument> =
  mongoose.models.Installment ||
  mongoose.model<IInstallmentDocument>("Installment", InstallmentSchema);

class InstallmentRepository {
  async findById(id: string | null): Promise<Installment | null> {
    try {
      const record = await InstallmentRecord.findById(id).exec();
      if (record) {
        return new Installment(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(
        InstallmentMessages.FAILED_TO_FIND_INSTALLMENT
      );
    }
  }

  async findOne(condition: object = {}): Promise<Installment | null> {
    try {
      const record = await InstallmentRecord.findOne(condition).exec();
      if (record) {
        return new Installment(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(
        InstallmentMessages.FAILED_TO_FIND_INSTALLMENT
      );
    }
  }

  async find(condition: object = {}): Promise<Installment[] | []> {
    try {
      const records = await InstallmentRecord.find(condition).exec();
      if (records) {
        return records.map((record) => new Installment(record));
      }
      return [];
    } catch (err) {
      throw new InternalServerError(
        InstallmentMessages.FAILED_TO_FIND_INSTALLMENT
      );
    }
  }

  async findByAggregation(aggregator: PipelineStage[]): Promise<any[]> {
    try {
      return await InstallmentRecord.aggregate(aggregator).exec();
    } catch (err) {
      throw new InternalServerError(GenericMessages.RECORD_NOT_FOUND);
    }
  }

  async save(
    value: Installment,
    session?: ClientSession | undefined
  ): Promise<Installment | null> {
    try {
      const { id, ...data } = value.toSerialized();
      if (id) {
        const record = await InstallmentRecord.findByIdAndUpdate(id, data, {
          new: true,
          upsert: true,
          session,
        }).exec();
        if (record) {
          return new Installment(record);
        }
        return null;
      } else {
        let record = new InstallmentRecord(data);
        record = await record.save({ session });
        return new Installment(record);
      }
    } catch (err) {
      throw new InternalServerError(
        InstallmentMessages.FAILED_TO_SAVE_INSTALLMENT
      );
    }
  }

  async insertMany(
    values: Installment[],
    session?: ClientSession | undefined
  ): Promise<Installment[] | []> {
    try {
      let records = await InstallmentRecord.insertMany(values, { session });
      console.log("records after insert many>>>", records);
      return records?.map((record) => new Installment(record)) || [];
    } catch (err) {
      throw new InternalServerError(
        InstallmentMessages.FAILED_TO_SAVE_INSTALLMENT
      );
    }
  }
}

export { InstallmentRepository };
