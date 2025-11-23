import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminService } from "./admin.service.js";
import pick from "../../../shared/pick.js";
import { adminFilterableFields } from "./admin.constant.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

const getIdByDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.getIdByDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched by Id",
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);

  const result = await AdminService.updateIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Updated!!",
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  const result = await AdminService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted!!",
    data: result,
  });
});

const softDeleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  const result = await AdminService.softDeleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted!!",
    data: result,
  });
});

export const AdminController = {
  getAllFromDB,
  getIdByDb,
  updateIntoDB,
  deleteFromDb,
  softDeleteFromDb,
};
