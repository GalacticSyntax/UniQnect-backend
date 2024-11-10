import { Schema } from "mongoose";
import { ISchool, ISchoolModel } from "../school.interface";

const schoolSchema = new Schema<ISchool, ISchoolModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    schoolId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default schoolSchema;
