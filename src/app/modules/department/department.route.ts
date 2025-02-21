import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentsByQuery,
  updateDepartment,
} from "./department.controller";

const router = express.Router();

router.post("/departments", createDepartment);
router.put("/departments/:id", updateDepartment);
router.get("/departments", getAllDepartments);
router.get("/departments/query", getDepartmentsByQuery);

export const DepartmentRoutes = router;
