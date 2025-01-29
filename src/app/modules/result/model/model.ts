import { IResult, IResultModel } from "../result.interface";
import { ResultConstant } from "../result.constant";
import { model } from "mongoose";

/* result schema start ================== */
import resultSchema from "./model.schema";
/* result schema end ================== */

/* result schema middleware start ================== */
import "./model.middleware";
/* result schema middleware end ================== */

/* result schema static methods start ================== */
import "./model.static.method";
/* result schema static methods end ================== */

export const ResultModel = model<IResult, IResultModel>(
  ResultConstant.RESULT_COLLECTION_NAME,
  resultSchema,
);
