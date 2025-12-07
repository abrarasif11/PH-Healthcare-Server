import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { IAuthUser } from "../../interfaces/common.js";
import { PrescriptionService } from "./Prescription.service.js";
import pick from "../../../shared/pick.js";

const insertIntoDB = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.insertIntoDB(
      user as IAuthUser,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription created successfully",
      data: result,
    });
  }
);

const patientPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await PrescriptionService.patientPrescription(
      user as IAuthUser,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const PrescriptionController = {
  insertIntoDB,
  patientPrescription,
  getAllFromDB,
};
