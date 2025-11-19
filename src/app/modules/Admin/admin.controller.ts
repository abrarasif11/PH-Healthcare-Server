import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await AdminService.getAllFromDB();
  res.status(200).json({
    success: true,
    message: "Admin Data Fetched",
    data: result,
  });
};

export const AdminController = {
  getAllFromDB,
};
