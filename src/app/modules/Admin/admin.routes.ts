import express, { Request, Response } from "express";
import { AdminController } from "./admin.controller.js";

const router = express.Router();
router.get("/", AdminController.getAllFromDB);
export const AdminRoutes = router;
