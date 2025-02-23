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

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/admission-officers", getAllAdmissionOfficers);
router.post("/", createUser);
router.patch("/:id", updateUser);
// router.get("/users", checkUserAuthStatus, verifyRole("student"), getAllUsers); /* Example of verifyRole middleware */
router.get("/query", getUsersByQuery);

export const UserRoutes = router;
