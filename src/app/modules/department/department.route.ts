import express from "express";
import {
  createDepartment,
  departmentsVsStudents,
  departmentsVsTeachers,
  getAllDepartments,
  getDepartmentsByCode,
  getDepartmentsByQuery,
  updateDepartment,
} from "./department.controller";

const router = express.Router();

router.post("/", createDepartment);
router.patch("/:code", updateDepartment);
router.get("/", getAllDepartments);
router.get("/departmentsVsStudents", departmentsVsStudents);
router.get("/departmentsVsTeachers", departmentsVsTeachers);
router.get("/:code", getDepartmentsByCode);
router.get("/query", getDepartmentsByQuery);

export const DepartmentRoutes = router;
