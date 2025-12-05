import express from "express";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./Appointment.controller.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.PATIENT),
  // validateRequest(AppointmentValidation.createAppointment),
  AppointmentController.createAppointment
);

router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.getMyAppointment
);

export const AppointmentRoutes = router;
