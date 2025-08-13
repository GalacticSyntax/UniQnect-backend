import { Router } from "express";
import {AttendanceController} from "./attendance.controller";

const router = Router();

router.patch("/attendance",AttendanceController.createAttendance);
router.get("/attendance", AttendanceController.getAttendance);
router.patch("/attendance/:id", AttendanceController.updateAttendanceDate);

router.get("/attendanceBydate", AttendanceController.getAttendanceByDate);

export const AttendanceRoutes = router;
