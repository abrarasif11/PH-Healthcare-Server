import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import pick from "../../../pick.js";
import { adminFilterableFields } from "./admin.constant.js";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    // console.log(req.query);

    const filters = pick(req.query, adminFilterableFields);
    const result = await AdminService.getAllFromDB(filters);
    res.status(200).json({
      success: true,
      message: "Admin Data Fetched",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something Went Wrong",
      error: err,
    });
  }
};

export const AdminController = {
  getAllFromDB,
};
