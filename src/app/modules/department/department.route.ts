import express from "express";
import {
  createDepartment,
  departmentsVsStudents,
  getAllDepartments,
  getDepartmentsByQuery,
  updateDepartment,
} from "./department.controller";

const router = express.Router();

router.post("/", createDepartment);
router.patch("/:id", updateDepartment);
router.get("/", getAllDepartments);
router.get("/query", getDepartmentsByQuery);
router.get("/departmentVsStudents", departmentsVsStudents);

export const DepartmentRoutes = router;
