import express, { Request, Response } from "express";
import { userController } from "./user.controller.js";

const router = express.Router();

router.get("/", userController.createAdmin);

export const useRoutes = router;
