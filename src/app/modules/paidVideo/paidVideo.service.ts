import { PrismaClient, Paid_Video, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IPaidVideoFilters = {
  searchTerm?: string;
};

const getAllPaidVideo = async (
  filters: IPaidVideoFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Paid_Video[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.Paid_VideoFindManyArgs = {
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
  const messages = await prisma.paid_Video.findMany(query);

  // Count total records for pagination
  const total = await prisma.paid_Video.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getPaidVideoById = async (id: string): Promise<Paid_Video | null> => {
  const result = await prisma.paid_Video.findUnique({
    where: { id },
  });
  return result;
};

const createPaidVideo = async (payload: Paid_Video): Promise<Paid_Video> => {
  const hallRoomPost = await prisma.paid_Video.create({
    data: payload,
  });
  return hallRoomPost; // Corrected variable name here
};

const updatePaidVideo = async (
  id: string,
  data: Partial<Paid_Video>
): Promise<Paid_Video | null> => {
  const result = await prisma.paid_Video.update({
    where: { id },
    data,
  });
  return result;
};

const deletePaidVideo = async (id: string): Promise<Paid_Video | null> => {
  const result = await prisma.paid_Video.delete({ where: { id } });
  return result;
};

export const PaidVideoService = {
  createPaidVideo,
  getAllPaidVideo,
  getPaidVideoById,
  updatePaidVideo,
  deletePaidVideo,
};
