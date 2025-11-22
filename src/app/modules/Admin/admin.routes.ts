import express from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();
router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getIdByDb);
router.patch("/:id", AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDb);
export const AdminRoutes = router;
