import prisma from "../../../shared/prisma.js";
import { IAuthUser } from "../../interfaces/common.js";

const createAppointment = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
};
export const AppointmentService = {
  createAppointment,
};
