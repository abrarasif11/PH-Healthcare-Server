import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";

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
  console.log("refreshToken", token);
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
