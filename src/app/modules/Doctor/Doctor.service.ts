import { Doctor, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma.js";
import { pagintaionHelper } from "../../../helpers/paginationsHelpers.js";
import { doctorFilterableFields } from "./Doctor.constant.js";
import { IDoctorFilterRequest, IDoctorUpdate } from "./Doctor.interface.js";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async (transactionClient) => {
    await transactionClient.doctor.update({
      where: {
        id,
      },
      data: doctorData,
      include: {
        doctorSpecialties: true,
      },
    });

    if (specialties && specialties.length > 0) {
      // delete specialties
      const deleteSpecialtiesIds = specialties.filter(
        (specialty) => specialty.isDeleted
      );
      for (const specialty of deleteSpecialtiesIds) {
        await transactionClient.doctorSpecialties.deleteMany({
          where: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }

      //  create specialties
      const createSpecialtiesIds = specialties.filter(
        (specialty) => !specialty.isDeleted
      );
      for (const specialty of createSpecialtiesIds) {
        await transactionClient.doctorSpecialties.create({
          data: {
            doctorId: doctorInfo.id,
            specialtiesId: specialty.specialtiesId,
          },
        });
      }
    }
  });

  const result = await prisma.doctor.findUnique({
    where: {
      id: doctorInfo.id,
    },
    include: {
      doctorSpecialties: {
        include: {
          specialties: true,
        },
      },
    },
  });

  return result;
};

const getAllFromDB = async (
  params: IDoctorFilterRequest,
  options: IDoctorUpdate
) => {
  const { limit, page, skip } = pagintaionHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andCondition: Prisma.AdminWhereInput[] = [];

  // console.log(filterData);
  if (params.searchTerm) {
    andCondition.push({
      OR: doctorFilterableFields.map((f) => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andCondition.push({
    isDeleted: false,
  });

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
  const result = await prisma.doctor.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};

const deleteFromDb = async (id: string): Promise<Doctor | null> => {
  const existingDoctor = await prisma.doctor.findUniqueOrThrow({
    where: { id },
  });

  const result = await prisma.$transaction(async (tx) => {
    const doctorDeletedData = await tx.doctor.delete({
      where: { id },
    });

    await tx.user.delete({
      where: { email: doctorDeletedData.email },
    });

    return doctorDeletedData;
  });

  return result;
};

export const DoctorService = {
  updateIntoDB,
  getAllFromDB,
  getIdByDb,
  deleteFromDb,
};
