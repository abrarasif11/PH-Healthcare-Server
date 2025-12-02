import express from "express";
import { ScheduleController } from "../Schedule/Schedule.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), ScheduleController.insertIntoDB);

export const DoctorScheduleRoutes = router;
