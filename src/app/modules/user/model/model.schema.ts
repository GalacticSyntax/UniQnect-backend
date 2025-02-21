import { Schema } from "mongoose";
import { IUser, IUserModel } from "../user.interface";
import { UserConstant } from "../user.constant";

const userSchema = new Schema<IUser, IUserModel>(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validate email format
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: ["student"],
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: Object.values(UserConstant.GENDER_TYPES),
      required: true,
    },
    presentAddress: {
      type: String,
      trim: true,
    },
    permanentAddress: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default userSchema;
