import { imageUpload } from "../../utils/multer.image.upload";

const createOrUpdateUserAvatar = imageUpload.fields([
  {
    name: "image",
    maxCount: 1,
  },
]);

export const UserMiddleware = { createOrUpdateUserAvatar };
