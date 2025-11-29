import prisma from "../../../shared/prisma.js";

const updateIntoDB = async (id: string, payload: any) => {
  const { specialties, ...doctorData } = payload;
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const updateDoctorData = await transactionClient.doctor.update({
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
        const createDoctorSpecialties =
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
        const createDoctorSpecialties =
          await transactionClient.doctorSpecialties.create({
            data: {
              doctorId: doctorInfo.id,
              specialtiesId: specialty.specialtiesId,
            },
          });
      }
    }

    return updateDoctorData;
  });

  return result;
};

export const DoctorService = {
  updateIntoDB,
};
