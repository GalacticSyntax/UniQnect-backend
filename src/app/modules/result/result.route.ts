import express from "express";

const router = express.Router();

import { ResultController } from "./result.controller";

router.post("/", ResultController.createResult);
router.get("/", ResultController.getResult);

export const ResultRoutes = router;
