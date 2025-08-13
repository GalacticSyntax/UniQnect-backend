import express from "express";
// session.routes.ts

import { sessionController } from "./session.controller";

const router = express.Router();


router.get("/", sessionController.getSession);
router.post("/", sessionController.createOrUpdateSession);

export default router;


export const SessionRoutes = router;
