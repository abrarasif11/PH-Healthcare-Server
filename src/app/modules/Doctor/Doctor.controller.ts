import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { DoctorService } from "./Doctor.service.js";
import httpStatus from "http-status";
import { Request, RequestHandler, Response } from "express";
import { doctorFilterableFields } from "./Doctor.constant.js";
import pick from "../../../shared/pick.js";

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await DoctorService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval successfully",
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.query);

    const filters = pick(req.query, doctorFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log(options);
    console.log(options);
    const result = await DoctorService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Data Fetched",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getIdByDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await DoctorService.getIdByDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Fetched by Id",
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  console.log("data", req.body);
  const result = await DoctorService.deleteFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor Data Deleted!!",
    data: result,
  });
});

export const DoctorController = {
  updateIntoDB,
  getAllFromDB,
  getIdByDb,
  deleteFromDb,
};
