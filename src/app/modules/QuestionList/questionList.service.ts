import { PrismaClient, Status, Question_List } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import ApiError from "../../../errors/ApiError";
import { Request, Response } from "express";
import { QuestionListController } from "./questionList.controller";

const prisma = new PrismaClient();

// class QuestionListService {
//   async getAllQuestionLists(page: number, limit: number, searchQuery?: string): Promise<Question_List[]> {
//     const skip = (page - 1) * limit;
//     if (searchQuery) {
//       return prisma.question_List.findMany({
//         where: {
//           OR: [
//             { name: { contains: searchQuery } },
//             { company: { contains: searchQuery } },
//             { message: { contains: searchQuery } },
//             { client_id: { contains: searchQuery } },
//             { email: { contains: searchQuery } },
//           ],
//         },
//         skip,
//         take: limit,
//       });
//     } else {
//       return prisma.question_List.findMany({
//         skip,
//         take: limit,
//       });
//     }
//   }

//   async getQuestionListById(id: string): Promise<Question_List | null> {
//     return prisma.question_List.findUnique({
//       where: { id },
//     });
//   }

//   async createQuestionList(data: Question_List): Promise<Question_List> {
//     return prisma.question_List.create({ data });
//   }

//   async updateQuestionList(id: string, data: Question_List): Promise<Question_List | null> {
//     return prisma.question_List.update({
//       where: { id },
//       data,
//     });
//   }

//   async deleteQuestionList(id: string): Promise<Question_List | null> {
//     return prisma.question_List.delete({
//       where: { id },
//     });
//   }
// }

// export default QuestionListService;

const getQuestionListById = async (
  id: string
): Promise<Question_List | null> => {
  const result = await prisma.question_List.findUnique({
    where: { id },
  });
  return result;
};

const createQuestionList = async (
  payload: Question_List
): Promise<Question_List> => {
  const question = await prisma.question_List.create({
    data: payload,
  });
  return question;
};

const updateQuestionList = async (
  id: string,
  data: Partial<Question_List>
): Promise<Question_List | null> => {
  const result = await prisma.question_List.update({
    where: { id },
    data,
  });
  return result;
};

const deleteQuestionList = async (
  id: string
): Promise<Question_List | null> => {
  const result = await prisma.question_List.delete({ where: { id } });
  return result;
};

export const QuestionListService = {
  createQuestionList,
  getQuestionListById,
  deleteQuestionList,
  updateQuestionList,
};
