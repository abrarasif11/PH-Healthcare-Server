import { Request } from "express";
import { fileUploader } from "../../../helpers/fileUploader.js";
import prisma from "../../../shared/prisma.js";
import { IFile } from "../../interfaces/file.js";

const insertIntoDB = async (req: Request & { file?: IFile }) => {
  const file = req.file as IFile;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }

  const result = await prisma.specialties.create({
    data: req.body,
  });

  return result;
};

export const SpecialtiesService = {
  insertIntoDB,
};
