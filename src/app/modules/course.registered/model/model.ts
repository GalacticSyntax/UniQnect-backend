import { model } from "mongoose";


/* course registered schema start ================== */
import courseRegisteredSchema from "./model.schema";
/* course registered schema end ================== */

/* course registered schema middleware start ================== */
import "./model.middleware";
/* course registered schema middleware end ================== */

/* course registered schema static methods start ================== */
import "./model.static.method";
import { ICourseRegistered, ICourseRegisteredModel } from "../course.registered.interface";
import { CourseRegisteredConstant } from "../course.registered.constant";
/* course registered schema static methods end ================== */

export const CourseRegisteredModel = model<
  ICourseRegistered,
  ICourseRegisteredModel
>(
  CourseRegisteredConstant.COURSE_REGISTERED_COLLECTION_NAME,
  courseRegisteredSchema,
);
