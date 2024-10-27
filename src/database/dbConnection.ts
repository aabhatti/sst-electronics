import mongoose from "mongoose";
mongoose.set("debug", false);
import { url } from "../../config/database";

export const connection = async () => {
  try {
    await mongoose.connect(url!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connected to database,...");
    });
    connection.on("error", (err) => {
      console.log("can't connect to database", err);
      process.exit();
    });
    connection.on("disconnected", () => {
      console.log("Mongodb disconnected,...");
    });
  } catch (err) {
    console.log("can't connect to database", err);
    process.exit();
  }
};
