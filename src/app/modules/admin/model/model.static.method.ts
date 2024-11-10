import { TDocumentType } from "../../../interface/interface";
import { IAdmin } from "../admin.interface";
import { AdminModel } from "./model";
import adminSchema from "./model.schema";

adminSchema.statics.createDummyMethod = async (
  text: string,
): Promise<TDocumentType<IAdmin>> => {
  return AdminModel.create({
    text,
  });
};
