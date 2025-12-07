import express from "express";
import auth from "../../middlewares/auth.js";
import validateRequest from "../../middlewares/validateReq.js";
import { UserRole } from "@prisma/client";
import { PrescriptionValidation } from "./Prescription.validation.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(PrescriptionValidation.create),
  PrescriptionController.insertIntoDB
);

export const PrescriptionRoutes = router;
