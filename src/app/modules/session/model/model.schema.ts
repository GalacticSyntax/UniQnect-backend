import { Schema } from "mongoose";
import { ISession, ISessionModel } from "../session.interface";

const sessionSchema = new Schema<ISession, ISessionModel>(
  {
    running: {
      type: String,
      requred: true,
    },
    previous: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default sessionSchema;
