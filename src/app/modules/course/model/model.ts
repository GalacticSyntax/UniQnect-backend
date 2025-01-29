import { ICourse, ICourseModel } from "../course.interface";
import { CourseConstant } from "../course.constant";
import { model } from "mongoose";

/* course schema start ================== */
import courseSchema from "./model.schema";
/* course schema end ================== */

/* course schema middleware start ================== */
import "./model.middleware";
/* course schema middleware end ================== */

/* course schema static methods start ================== */
import "./model.static.method";
/* course schema static methods end ================== */

export const CourseModel = model<ICourse, ICourseModel>(
  CourseConstant.COURSE_COLLECTION_NAME,
  courseSchema,
);
