import express from "express";
import { PaymentController } from "./Payment.controller.js";

const router = express.Router();

// router.get("/ipn", PaymentController.validatePayment);

router.post("/init-payment", PaymentController.initPayment);

export const PaymentRoutes = router;
