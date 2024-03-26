import { Request, Response } from "express";
import { adminService } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";

export const adminFilterableFields = ["searchTerm", "title", "syncId"];

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await adminService.getAllAdmins(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.getAdminById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  
  const result = await adminService.createAdmin(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await adminService.updateAdmin(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin List Update Successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin list not found",
    data: result,
  });
});

export const adminController = {
  createAdmin,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  getAllAdmins,
};
