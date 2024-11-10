import { ICourseAdvisor, ICourseAdvisorModel } from "../course.advisor.interface";
import { CourseAdvisorConstant } from "../course.advisor.constant";
import { model } from "mongoose";

/* courseAdvisor schema start ================== */
import courseAdvisorSchema from "./model.schema";
/* courseAdvisor schema end ================== */

/* courseAdvisor schema middleware start ================== */
import "./model.middleware";
/* courseAdvisor schema middleware end ================== */

/* courseAdvisor schema static methods start ================== */
import "./model.static.method";
/* courseAdvisor schema static methods end ================== */

export const CourseAdvisorModel = model<ICourseAdvisor, ICourseAdvisorModel>(
  CourseAdvisorConstant.COURSE_ADVISOR_COLLECTION_NAME,
  courseAdvisorSchema,
);
