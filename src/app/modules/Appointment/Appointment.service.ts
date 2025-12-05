import { IAuthUser } from "../../interfaces/common.js";

const createAppointment = async (user: IAuthUser) => {
  console.log("Appointment", user);
};

export const AppointmentService = {
  createAppointment,
};
