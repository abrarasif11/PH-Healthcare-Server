import express from "express";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";
import { MetaController } from "./Meta.controller.js";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaController.fetchDashboardMetaData
);

export const MetaRoutes = router;
