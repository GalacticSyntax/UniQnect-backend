import "./model.static.method";
import {
  IDepartmentHead,
  IDepartmentHeadModel,
} from "../department.head.interface";
import { model } from "mongoose";

/* DepartmentHead schema start ================== */
import departmentHeadSchema from "./model.schema";
/* DepartmentHead schema end ================== */

/* DepartmentHead schema middleware start ================== */
import "./model.middleware";
/* DepartmentHead schema middleware end ================== */

/* DepartmentHead schema static methods start ================== */
import { DepartmentHeadConstant } from "../department.head.constant";
/* DepartmentHead schema static methods end ================== */

export const DepartmentHeadModel = model<IDepartmentHead, IDepartmentHeadModel>(
  DepartmentHeadConstant.DEPARTMENT_HEAD_COLLECTION_NAME,
  departmentHeadSchema,
);
