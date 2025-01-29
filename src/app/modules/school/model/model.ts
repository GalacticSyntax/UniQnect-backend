import { ISchool, ISchoolModel } from "../school.interface";
import { SchoolConstant } from "../school.constant";
import { model } from "mongoose";

/* school schema start ================== */
import schoolSchema from "./model.schema";
/* school schema end ================== */

/* school schema middleware start ================== */
import "./model.middleware";
/* school schema middleware end ================== */

/* school schema static methods start ================== */
import "./model.static.method";
/* school schema static methods end ================== */

export const SchoolModel = model<ISchool, ISchoolModel>(
  SchoolConstant.SCHOOL_COLLECTION_NAME,
  schoolSchema,
);
