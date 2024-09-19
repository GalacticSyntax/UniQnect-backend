import { IDummy, IDummyModel } from "../dummy.interface";
import { DummyConstant } from "./../dummy.constant";
import { model } from "mongoose";

/* dummy schema start ================== */
import dummySchema from "./model.schema";
/* dummy schema end ================== */

/* dummy schema middleware start ================== */
import "./model.middleware";
/* dummy schema middleware end ================== */

/* dummy schema static methods start ================== */
import "./model.static.method";
/* dummy schema static methods end ================== */

export const DummyModel = model<IDummy, IDummyModel>(
  DummyConstant.DUMMY_COLLECTION_NAME,
  dummySchema,
);
