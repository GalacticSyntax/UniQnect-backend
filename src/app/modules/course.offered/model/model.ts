import {
  ICourseOffered,
  ICourseOfferedModel,
} from "../course.offered.interface";
import { CourseOfferedConstant } from "../course.offered.constant";
import { model } from "mongoose";

/* courseOffered schema start ================== */
import courseOfferedSchema from "./model.schema";
/* courseOffered schema end ================== */

/* courseOffered schema middleware start ================== */
import "./model.middleware";
/* courseOffered schema middleware end ================== */

/* courseOffered schema static methods start ================== */
import "./model.static.method";
/* courseOffered schema static methods end ================== */

export const CourseOfferedModel = model<ICourseOffered, ICourseOfferedModel>(
  CourseOfferedConstant.COURSE_OFFERED_COLLECTION_NAME,
  courseOfferedSchema,
);
