import { Schema } from "mongoose";
import { IDepartment, IDepartmentModel } from "../department.interface";
import { SchoolConstant } from "../../school/school.constant";

const departmentSchema = new Schema<IDepartment, IDepartmentModel>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
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

export default departmentSchema;
