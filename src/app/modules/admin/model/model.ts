import { IAdmin, IAdminModel } from "../admin.interface";
import { AdminConstant } from "../admin.constant";
import { model } from "mongoose";

/* admin schema start ================== */
import adminSchema from "./model.schema";
/* admin schema end ================== */

/* admin schema middleware start ================== */
import "./model.middleware";
/* admin schema middleware end ================== */

/* admin schema static methods start ================== */
import "./model.static.method";
/* admin schema static methods end ================== */

export const AdminModel = model<IAdmin, IAdminModel>(
  AdminConstant.ADMIN_COLLECTION_NAME,
  adminSchema,
);
