import { IDummy } from "./dummy.interface";
import { DummyModel } from "./model/model";

const createDummy = async (payload: IDummy) => {
  return await DummyModel.createDummyMethod(payload);
};

export const DummyService = {
  createDummy,
};
