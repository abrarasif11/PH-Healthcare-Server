import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.query);

    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    console.log(options);
    const result = await AdminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getIdByDb = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await AdminService.getIdByDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Fetched by Id",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Updated!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.deleteFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteFromDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  try {
    const result = await AdminService.softDeleteFromDb(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted!!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AdminController = {
  getAllFromDB,
  getIdByDb,
  updateIntoDB,
  deleteFromDb,
  softDeleteFromDb,
};
