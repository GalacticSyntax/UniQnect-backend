import { Schema } from "mongoose";
import { IAdmin, IAdminModel } from "../admin.interface";

const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default adminSchema;
