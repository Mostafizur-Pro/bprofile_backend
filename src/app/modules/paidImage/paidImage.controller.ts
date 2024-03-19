import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaidImageService } from "./paidImage.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

export const paidImageFilterableFields = ["searchTerm", "title", "syncId"];

const getAllPaidImage = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paidImageFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PaidImageService.getAllPaidImage(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Paid Image fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getPaidImageById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaidImageService.getPaidImageById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const createPaidImage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log("hall", payload);
  const hallRoom = await PaidImageService.createPaidImage(payload);
  if (!hallRoom) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Message not created");
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Hall Room Post created successfully",
    data: hallRoom,
  });
});

const updatePaidImage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await PaidImageService.updatePaidImage(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const deletePaidImage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaidImageService.deletePaidImage(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message list not found",
    data: result,
  });
});

export const PaidImageController = {
  createPaidImage,
  getAllPaidImage,
  getPaidImageById,
  updatePaidImage,
  deletePaidImage,
};
