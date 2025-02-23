import express from "express";
import {
  createSchool,
  getAllSchools,
  getSchoolsByQuery,
  updateSchool,
  getSchoolBySchooldId,
} from "./school.controller";

const router = express.Router();

router.post("/", createSchool);
router.get("/:schoolId", getSchoolBySchooldId);
router.patch("/:schoolId", updateSchool);
router.get("/", getAllSchools);
router.get("/query", getSchoolsByQuery);

export const SchoolRoutes = router;
