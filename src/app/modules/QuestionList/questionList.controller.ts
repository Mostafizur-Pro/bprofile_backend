import { Request, Response } from "express";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { QuestionListService } from "./questionList.service";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

export const questionListFilterableFields = ["searchTerm", "title", "syncId"];

const getAllQuestionLists = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, questionListFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await QuestionListService.getAllQuestionLists(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getQuestionListById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await QuestionListService.getQuestionListById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question fetched successfully",
    data: result,
  });
});

const createQuestionList = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const question = await QuestionListService.createQuestionList(payload);
  if (!question) {
    throw new ApiError(httpStatus.BAD_REQUEST, "question not created");
  }
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question created successfully",
    data: question,
  });
});

const updateQuestionList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await QuestionListService.updateQuestionList(id, data);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question List Update Successfully",
    data: result,
  });
});

const deleteQuestionList = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await QuestionListService.deleteQuestionList(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question list not found",
    data: result,
  });
});

export const QuestionListController = {
  createQuestionList,
  getQuestionListById,
  deleteQuestionList,
  updateQuestionList,
  getAllQuestionLists,
};
