import { Router } from "express";
import { CourseRegisteredController } from "./course.registered.controller";

const router = Router();

router.post( "/", CourseRegisteredController.registerCourseController);
router.get("/", CourseRegisteredController.getCourseRegistrationsController);
router.get("/myRegisteredCourses/:userId", CourseRegisteredController.myRegisteredCourses);

export const CourseRegisteredRoutes = router;
