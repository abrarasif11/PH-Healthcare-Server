import express from "express";
import { DoctorController } from "./Doctor.controller.js";

const router = express.Router();

router.patch("/:id", DoctorController.updateIntoDB);

export const DoctorRoutes = router;
