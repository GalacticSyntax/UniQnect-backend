import { ITeacher, ITeacherModel } from "../teacher.interface";
import { TeacherConstant } from "../teacher.constant";
import { model } from "mongoose";

/* teacher schema start ================== */
import teacherSchema from "./model.schema";
/* teacher schema end ================== */

/* teacher schema middleware start ================== */
import "./model.middleware";
/* teacher schema middleware end ================== */

/* teacher schema static methods start ================== */
import "./model.static.method";
/* teacher schema static methods end ================== */

export const TeacherModel = model<ITeacher, ITeacherModel>(
  TeacherConstant.TEACHER_COLLECTION_NAME,
  teacherSchema,
);
