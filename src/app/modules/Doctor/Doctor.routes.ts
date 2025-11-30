import express from "express";
import { DoctorController } from "./Doctor.controller.js";
import auth from "../../middlewares/auth.js";
import { UserRole } from "@prisma/client";

const router = express.Router();
router.get("/", DoctorController.getAllFromDB);

router.get("/:id", DoctorController.getIdByDb);

router.patch("/:id", DoctorController.updateIntoDB);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.deleteFromDb
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorController.softDeleteFromDb
);

export const DoctorRoutes = router;
