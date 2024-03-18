import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { MessageService } from "./message.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

import fs from "fs";
import path from "path";

export const messageFilterableFields = ["searchTerm", "title", "syncId"];

const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, messageFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await MessageService.getAllMessages(
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

const getMessageById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await MessageService.getMessageById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result,
  });
});

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  // Image Save
  // if (req.file) {
  //   const imageFileName = req.file.filename;
  //   const publicImagePath = `/uploads/${imageFileName}`; // Path where the image will be saved in the public folder

  //   // Move the uploaded image to the public folder
  //   const imagePath = path.join(__dirname, "../public/uploads", imageFileName);
  //   fs.renameSync(req.file.path, imagePath);

  //   // Add the public image path to the payload
  //   payload.image = publicImagePath;
  // }

  const message = await MessageService.createMessage(payload);
  // console.log("m", message);
  if (!message) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Message not created");
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message created successfully",
    data: message,
  });
});

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await MessageService.updateMessage(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message List Update Successfully",
    data: result,
  });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await MessageService.deleteMessage(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message list not found",
    data: result,
  });
});

export const MessageController = {
  createMessage,
  getMessageById,
  deleteMessage,
  updateMessage,
  getAllMessages,
};
