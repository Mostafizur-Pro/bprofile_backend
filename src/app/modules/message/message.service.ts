import { PrismaClient, Message_List, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IMessageFilters = {
  searchTerm?: string;
};

const getAllMessages = async (
  filters: IMessageFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Message_List[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.Message_ListFindManyArgs = {
    where: {
      AND: [
        searchTerm
          ? {
              OR: [
                { subject: { contains: searchTerm, mode: "insensitive" } },
                { message: { contains: searchTerm, mode: "insensitive" } },
                { message_show: { contains: searchTerm, mode: "insensitive" } },
                {
                  message_show_id: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
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
  const messages = await prisma.message_List.findMany(query);

  // Count total records for pagination
  const total = await prisma.message_List.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getMessageById = async (id: string): Promise<Message_List | null> => {
  const result = await prisma.message_List.findUnique({
    where: { id },
  });
  return result;
};

const createMessage = async (payload: Message_List): Promise<Message_List> => {
  const message = await prisma.message_List.create({
    data: payload,
  });
  return message;
};

const updateMessage = async (
  id: string,
  data: Partial<Message_List>
): Promise<Message_List | null> => {
  const result = await prisma.message_List.update({
    where: { id },
    data,
  });
  return result;
};

const deleteMessage = async (id: string): Promise<Message_List | null> => {
  const result = await prisma.message_List.delete({ where: { id } });
  return result;
};

export const MessageService = {
  createMessage,
  getMessageById,
  deleteMessage,
  updateMessage,
  getAllMessages,
};
