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

export const AppointmentRoutes = router;
