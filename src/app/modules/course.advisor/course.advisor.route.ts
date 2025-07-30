import express from "express";
import { CourseAdvisorController } from "./course.advisor.controller";

const router = express.Router();

router.get("/advisor/:id", CourseAdvisorController.getAdvisorById);

router.get("/advisors", CourseAdvisorController.getAdvisors);
router.post("/advisor", CourseAdvisorController.createAdvisor);
router.patch("/advisor/:id", CourseAdvisorController.updateAdvisor);
router.delete("/advisor/:id", CourseAdvisorController.deleteAdvisor);

router.get("/advisor/check/:userId", CourseAdvisorController.checkIfUserIsAdvisorController);

export const CourseAdvisorRoutes = router;
