import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { SpecialtiesService } from "./Specialties.service.js";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties Created Successfully",
    data: result,
  });
});

export const SpecialtiesController = {
  insertIntoDB,
};
