import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { email } from "zod";
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

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefg",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needPassChange: userData.needPasswordChange,
  };
};
export const AuthServices = {
  loginUser,
};
