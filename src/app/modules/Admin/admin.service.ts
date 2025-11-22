import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAbleField } from "./admin.constant.js";
const prisma = new PrismaClient();
const getAllFromDB = async (params: any) => {
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];

  // console.log(filterData);
  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleField.map((f) => ({
        [f]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // console.dir(andCondition, { depth: "infinity" });
  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };
  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
};
