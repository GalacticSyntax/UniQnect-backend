import express from "express";
import {
  createUser,
  getAllAdmissionOfficers,
  getAllUsers,
  getUsersByQuery,
  updateUser,
  getUserById,
} from "./user.controller";
import verifyRole from "../../middlewares/verify.role";
import checkUserAuthStatus from "../../middlewares/check.user.auth.status";
import { imageUpload } from "../../utils/multer.image.upload";
import { uploadFile } from "../../middlewares/multer.middleware";
import { UserMiddleware } from "./user.middleware";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/admission-officers", getAllAdmissionOfficers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/:id", UserMiddleware.createOrUpdateUserAvatar, updateUser);
// router.get("/users", checkUserAuthStatus, verifyRole("student"), getAllUsers); /* Example of verifyRole middleware */
router.get("/query", getUsersByQuery);

export const UserRoutes = router;
