import { PrismaClient, Status, Question_List, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IQuestionListFilters = {
  searchTerm?: string;
};
// export const questionListSearchableFields = ["searchTerm"];

const getAllQuestionLists = async (
  filters: IQuestionListFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Question_List[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.Question_ListFindManyArgs = {
    where: {
      AND: [
        searchTerm
          ? {
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { number: { contains: searchTerm, mode: "insensitive" } },
                { company: { contains: searchTerm, mode: "insensitive" } },
                { client_id: { contains: searchTerm, mode: "insensitive" } },
                { email: { contains: searchTerm, mode: "insensitive" } },
              ],
            }
          : {},
        // Add other filter conditions from filtersData if needed
      ],
    },
    orderBy: { createdAt: "desc" }, // Default sorting by createdAt field
    skip: (page - 1) * limit,
    take: limit,
  };

  // Perform the actual querying based on conditions
  const questionLists = await prisma.question_List.findMany(query);

  // Count total records for pagination
  const total = await prisma.question_List.count({ where: query.where });

  return {
    data: questionLists,
    meta: {
      page,
      limit,
      total,
    },
  };
};

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
  getAllQuestionLists,
};
