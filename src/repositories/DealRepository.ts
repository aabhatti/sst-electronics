import mongoose, {
  Schema,
  Document,
  Model,
  ClientSession,
  PipelineStage,
  Types,
} from "mongoose";
import { Deal } from "../models/Deal";
import { InternalServerError } from "../../errors";
import { GenericMessages, DealMessages } from "../../constants";

interface IDealDocument extends Document {
  name: String;
  userName: String;
  userId: Types.ObjectId;
  worth: Number;
  paid: Number;
  due: Number;
  paidInstallments: Number;
  noOfInstallments: Number;
  description: String;
  referenceOne: Types.ObjectId;
  referenceTwo: Types.ObjectId;
}

const DealSchema: Schema<IDealDocument> = new Schema(
  {
    name: { type: String, default: "" },
    userName: { type: String, default: "" },
    userId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    worth: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    due: { type: Number, default: 0 },
    paidInstallments: { type: Number, default: 0 },
    noOfInstallments: { type: Number, default: 0 },
    referenceOne: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    referenceTwo: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const DealRecord: Model<IDealDocument> =
  mongoose.models.Deal || mongoose.model<IDealDocument>("Deal", DealSchema);

class DealRepository {
  async findById(id: string | null): Promise<Deal | null> {
    try {
      const record = await DealRecord.findById(id).exec();
      if (record) {
        return new Deal(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(DealMessages.FAILED_TO_FIND_DEAL);
    }
  }

  async findOne(condition: object = {}): Promise<Deal | null> {
    try {
      const record = await DealRecord.findOne(condition).exec();
      if (record) {
        return new Deal(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(DealMessages.FAILED_TO_FIND_DEAL);
    }
  }

  async find(
    condition: object = {},
    select: string = "-__v"
  ): Promise<Deal[] | []> {
    try {
      const records = await DealRecord.find(condition)
        .select(select)
        .lean()
        .exec();
      if (records) {
        return records.map(
          (record) => new Deal({ ...record, id: record._id.toString() })
        );
      }
      return [];
    } catch (err) {
      throw new InternalServerError(DealMessages.FAILED_TO_FIND_DEAL);
    }
  }

  async findByAggregation(aggregator: PipelineStage[]): Promise<any[]> {
    try {
      return await DealRecord.aggregate(aggregator).exec();
    } catch (err) {
      throw new InternalServerError(GenericMessages.RECORD_NOT_FOUND);
    }
  }

  async save(
    value: Deal,
    session?: ClientSession | undefined
  ): Promise<Deal | null> {
    try {
      const { id, ...data } = value.toSerialized();
      if (id) {
        const record = await DealRecord.findByIdAndUpdate(id, data, {
          new: true,
          upsert: true,
          session,
        }).exec();
        if (record) {
          return new Deal(record);
        }
        return null;
      } else {
        let record = new DealRecord(data);
        record = await record.save({ session });
        return new Deal(record);
      }
    } catch (err) {
      throw new InternalServerError(DealMessages.FAILED_TO_SAVE_DEAL);
    }
  }
}

export { DealRepository };
