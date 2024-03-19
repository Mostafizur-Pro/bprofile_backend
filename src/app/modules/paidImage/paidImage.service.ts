import { PrismaClient, Paid_Image, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IPaidImageFilters = {
  searchTerm?: string;
};

const getAllPaidImage = async (
  filters: IPaidImageFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Paid_Image[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.Paid_ImageFindManyArgs = {
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
  const messages = await prisma.paid_Image.findMany(query);

  // Count total records for pagination
  const total = await prisma.paid_Image.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getPaidImageById = async (id: string): Promise<Paid_Image | null> => {
  const result = await prisma.paid_Image.findUnique({
    where: { id },
  });
  return result;
};

const createPaidImage = async (payload: Paid_Image): Promise<Paid_Image> => {
  const hallRoomPost = await prisma.paid_Image.create({
    data: payload,
  });
  return hallRoomPost; // Corrected variable name here
};

const updatePaidImage = async (
  id: string,
  data: Partial<Paid_Image>
): Promise<Paid_Image | null> => {
  const result = await prisma.paid_Image.update({
    where: { id },
    data,
  });
  return result;
};

const deletePaidImage = async (id: string): Promise<Paid_Image | null> => {
  const result = await prisma.paid_Image.delete({ where: { id } });
  return result;
};

export const PaidImageService = {
  createPaidImage,
  getAllPaidImage,
  getPaidImageById,
  updatePaidImage,
  deletePaidImage,
};
