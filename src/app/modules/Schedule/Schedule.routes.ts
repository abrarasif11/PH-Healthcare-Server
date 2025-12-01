import express from "express";
import { ScheduleController } from "./Schedule.controller.js";

const router = express.Router();

router.post("/", ScheduleController.insertIntoDB);

export const ScheduleRoutes = router;
