import express from "express";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { DoctorScheduleController } from "./DoctorSchedule.controller.js";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), DoctorScheduleController.insertIntoDB);

export const DoctorScheduleRoutes = router;
