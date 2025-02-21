import { Request, Response } from "express";
import { UserModel } from "./model/model";
import { v4 as uuid } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const password = uuid();
  try {
    const user = (
      await UserModel.create({
        role: "student",
        ...req.body,
        password,
      })
    ).toObject();

    res.status(201).json({ success: true, data: { ...user, password } });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({
      success: false,
      message: errMessage,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ success: false, message: errMessage });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json({ success: true, data: users });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
};

export const getUsersByQuery = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const users = await UserModel.find(query);
    res.json({ success: true, data: users });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ success: false, message: errMessage });
  }
};

// export const UserController = {};
