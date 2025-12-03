import express from "express";
import { ScheduleController } from "./Schedule.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.DOCTOR), ScheduleController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleController.insertIntoDB
);

export const ScheduleRoutes = router;
