import { ICurriculum, ICurriculumModel } from "../curriculum.interface";
import { CurriculumConstant } from "../curriculum.constant";
import { model } from "mongoose";

/* curriculum schema start ================== */
import curriculumSchema from "./model.schema";
/* curriculum schema end ================== */

/* curriculum schema middleware start ================== */
import "./model.middleware";
/* curriculum schema middleware end ================== */

/* curriculum schema static methods start ================== */
import "./model.static.method";
/* curriculum schema static methods end ================== */

export const CurriculumModel = model<ICurriculum, ICurriculumModel>(
  CurriculumConstant.CURRICULUM_COLLECTION_NAME,
  curriculumSchema,
);
