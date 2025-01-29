import { Schema } from "mongoose";
import { ITeacher, ITeacherModel } from "../teacher.interface";
import { UserConstant } from "../../user/user.constant";
import { DepartmentConstant } from "../../department/department.constant";

const teacherSchema = new Schema<ITeacher, ITeacherModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserConstant.USER_COLLECTION_NAME,
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      enum: [],
      default: "",
    },
    joinedAt: {
      type: Date,
      default: Date.now(),
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: DepartmentConstant.DEPARTMENT_COLLECTION_NAME,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default teacherSchema;
