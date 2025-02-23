import express from "express";
import {
  createDepartment,
  departmentsVsStudents,
  departmentsVsTeachers,
  getAllDepartments,
  getDepartmentsByQuery,
  updateDepartment,
} from "./department.controller";

const router = express.Router();

router.post("/", createDepartment);
router.patch("/:id", updateDepartment);
router.get("/", getAllDepartments);
router.get("/query", getDepartmentsByQuery);
router.get("/departmentsVsStudents", departmentsVsStudents);
router.get("/departmentsVsTeachers", departmentsVsTeachers);

export const DepartmentRoutes = router;
