import express from "express";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./DoctorSchedule.controller.js";
import validateRequest from "../../middlewares/validateReq.js";
import { DoctorScheduleValidation } from "./DoctoreSchedule.validation.js";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  DoctorScheduleController.getAllFromDB
);

router.get(
  "/my-schedule",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.getMySchedule
);

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(DoctorScheduleValidation.create),
  DoctorScheduleController.insertIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.DOCTOR),
  DoctorScheduleController.deleteFromDB
);
export const DoctorScheduleRoutes = router;
