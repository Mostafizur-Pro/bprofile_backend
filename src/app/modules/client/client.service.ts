import { Prisma, PrismaClient, Client } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const prisma = new PrismaClient();

export type IClientFilters = {
  searchTerm?: string;
};

const getAllClients = async (
  filters: IClientFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Client[]>> => {
  const { searchTerm } = filters;

  const { page, limit } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Construct Prisma query
  const query: Prisma.ClientFindManyArgs = {
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
  const messages = await prisma.client.findMany(query);

  // Count total records for pagination
  const total = await prisma.client.count({ where: query.where });

  return {
    data: messages,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getClientById = async (id: string): Promise<Client | null> => {

  const result = await prisma.client.findFirst({
    where: {
      OR: [
        { id: id },
        { profile_id: id },
        { email: id },
        { number: id },
        { password: id },
      ],
    },
  });
  console.log("id", id, result);
  return result;
};

const createClient = async (data: Client): Promise<Client | any> => {
  const hashedPassword: string = await bcrypt.hash(data.password, 6);
  const clientData = {
    name: data.name,
    organization_name: data.organization_name,
    profile_id: data.profile_id,
    birthday: data.birthday,
    gender: data.gender,
    number: data.number,
    image: data.image,
    category: data.category,
    subcategory: data.subcategory,
    division: data.division,
    district: data.district,
    thana: data.thana,
    email: data.email,
    password: hashedPassword,
    status: data.status,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    return transactionClient.client.create({
      data: clientData,
    });
  });
  return data;
};

const updateClient = async (
  id: string,
  data: Partial<Client>
): Promise<Client | null> => {
  const result = await prisma.client.update({
    where: { id },
    data,
  });
  return result;
};

const deleteClient = async (id: string): Promise<Client | null> => {
  const result = await prisma.client.delete({ where: { id } });
  return result;
};

export const clientService = {
  createClient,
  getClientById,
  deleteClient,
  updateClient,
  getAllClients,
};
