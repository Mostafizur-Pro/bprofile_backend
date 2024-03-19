import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaidVideoService } from "./paidVideo.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

export const paidVideoFilterableFields = ["searchTerm", "title", "syncId"];

const getAllPaidVideo = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, paidVideoFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PaidVideoService.getAllPaidVideo(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Paid Video fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getPaidVideoById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaidVideoService.getPaidVideoById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const createPaidVideo = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log("hall", payload);
  const hallRoom = await PaidVideoService.createPaidVideo(payload);
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

const updatePaidVideo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await PaidVideoService.updatePaidVideo(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const deletePaidVideo = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PaidVideoService.deletePaidVideo(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message list not found",
    data: result,
  });
});

export const PaidVideoController = {
  createPaidVideo,
  getAllPaidVideo,
  getPaidVideoById,
  updatePaidVideo,
  deletePaidVideo,
};
