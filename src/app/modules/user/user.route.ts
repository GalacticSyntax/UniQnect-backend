import express from "express";
import { createUser, getAllUsers, getUsersByQuery, updateUser } from "./user.controller";

const router = express.Router();


router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.get("/users", getAllUsers);
router.get("/users/query", getUsersByQuery);

export const UserRoutes = router;
