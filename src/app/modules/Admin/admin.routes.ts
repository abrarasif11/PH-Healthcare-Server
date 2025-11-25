import express, { Response, Request, NextFunction } from "express";
import { AdminController } from "./admin.controller.js";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log("Data", req.body);
  next();
};

const router = express.Router();
router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getIdByDb);
router.patch("/:id", validateRequest, AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.softDeleteFromDb);
export const AdminRoutes = router;
