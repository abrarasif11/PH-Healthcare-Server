import prisma from "../../../shared/prisma.js";

const updateIntoDB = async (id: string, payload: any) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updateDoctorData = await prisma.doctor.update({
    where: {
      id,
    },
    data: payload,
    include: {
      doctorSpecialties: true,
    },
  });

  return updateDoctorData;
};

export const DoctorService = {
  updateIntoDB,
};
