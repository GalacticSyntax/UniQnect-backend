import { Schema } from "mongoose";
import { IDepartment, IDepartmentModel } from "../department.interface";
import { SchoolConstant } from "../../school/school.constant";

const departmentSchema = new Schema<IDepartment, IDepartmentModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: SchoolConstant.SCHOOL_COLLECTION_NAME,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default departmentSchema;
