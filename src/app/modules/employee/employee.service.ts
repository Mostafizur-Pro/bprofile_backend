import { Prisma, PrismaClient, Employee } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IEmployeeFilters = {
  searchTerm?: string;
};

const getAllEmployees = async (
  filters: IEmployeeFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Employee[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.EmployeeFindManyArgs = {
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
  const messages = await prisma.employee.findMany(query);

  // Count total records for pagination
  const total = await prisma.employee.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const result = await prisma.employee.findUnique({
    where: { id },
  });
  return result;
};

const createEmployee = async (data: Employee): Promise<Employee | any> => {
  const hashedPassword: string = await bcrypt.hash(data.password, 6);
  const employeeData = {
    name: data.name,
    profile_id: data.profile_id,
    birthday: data.birthday,
    gender: data.gender,
    number: data.number,
    image: data.image,
    division: data.division,
    district: data.district,
    role: data.role,
    thana: data.thana,
    password: hashedPassword,
    status: data.status,
  };

  const result = await prisma.$transaction(async (transactionEmployee) => {
    return transactionEmployee.employee.create({
      data: employeeData,
    });
  });
  return data;
};

const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<Employee | null> => {
  const result = await prisma.employee.update({
    where: { id },
    data,
  });
  return result;
};

const deleteEmployee = async (id: string): Promise<Employee | null> => {
  const result = await prisma.employee.delete({ where: { id } });
  return result;
};

export const employeeService = {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  getAllEmployees,
};
