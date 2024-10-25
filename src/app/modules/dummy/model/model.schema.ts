import { Schema } from "mongoose";
import { IDummy, IDummyModel } from "../dummy.interface";

const dummySchema = new Schema<IDummy, IDummyModel>(
  {
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default dummySchema;
