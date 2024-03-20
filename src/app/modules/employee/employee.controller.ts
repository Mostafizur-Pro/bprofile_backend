import { Request, Response } from "express";
import { employeeService } from "./employee.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";

export const employeeFilterableFields = ["searchTerm", "title", "syncId"];

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await employeeService.getAllEmployees(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getEmployeeById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await employeeService.getEmployeeById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee fetched successfully",
    data: result,
  });
});

const createEmployee = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await employeeService.createEmployee(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee created successfully",
    data: result,
  });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await employeeService.updateEmployee(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee List Update Successfully",
    data: result,
  });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await employeeService.deleteEmployee(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Employee list not found",
    data: result,
  });
});

export const employeeController = {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  getAllEmployees,
};
