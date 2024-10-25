import { CloudinaryUtils } from "../../utils/cloudinary.utils";

const createOrUpdatePostImage = async (
  imagePath: string,
  cloudinaryMediaPath: string,
  isUpdating: boolean = false,
  previousImage?: string,
) => {
  if (isUpdating && previousImage)
    await CloudinaryUtils.deleteFile([previousImage]);

  return await CloudinaryUtils.uploadFile(
    imagePath,
    cloudinaryMediaPath,
    // {
    //   width: DummyConstant.DUMMY_IMAGE.WIDTH,
    //   height: DummyConstant.DUMMY_IMAGE.HEIGHT,
    // }
  );
};

export const DummyUtils = { createOrUpdatePostImage };
