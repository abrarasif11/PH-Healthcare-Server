import express from "express";
import { DoctorController } from "./Doctor.controller.js";

const router = express.Router();
router.get("/", DoctorController.getAllFromDB);

router.get("/:id", DoctorController.getIdByDb);

router.patch("/:id", DoctorController.updateIntoDB);

export const DoctorRoutes = router;
