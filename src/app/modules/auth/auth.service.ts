import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { jwtToken } from "../../../shared/jwtToken";

const prisma = new PrismaClient();

const adminLogin = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password isn't matched");
  }

  const { email: adminEmail, role } = admin;

  // create access token
  const accessToken = jwtToken.createToken(
    { adminEmail, role },
    config.jwt_secret as Secret,
    { expiresIn: "1d" } // Example: Expires in 1 day
  );

  const refreshToken = jwtToken.createToken(
    { adminEmail, role },
    config.jwt_refresh_token as Secret,
    { expiresIn: "7d" } // Example: Expires in 7 days
  );

  
  const cookieOptions = {
    secure: config.node_env === "production",
    httpOnly: true,
  };

  return {
    accessToken,
    refreshToken,
    cookieOptions,
    admin,
  };
};

const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const client = await prisma.client.findUnique({ where: { email } });
  if (!client) {
    throw new ApiError(httpStatus.NOT_FOUND, "Client not found");
  }

  const isPasswordValid = await bcrypt.compare(password, client.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password isn't matched");
  }

  const { email: clientEmail, role } = client;

  // create access token
  const accessToken = jwtToken.createToken(
    { clientEmail, role },
    config.jwt_secret as Secret,
    { expiresIn: "1d" } // Example: Expires in 1 day
  );

  const refreshToken = jwtToken.createToken(
    { clientEmail, role },
    config.jwt_refresh_token as Secret,
    { expiresIn: "7d" } // Example: Expires in 7 days
  );

  
  const cookieOptions = {
    secure: config.node_env === "production",
    httpOnly: true,
  };

  return {
    accessToken,
    refreshToken,
    cookieOptions,
    client,
  };
};

const changePassword = async (payload: {
  id: string;
  oldPassword: string;
  newPassword: string;
}) => {
  const { id, oldPassword, newPassword } = payload;

  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) {
    throw new ApiError(httpStatus.NOT_FOUND, "Client not found");
  }

  const isPasswordValid = await bcrypt.compare(oldPassword, client.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password isn't matched");
  }

  const hashedPassword: string = await bcrypt.hash(newPassword, 6);

  if (client && isPasswordValid) {
    const result = await prisma.client.update({
      where: { id },
      data: { password: hashedPassword }, // Change 'payload' to 'data'
    });
    return result;
  }

  // return result;
};

export const authService = {
  login,
  adminLogin,
  changePassword,
};
