import { Request, Response } from "express";
import { userService } from "./user.service.js";

const createAdmin = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await userService.createAdmin(req.body);
    res.status(200).json({
      success: true,
      message: "Admin Created Successfully",
      data: result,
    });
    console.log(res.status);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something Went Wrong",
      error: err,
    });
  }
};
export const userController = {
  createAdmin,
};
