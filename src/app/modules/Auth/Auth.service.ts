import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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
    "abcdefg",
    "5m"
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
    decodedData = jwt.verify(token, "abcdefghij");
  } catch (err) {
    throw new Error("Not Authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
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
