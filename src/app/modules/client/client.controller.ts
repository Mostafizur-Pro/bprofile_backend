import { Request, Response } from "express";
import { clientService } from "./client.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { paginationFields } from "../../../constants/pagination";
import pick from "../../../shared/pick";

export const clientFilterableFields = ["searchTerm", "title", "syncId"];

const getAllClients = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, clientFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await clientService.getAllClients(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getClientById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await clientService.getClientById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client fetched successfully",
    data: result,
  });
});

const createClient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await clientService.createClient(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client created successfully",
    data: result,
  });
});

const updateClient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await clientService.updateClient(id, data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client List Update Successfully",
    data: result,
  });
});

const deleteClient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await clientService.deleteClient(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Client list not found",
    data: result,
  });
});

export const clientController = {
  createClient,
  getClientById,
  deleteClient,
  updateClient,
  getAllClients,
};
