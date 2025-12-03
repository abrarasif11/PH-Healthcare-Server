import express from "express";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./DoctorSchedule.controller.js";

const router = express.Router();

router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

export const DoctorScheduleRoutes = router;
