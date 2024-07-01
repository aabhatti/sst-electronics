import mongoose, { Schema, Document, Model, ClientSession } from "mongoose";
import { User } from "../models/User";
import { InternalServerError } from "../errors";
import { UserMessages } from "../constants";

interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  salt: string;
  password: string;
  email: string;
  refreshToken: string;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    salt: { type: String, default: "" },
    password: { type: String, default: "" },
    email: { type: String, unique: true, default: "" },
    refreshToken: { type: String, default: "" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const UserRecord: Model<IUserDocument> =
  mongoose.models.users || mongoose.model<IUserDocument>("User", UserSchema);

class UserRepository {
  async findById(id: string | null): Promise<User | null> {
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
