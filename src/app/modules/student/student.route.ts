import express from "express";
import { getAllStudents } from "./student.controller";

const router = express.Router();

router.get("/", getAllStudents);

export const StudentRoutes = router;
