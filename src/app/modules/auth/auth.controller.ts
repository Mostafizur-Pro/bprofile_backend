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

export const authController = {
  login,
};
