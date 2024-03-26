import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body; // Destructure email and password directly
  const result = await authService.login({ email, password }); // Pass as an object
  res.cookie("refreshToken", result.refreshToken, result.cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Login Successfully",
    data: result,
  });
});
const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body; 
  
  const result = await authService.adminLogin({ email, password }); 
  res.cookie("refreshToken", result.refreshToken, result.cookieOptions);

  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin Login Successfully",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;

  await authService.changePassword(passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully !",
  });
});

export const authController = {
  login,
  adminLogin,
  changePassword,
};
