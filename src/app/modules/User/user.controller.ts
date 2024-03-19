import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";

export const userFilterableFields = ["searchTerm", "title", "syncId"];

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await userService.getAllUsers(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.getUserById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await userService.updateUser(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User List Update Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await userService.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User list not found",
    data: result,
  });
});

export const userController = {
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
};
