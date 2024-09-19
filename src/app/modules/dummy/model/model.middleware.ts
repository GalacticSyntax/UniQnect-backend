import dummySchema from "./model.schema";
import { IDummy } from "../dummy.interface";

dummySchema.pre<IDummy>("save", async function (next) {
  /*
   *
   * your cods
   * some more codes
   * codes and codes
   *
   */
  next();
});
