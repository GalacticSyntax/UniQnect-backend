import express from "express";
import { DepartmentHeadController } from "./department.head.controller";

const router = express.Router();

router.get("/advisor/:id", DepartmentHeadController.getAdvisorById);

router.get("/advisors", DepartmentHeadController.getAdvisors);
router.post("/advisor", DepartmentHeadController.createAdvisor);
router.patch("/advisor/:id", DepartmentHeadController.updateAdvisor);
router.delete("/advisor/:id", DepartmentHeadController.deleteAdvisor);

router.get("/advisor/check/:userId", DepartmentHeadController.checkIfUserIsAdvisorController);

export const DepartmentHeadRoutes = router;
