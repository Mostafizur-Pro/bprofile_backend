import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateNextClientProfileId = async (): Promise<string> => {
  // Fetch the last admin's profile_id from the database
  const lastAdmin = await prisma.client.findFirst({
    orderBy: {
      profile_id: "desc", // Order by profile_id in descending order to get the last one
    },
  });

  // If there are no admins in the database yet, start with "BP" + currentYear + "A0001"
  if (!lastAdmin) {
    const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
    return `BP${currentYear}C0001`;
  }

  // Extract the numeric part of the last profile_id and increment it by 1
  const lastProfileIdNumericPart = parseInt(lastAdmin.profile_id.substr(-4)); // Extract last four digits
  const nextProfileIdNumericPart = lastProfileIdNumericPart + 1;

  // Pad the numeric part with leading zeros to make it four digits long
  const paddedNextProfileIdNumericPart = nextProfileIdNumericPart
    .toString()
    .padStart(4, "0");

  // Generate the next profile_id with the updated numeric part
  const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
  const nextProfileId = `BP${currentYear}C${paddedNextProfileIdNumericPart}`;

  return nextProfileId;
};
export const generateNextAdminProfileId = async (): Promise<string> => {
  // Fetch the last admin's profile_id from the database
  const lastAdmin = await prisma.admin.findFirst({
    orderBy: {
      profile_id: "desc", // Order by profile_id in descending order to get the last one
    },
  });

  // If there are no admins in the database yet, start with "BP" + currentYear + "A0001"
  if (!lastAdmin) {
    const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
    return `BP${currentYear}A0001`;
  }

  // Extract the numeric part of the last profile_id and increment it by 1
  const lastProfileIdNumericPart = parseInt(lastAdmin.profile_id.substr(-4)); // Extract last four digits
  const nextProfileIdNumericPart = lastProfileIdNumericPart + 1;

  // Pad the numeric part with leading zeros to make it four digits long
  const paddedNextProfileIdNumericPart = nextProfileIdNumericPart
    .toString()
    .padStart(4, "0");

  // Generate the next profile_id with the updated numeric part
  const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
  const nextProfileId = `BP${currentYear}A${paddedNextProfileIdNumericPart}`;

  return nextProfileId;
};
export const generateNextUserProfileId = async (): Promise<string> => {
  // Fetch the last admin's profile_id from the database
  const lastAdmin = await prisma.user.findFirst({
    orderBy: {
      profile_id: "desc", // Order by profile_id in descending order to get the last one
    },
  });

  // If there are no admins in the database yet, start with "BP" + currentYear + "A0001"
  if (!lastAdmin) {
    const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
    return `BP${currentYear}U0001`;
  }

  // Extract the numeric part of the last profile_id and increment it by 1
  const lastProfileIdNumericPart = parseInt(lastAdmin.profile_id.substr(-4)); // Extract last four digits
  const nextProfileIdNumericPart = lastProfileIdNumericPart + 1;

  // Pad the numeric part with leading zeros to make it four digits long
  const paddedNextProfileIdNumericPart = nextProfileIdNumericPart
    .toString()
    .padStart(4, "0");

  // Generate the next profile_id with the updated numeric part
  const currentYear = new Date().getFullYear().toString().substr(-2); // Get last two digits of the current year
  const nextProfileId = `BP${currentYear}U${paddedNextProfileIdNumericPart}`;

  return nextProfileId;
};
