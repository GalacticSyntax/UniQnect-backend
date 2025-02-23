import express from "express";


import {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  getTeachersByQuery,
} from "./teacher.controller";

const router = express.Router();


// console.log("Hello");

router.get("/", getAllTeachers); 
router.get("/query", getTeachersByQuery); 
router.post("/create", createTeacher); 
router.put("/:id", updateTeacher); 

export const TeacherRoutes = router;
