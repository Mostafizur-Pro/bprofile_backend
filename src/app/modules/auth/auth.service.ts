import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { jwtToken } from "../../../shared/jwtToken";

const prisma = new PrismaClient();

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

  //   console.log("data", accessToken, refreshToken);
  const cookieOptions = {
    secure: config.node_env === "production",
    httpOnly: true,
  };

  return {
    accessToken,
    refreshToken,
    cookieOptions,
  };
};

export const authService = {
  login,
};
