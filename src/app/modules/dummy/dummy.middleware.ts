import { imageUpload } from "../../utils/multer.image.upload";

const createOrUpdatePostImages = imageUpload.fields([
  {
    name: "images",
  },
]);

export const DummyMiddleware = {
  createOrUpdatePostImages,
};
