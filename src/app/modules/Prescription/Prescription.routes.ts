import express from "express";
import auth from "../../middlewares/auth.js";
import validateRequest from "../../middlewares/validateReq.js";
import { UserRole } from "@prisma/client";
import { PrescriptionValidation } from "./Prescription.validation.js";
import { PrescriptionController } from "./Prescription.controller.js";

const router = express.Router();

router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionController.patientPrescription
);

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PrescriptionController.getAllFromDB
);

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(PrescriptionValidation.create),
  PrescriptionController.insertIntoDB
);

export const PrescriptionRoutes = router;
