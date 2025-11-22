import express from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();
router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getIdByDb);
export const AdminRoutes = router;
