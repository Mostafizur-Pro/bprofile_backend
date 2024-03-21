import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import locations from "../../../assets/location4.json";
import { LocationsService } from "./location.service";

const getAllLocations = catchAsync(async (req: Request, res: Response) => {
  const result = await LocationsService.getAllLocations(locations);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Message fetched successfully",
    data: result.data,
  });
});

export const LocationController = {
  getAllLocations,
};
