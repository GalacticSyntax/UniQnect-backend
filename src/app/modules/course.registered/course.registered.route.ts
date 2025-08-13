import { Router } from "express";
import { CourseRegisteredController } from "./course.registered.controller";

const router = Router();

router.post("/", CourseRegisteredController.registerCourseController);
router.get("/", CourseRegisteredController.getCourseRegistrationsController);
router.get(
  "/myRegisteredCourses/:userId",
  CourseRegisteredController.myRegisteredCourses,
);

router.post(
  "/registered-students",
  CourseRegisteredController.regesteredStudent,
);

export const CourseRegisteredRoutes = router;
