import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config/index.js";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPass: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPass) {
    throw new Error("Password is incorrect!!");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghij",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPassChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(token, "abcdefghij") as JwtPayload;
  } catch (err) {
    throw new Error("Not Authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    "5m"
  );

  return {
    accessToken,
    needPassChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
