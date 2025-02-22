import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentsByQuery,
  updateDepartment,
} from "./department.controller";

const router = express.Router();

router.post("/", createDepartment);
router.patch("/:id", updateDepartment);
router.get("/", getAllDepartments);
router.get("/query", getDepartmentsByQuery);

export const DepartmentRoutes = router;
