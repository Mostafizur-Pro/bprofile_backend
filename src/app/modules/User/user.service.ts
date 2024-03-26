import { Prisma, PrismaClient, User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { generateNextUserProfileId } from "../../../utils/generateStudentId";

const prisma = new PrismaClient();

export type IUserFilters = {
  searchTerm?: string;
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.UserFindManyArgs = {
    where: {
      AND: [
        searchTerm
          ? {
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { number: { contains: searchTerm, mode: "insensitive" } },
                { email: { contains: searchTerm, mode: "insensitive" } },
                {
                  profile_id: {
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
  const messages = await prisma.user.findMany(query);

  // Count total records for pagination
  const total = await prisma.user.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getUserById = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

const createUser = async (data: User): Promise<User | any> => {
  console.log("user", data);
  const hashedPassword: string = await bcrypt.hash(data.password, 6);

  const profileId = await generateNextUserProfileId();

  const userData = {
    name: data.name,
    profile_id: profileId,
    number: data.number,
    image:
      "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png",
    email: data.email,
    password: hashedPassword,
    status: "ACTIVE",
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    return transactionClient.user.create({
      data: userData,
    });
  });
  return data;
};

const updateUser = async (
  id: string,
  data: Partial<User>
): Promise<User | null> => {
  const result = await prisma.user.update({
    where: { id },
    data,
  });
  return result;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.delete({ where: { id } });
  return result;
};

export const userService = {
  createUser,
  getUserById,
  deleteUser,
  updateUser,
  getAllUsers,
};
