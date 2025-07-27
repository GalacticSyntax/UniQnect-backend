import express from "express";
const router = express.Router();

import { CourseController } from "./course.controller";



router.post("/course", CourseController.createCourse);
router.post("/courses", CourseController.createManyCourses);

export const CourseRoutes = router;
