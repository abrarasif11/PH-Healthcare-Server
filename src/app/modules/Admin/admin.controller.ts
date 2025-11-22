import { Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    // console.log(req.query);

    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    console.log(options);
    const result = await AdminService.getAllFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin Data Fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something Went Wrong",
      error: err,
    });
  }
};

const getIdByDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getIdByDb(id);
    res.status(200).json({
      success: true,
      message: "Admin Data Fetched by Id",
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

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Admin Data Updated!!",
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

const deleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.deleteFromDb(id);
    res.status(200).json({
      success: true,
      message: "Admin Data Deleted!!",
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

const softDeleteFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.softDeleteFromDb(id);
    res.status(200).json({
      success: true,
      message: "Admin Data Deleted!!",
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
  getIdByDb,
  updateIntoDB,
  deleteFromDb,
  softDeleteFromDb,
};
