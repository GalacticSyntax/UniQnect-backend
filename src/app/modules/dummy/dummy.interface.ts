import { Model } from "mongoose";
import { TDocumentType } from "../../interface/interface";

export interface IDummy {
  text: string;
}

export interface IDummyModel extends Model<IDummy> {
  createDummyMethod(text: IDummy): Promise<TDocumentType<IDummy>>;
}
