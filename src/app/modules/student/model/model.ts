import { IStudent, IStudentModel } from "../student.interface";
import { StudentConstant } from "../student.constant";
import { model } from "mongoose";

/* student schema start ================== */
import studentSchema from "./model.schema";
/* student schema end ================== */

/* student schema middleware start ================== */
import "./model.middleware";
/* student schema middleware end ================== */

/* student schema static methods start ================== */
import "./model.static.method";
/* student schema static methods end ================== */

export const StudentModel = model<IStudent, IStudentModel>(
  StudentConstant.STUDENT_COLLECTION_NAME,
  studentSchema,
);
