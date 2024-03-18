import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { HallRoomPostService } from "./hallRoom.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import ApiError from "../../../errors/ApiError";

const createHallRoomPost = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  console.log("hall", payload);
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

export const HallRoomPostController = {
  createHallRoomPost,
};
