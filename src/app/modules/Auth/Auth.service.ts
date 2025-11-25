import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPass = await bcrypt.compare(
    payload.password,
    userData.password
  );
  console.log(isCorrectPass);

  return userData;
};
export const AuthServices = {
  loginUser,
};
