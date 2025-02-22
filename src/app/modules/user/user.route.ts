import express from "express";
import {
  createUser,
  getAllUsers,
  getUsersByQuery,
  updateUser,
} from "./user.controller";
import verifyRole from "../../middlewares/verify.role";
import checkUserAuthStatus from "../../middlewares/check.user.auth.status";

const router = express.Router();

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getAllUsers);
// router.get("/users", checkUserAuthStatus, verifyRole("student"), getAllUsers); /* Example of verifyRole middleware */
router.get("/query", getUsersByQuery);

export const UserRoutes = router;
