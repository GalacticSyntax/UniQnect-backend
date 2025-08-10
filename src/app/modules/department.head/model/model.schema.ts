import { Schema } from "mongoose";
import { IDepartmentHead } from "../department.head.interface";
import { TeacherConstant } from "../../teacher/teacher.constant";

const departmentHeadSchema = new Schema<IDepartmentHead, IDepartmentHead>(
  {
    departmentCode: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: TeacherConstant.TEACHER_COLLECTION_NAME,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default departmentHeadSchema;
