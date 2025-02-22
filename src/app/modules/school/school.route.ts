import express from "express";
import {
  createSchool,
  getAllSchools,
  getSchoolsByQuery,
  updateSchool,
} from "./school.controller";

const router = express.Router();

router.post("/", createSchool);
router.patch("/:id", updateSchool);
router.get("/", getAllSchools);
router.get("/query", getSchoolsByQuery);

export const SchoolRoutes = router;
