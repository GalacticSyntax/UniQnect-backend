import express from "express";
import { CourseOfferedController } from "./course.offered.controller";

const router = express.Router();

router.get("/offered/:id", CourseOfferedController.getCourseOfferedById);
router.get("/offereds", CourseOfferedController.getCourseOffereds);
router.post("/offered", CourseOfferedController.createCourseOffered);
router.patch("/offered/:id", CourseOfferedController.updateCourseOffered);
router.delete("/offered/:id", CourseOfferedController.deleteCourseOffered);

router.get("/advisor/offered-courses/:userId", CourseOfferedController.getOfferedCoursesByAdvisorUserId);
router.get("/teacher/my-courses/:userId", CourseOfferedController.myCoursesAsTeacher);

export const CourseOfferedRoutes = router;