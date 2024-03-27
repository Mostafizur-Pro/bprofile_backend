import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { HallRoomPostService } from "./hallRoom.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

export const hallRoomPostFilterableFields = ["searchTerm", "title", "syncId"];

const getAllHallRoomPost = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, hallRoomPostFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await HallRoomPostService.getAllHallRoomPost(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getHallRoomPostById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HallRoomPostService.getHallRoomPostById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const createHallRoomPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log('hall', payload)
  const hallRoom = await HallRoomPostService.createHallRoomPost(payload);
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

const updateHallRoomPost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await HallRoomPostService.updateHallRoomPost(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const deleteHallRoomPost = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await HallRoomPostService.deleteHallRoomPost(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message list not found",
    data: result,
  });
});


export const HallRoomPostController = {
  createHallRoomPost,
  getAllHallRoomPost,
  getHallRoomPostById,
  updateHallRoomPost,
  deleteHallRoomPost,
};
