import prisma from "../../../shared/prisma.js";
import { IAuthUser } from "../../interfaces/common.js";
import { v4 as uuidv4 } from "uuid";

const createAppointment = async (user: IAuthUser, payload: any) => {
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  const videoCallingId: string = uuidv4();
  console.log("Video Calling Id : ", videoCallingId);

  const result = await prisma.appointment.create({
    data: {
      patientId: patientData.id,
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      videoCallingId,
    },
    include: {
      patient: true,
      doctor: true,
      schedule: true,
    },
  });

  return result;
};
export const AppointmentService = {
  createAppointment,
};
