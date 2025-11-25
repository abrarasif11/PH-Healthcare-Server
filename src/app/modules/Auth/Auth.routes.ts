import express from "express";
import { AuthController } from "./Auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
