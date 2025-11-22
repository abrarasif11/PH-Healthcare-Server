import { Prisma } from "@prisma/client";
import { adminSearchAbleField } from "./admin.constant.js";
import { pagintaionHelper } from "../../../helpers/paginationsHelpers.js";
import prisma from "../../../shared/prisma.js";

const getAllFromDB = async (params: any, options: any) => {
  const { limit, page, skip } = pagintaionHelper.calculatePagination(options);
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
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getIdByDb = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AdminService = {
  getAllFromDB,
  getIdByDb,
};
