import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma.js";
import { fileUploader } from "../../../helpers/fileUploader.js";
const createAdmin = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(req.body.data);
  }

  // const hashedPassword: string = await bcrypt.hash(data.password, 12);
  // const userData = {
  //   email: data.admin.email,
  //   password: hashedPassword,
  //   role: UserRole.ADMIN,
  // };
  // const result = await prisma.$transaction(async (transactionClient) => {
  //   await transactionClient.user.create({
  //     data: userData,
  //   });
  //   const createAdminData = await transactionClient.admin.create({
  //     data: data.admin,
  //   });
  //   return createAdminData;
  // });
  // return result;
};

export const userService = {
  createAdmin,
};
