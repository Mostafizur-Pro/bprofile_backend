import { Request, Response } from "express";

import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import httpStatus from "http-status";
import { Question_List } from "@prisma/client";
import catchAsync from "../../../shared/catchAsync";
import { QuestionListService } from "./questionList.service";
import sendResponse from "../../../shared/sendResponse";

// class QuestionListController {
//   async getAllQuestionLists(req: Request, res: Response) {
//     const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
//     const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;
//     const searchQuery = req.query.search ? req.query.search.toString() : undefined;

//     try {
//       const questionLists = await questionListService.getAllQuestionLists(page, limit, searchQuery);
//       res.json(questionLists);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async getQuestionListById(req: Request, res: Response) {
//     const { id } = req.params;
//     try {
//       const questionList = await questionListService.getQuestionListById(id);
//       if (!questionList) {
//         return res.status(404).json({ error: 'Question list not found' });
//       }
//       res.json(questionList);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async createQuestionList(req: Request, res: Response) {
//     const data = req.body;
//     try {
//       const newQuestionList = await questionListService.createQuestionList(data);
//       res.status(201).json(newQuestionList);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async updateQuestionList(req: Request, res: Response) {
//     const { id } = req.params;
//     const data = req.body;
//     try {
//       const updatedQuestionList = await questionListService.updateQuestionList(id, data);
//       if (!updatedQuestionList) {
//         return res.status(404).json({ error: 'Question list not found' });
//       }
//       res.json(updatedQuestionList);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

//   async deleteQuestionList(req: Request, res: Response) {
//     const { id } = req.params;
//     try {
//       const deletedQuestionList = await questionListService.deleteQuestionList(id);
//       if (!deletedQuestionList) {
//         return res.status(404).json({ error: 'Question list not found' });
//       }
//       res.json(deletedQuestionList);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }
// }

// export default QuestionListController;

// const createQuestionList = async (
//   payload: Question_List
// ): Promise<Question_List> => {
//   const question = await prisma.question_List.create({
//     payload,
//   });
//   return question;
// };

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
};
