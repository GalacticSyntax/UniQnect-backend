import {
  ICurriculumEquivalentCourse,
  ICurriculumEquivalentCourseModel,
} from "../curriculum.equivalent.course.interface";
import { CurriculumEquivalentCourseConstant } from "../curriculum.equivalent.course.constant";
import { model } from "mongoose";

/* curriculum equivalent course schema start ================== */
import CurriculumEquivalentCourseSchema from "./model.schema";
/* curriculum equivalent course schema end ================== */

/* curriculum equivalent course schema middleware start ================== */
import "./model.middleware";
/* curriculum equivalent course schema middleware end ================== */

/* curriculum equivalent course schema static methods start ================== */
import "./model.static.method";
/* curriculum equivalent course schema static methods end ================== */

export const CurriculumEquivalentCourseModel = model<
  ICurriculumEquivalentCourse,
  ICurriculumEquivalentCourseModel
>(
  CurriculumEquivalentCourseConstant.CURRICULUM_EQUIVALENT_COURSE_COLLECTION_NAME,
  CurriculumEquivalentCourseSchema,
);
