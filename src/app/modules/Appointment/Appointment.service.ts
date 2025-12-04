import prisma from "../../../shared/prisma.js";
import { IAuthUser } from "../../interfaces/common.js";
import { v4 as uuidv4 } from "uuid";

const createAppointment = async (user: IAuthUser, payload: any) => {
  if (!user?.email) {
    throw new Error("Unauthorized request — no user email found");
  }

  if (!payload.doctorId || !payload.scheduleId) {
    throw new Error("doctorId and scheduleId are required");
  }

  // 1. Get patient by email
  const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email, // <-- SAFE
    },
  });

  // 2. Get doctor
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: payload.doctorId,
    },
  });

  // 3. Check schedule availability
  await prisma.doctorSchedules.findFirstOrThrow({
    where: {
      doctorId: doctorData.id,
      scheduleId: payload.scheduleId,
      isBooked: false,
    },
  });

  // 4. Generate calling ID
  const videoCallingId: string = uuidv4();

  // 5. Create appointment
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
