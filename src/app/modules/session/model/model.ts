import { ISession, ISessionModel } from "../session.interface";
import { SessionConstant } from "../session.constant";
import { model } from "mongoose";

/* session schema start ================== */
import sessionSchema from "./model.schema";
/* session schema end ================== */

/* session schema middleware start ================== */
import "./model.middleware";
/* session schema middleware end ================== */

/* session schema static methods start ================== */
import "./model.static.method";
/* session schema static methods end ================== */

export const CurriculumModel = model<ISession, ISessionModel>(
  SessionConstant.SESSION_COLLECTION_NAME,
  sessionSchema,
);
