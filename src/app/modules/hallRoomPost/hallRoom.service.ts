import { PrismaClient, Hall_Room_Post } from "@prisma/client";

const prisma = new PrismaClient();

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
};
