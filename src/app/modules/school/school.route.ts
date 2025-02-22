import express from "express";
import {
  createSchool,
  getAllSchools,
  getSchoolsByQuery,
  updateSchool,
} from "./school.controller";

const router = express.Router();

router.post("/create", createSchool);
router.put("/schools/:id", updateSchool);
router.get("/schools", getAllSchools);
router.get("/schools/query", getSchoolsByQuery);

export const SchoolRoutes = router;
