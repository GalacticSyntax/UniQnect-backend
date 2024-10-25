import { TDocumentType } from "../../../interface/interface";
import { IDummy } from "../dummy.interface";
import { DummyModel } from "./model";
import dummySchema from "./model.schema";

dummySchema.statics.createDummyMethod = async (
  text: string,
): Promise<TDocumentType<IDummy>> => {
  return DummyModel.create({
    text,
  });
};
