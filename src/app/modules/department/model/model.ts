import { IDepartment, IDepartmentModel } from "../department.interface";
import { DepartmentConstant } from "../department.constant";
import { model } from "mongoose";

/* departmentConstant schema start ================== */
import departmentSchema from "./model.schema";
/* departmentConstant schema end ================== */

/* departmentConstant schema middleware start ================== */
import "./model.middleware";
/* departmentConstant schema middleware end ================== */

/* departmentConstant schema static methods start ================== */
import "./model.static.method";
/* departmentConstant schema static methods end ================== */

export const DepartmentModel = model<IDepartment, IDepartmentModel>(
  DepartmentConstant.DEPARTMENT_COLLECTION_NAME,
  departmentSchema,
);
