import express from "express";
import { useRoutes } from "../modules/User/user.routes.js";
import { AdminRoutes } from "../modules/Admin/admin.routes.js";
import { AuthRoutes } from "../modules/Auth/Auth.routes.js";
import { SpecialtiesRoutes } from "../modules/Specialties/Specialties.routes.js";
import { DoctorRoutes } from "../modules/Doctor/Doctor.routes.js";
import { PatientRoutes } from "../modules/Patient/Patient.routes.js";
import { ScheduleRoutes } from "../modules/Schedule/Schedule.routes.js";
import { DoctorScheduleRoutes } from "../modules/DoctorSchedule/DoctorSchedule.routes.js";
import { AppointmentRoutes } from "../modules/Appointment/Appointment.routes.js";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: useRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
