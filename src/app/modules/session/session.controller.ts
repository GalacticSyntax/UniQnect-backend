
// session.controller.ts
import { Request, Response } from "express";
import { sessionModel } from "./model/model"; 

// POST - Create or update session
const createOrUpdateSession = async (req: Request, res: Response) => {
  try {
    const { running } = req.body;

    if (!running) {
      return res.status(400).json({ message: "Running session is required" });
    }

    // Find the existing session
    const existingSession = await sessionModel.findOne();

    let previous: string | undefined = undefined;

    // If there was an old running session, store it as previous
    if (existingSession && existingSession.running) {
      previous = existingSession.running;
    }

    // Update or insert new session
    const session = await sessionModel.findOneAndUpdate(
      {},
      { running, previous },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

// GET - Fetch session
const getSession = async (req: Request, res: Response) => {
  try {
    const session = await sessionModel.findOne();
    if (!session) {
      return res.status(404).json({ message: "No session found" });
    }
    res.status(200).json({ success: true, data: session });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};



export const sessionController = {
  createOrUpdateSession,
  getSession,
};
