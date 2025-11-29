import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import { DoctorService } from "./Doctor.service.js";
import httpStatus from "http-status";
import { Request, Response } from "express";

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

export const DoctorController = {
  updateIntoDB,
};
