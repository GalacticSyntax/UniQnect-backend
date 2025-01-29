import { Schema } from "mongoose";
import { IStudent, IStudentModel } from "../student.interface";
import { StudentConstant } from "../student.constant";
import { UserConstant } from "../../user/user.constant";

const studentSchema = new Schema<IStudent, IStudentModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: UserConstant.USER_COLLECTION_NAME,
      required: true,
      unique: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: StudentConstant.STUDENT_COLLECTION_NAME,
      required: true,
    },
    admittedAt: {
      type: Date,
      default: Date.now(),
    },
    session: {
      type: String,
      enum: [""],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default studentSchema;
