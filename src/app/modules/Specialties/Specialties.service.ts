import { fileUploader } from "../../../helpers/fileUploader.js";
import prisma from "../../../shared/prisma.js";

const insertIntoDB = async (req: Request) => {
  const file = req.file;
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
