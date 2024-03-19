import { PrismaClient, Hall_Room_Post, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IHallRoomPostFilters = {
  searchTerm?: string;
};

const getAllHallRoomPost = async (
  filters: IHallRoomPostFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Hall_Room_Post[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.Hall_Room_PostFindManyArgs = {
    where: {
      AND: [
        searchTerm
          ? {
              OR: [
                { title: { contains: searchTerm, mode: "insensitive" } },
                { post: { contains: searchTerm, mode: "insensitive" } },
                { category: { contains: searchTerm, mode: "insensitive" } },
                { subcategory: { contains: searchTerm, mode: "insensitive" } },
                { division: { contains: searchTerm, mode: "insensitive" } },
                { district: { contains: searchTerm, mode: "insensitive" } },
                { thana: { contains: searchTerm, mode: "insensitive" } },
                { ward: { contains: searchTerm, mode: "insensitive" } },
                { area: { contains: searchTerm, mode: "insensitive" } },
                { road: { contains: searchTerm, mode: "insensitive" } },
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
  const messages = await prisma.hall_Room_Post.findMany(query);

  // Count total records for pagination
  const total = await prisma.hall_Room_Post.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getHallRoomPostById = async (
  id: string
): Promise<Hall_Room_Post | null> => {
  const result = await prisma.hall_Room_Post.findUnique({
    where: { id },
  });
  return result;
};

const createHallRoomPost = async (
  payload: Hall_Room_Post
): Promise<Hall_Room_Post> => {
  const hallRoomPost = await prisma.hall_Room_Post.create({
    data: payload,
  });
  return hallRoomPost; // Corrected variable name here
};

export const HallRoomPostService = {
  createHallRoomPost,
  getAllHallRoomPost,
  getHallRoomPostById,
};
