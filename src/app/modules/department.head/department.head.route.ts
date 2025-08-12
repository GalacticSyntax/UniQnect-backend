import { Router } from "express";
import { DepartmentHeadController } from "./department.head.controller";

const router = Router();

router.get("/is-department-head", DepartmentHeadController.isDepartmentHead);
router.get("/department-head", DepartmentHeadController.getDepartmentHeads);
router.post("/department-head", DepartmentHeadController.createDepartmentHead);
router.patch("/department-head/:id", DepartmentHeadController.updateDepartmentHead);

export const DepartmentHeadRoutes = router;
