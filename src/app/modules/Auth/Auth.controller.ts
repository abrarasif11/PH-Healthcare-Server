import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync.js";
import sendResponse from "../../../shared/sendResponse.js";
import httpStatus from "http-status";
import { AuthServices } from "./Auth.service.js";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successful",
    data: {
      accessToken: result.accessToken,
      needPassChange: result.needPassChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successful",
    data: result,
    // data: {
    //   accessToken: result.accessToken,
    //   needPassChange: result.needPassChange,
    // },
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthServices.changePassword(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login Successful",
    data: result,
    // data: {
    //   accessToken: result.accessToken,
    //   needPassChange: result.needPassChange,
    // },
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
