import { Router } from "express";
import { CourseRegisteredController } from "./course.registered.controller";

const router = Router();

router.post( "/", CourseRegisteredController.registerCourseController);
router.get("/", CourseRegisteredController.getCourseRegistrationsController);


export const CourseRegisteredRoutes = router;
