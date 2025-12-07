import express from "express";
import auth from "../../middlewares/auth.js";
import validateRequest from "../../middlewares/validateReq.js";
import { UserRole } from "@prisma/client";

const router = express.Router();

// router.get('/', ReviewController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.PATIENT),
  // validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB
);

export const ReviewRoutes = router;
