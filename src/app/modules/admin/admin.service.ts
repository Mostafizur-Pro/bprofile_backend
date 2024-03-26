import { Prisma, PrismaClient, Admin } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { generateNextAdminProfileId } from "../../../utils/generateStudentId";

const prisma = new PrismaClient();

export type IAdminFilters = {
  searchTerm?: string;
};

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Admin[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.AdminFindManyArgs = {
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
  const messages = await prisma.admin.findMany(query);

  // Count total records for pagination
  const total = await prisma.admin.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getAdminById = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

const createAdmin = async (data: Admin): Promise<Admin | any> => {
  const hashedPassword: string = await bcrypt.hash(data.password, 6);
  const profileId = await generateNextAdminProfileId();
  const adminData: Admin = {
    name: data.name,
    profile_id: profileId,
    number: data.number,
    image:
      "https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png",
    role: data.role,
    email: data.email,
    password: hashedPassword,
    status: "ACTIVE",
  };
  // console.log("reg", AdminData);

  const result = await prisma.$transaction(async (transactionAdmin) => {
    return transactionAdmin.admin.create({
      data: adminData,
    });
  });
  return data;
};

const updateAdmin = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin | null> => {
  const result = await prisma.admin.update({
    where: { id },
    data,
  });
  return result;
};

const deleteAdmin = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.delete({ where: { id } });
  return result;
};

export const adminService = {
  createAdmin,
  getAdminById,
  deleteAdmin,
  updateAdmin,
  getAllAdmins,
};
