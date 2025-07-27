import express from "express";
const router = express.Router();

import { createCourse } from "./course.controller";



router.post("/course", createCourse);


export const CourseRoutes = router;
