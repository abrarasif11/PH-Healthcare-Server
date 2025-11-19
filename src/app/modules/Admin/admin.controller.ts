import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";

const getAllFromDB = async (req: Request, res: Response) => {
  // console.log(req.query);
  const result = await AdminService.getAllFromDB(req.query);

  res.status(200).json({
    success: true,
    message: "Admin Data Fetched",
    data: result,
  });
};

export const AdminController = {
  getAllFromDB,
};
