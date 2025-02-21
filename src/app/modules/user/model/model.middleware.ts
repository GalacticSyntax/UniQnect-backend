import { IUser, TGenderType } from "../user.interface";
import userSchema from "./model.schema";
import { UserUtils } from "../user.utils";
import { UserModel } from "./model";

// this is for generating avatar if not given.
userSchema.pre<IUser>("save", async function (next) {
  if (!this?.image)
    this.image = UserUtils.generateAvatarURL({
      gender: this.gender as TGenderType,
      payload: this.fullName,
    });

  this.password = await UserModel.createHash({ str: this?.password });

  next();
});
