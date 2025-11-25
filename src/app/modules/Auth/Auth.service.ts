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
  console.log(isCorrectPass);

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
  console.log("accessToken : ", accessToken);
  return userData;
};
export const AuthServices = {
  loginUser,
};
