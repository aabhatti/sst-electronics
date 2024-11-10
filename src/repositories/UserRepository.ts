import mongoose, {
  Schema,
  Document,
  Model,
  ClientSession,
  PipelineStage,
} from "mongoose";
import { User } from "../models/User";
import { InternalServerError } from "../../errors";
import { GenericMessages, UserMessages } from "../../constants";

interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  name: string;
  salt: string;
  password: string;
  email: string;
  cnic: string;
  mobile: string;
  address: string;
  emailToken: string;
  status: string;
  refreshToken: string;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    name: { type: String, default: "" },
    salt: { type: String, default: "" },
    password: { type: String, default: "" },
    email: { type: String, unique: true, default: "" },
    cnic: { type: String, default: "" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    emailToken: { type: String, default: "" },
    status: { type: String, default: "unverified" },
    refreshToken: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserRecord: Model<IUserDocument> =
  mongoose?.models?.User || mongoose.model<IUserDocument>("User", UserSchema);

class UserRepository {
  async findById(
    id: string | null,
    select: string = "-password -salt -refreshToken"
  ): Promise<User | null> {
    try {
      const record = await UserRecord.findById(id).select(select).exec();
      if (record) {
        return new User(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(UserMessages.FAILED_TO_FIND_USER);
    }
  }

  async findOne(id: string | null): Promise<User | null> {
    try {
      const record = await UserRecord.findById(id).exec();
      if (record) {
        return new User(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(UserMessages.FAILED_TO_FIND_USER);
    }
  }

  async find(
    condition: object = {},
    select: string = "-password -salt -refreshToken"
  ): Promise<User[] | []> {
    try {
      const records = await UserRecord.find(condition)
        .select(select)
        .lean()
        .exec();
      if (records) {
        return records.map(
          (record) => new User({ ...record, id: record._id.toString() })
        );
      }
      return [];
    } catch (err) {
      throw new InternalServerError(UserMessages.FAILED_TO_FIND_USER);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const record = await UserRecord.findOne({ email }).exec();
      if (record) {
        return new User(record);
      }
      return null;
    } catch (err) {
      throw new InternalServerError(UserMessages.FAILED_TO_FIND_USER);
    }
  }
  async findByAggregation(aggregator: PipelineStage[]): Promise<any[]> {
    try {
      return await UserRecord.aggregate(aggregator).exec();
    } catch (err) {
      console.log("err>>>>>", err);
      throw new InternalServerError(GenericMessages.RECORD_NOT_FOUND);
    }
  }

  async save(
    value: User,
    session?: ClientSession | undefined
  ): Promise<User | null> {
    try {
      const { id, ...user } = value.toSerialized();
      if (id) {
        const record = await UserRecord.findByIdAndUpdate(id, user, {
          new: true,
          upsert: true,
          session,
        }).exec();
        if (record) {
          return new User(record);
        }
        return null;
      } else {
        let record = new UserRecord(user);
        record = await record.save({ session });
        return new User(record);
      }
    } catch (err) {
      throw new InternalServerError(UserMessages.FAILED_TO_SAVE_USER);
    }
  }
}

export { UserRepository };
