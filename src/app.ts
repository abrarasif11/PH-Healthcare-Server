import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { AppointmentService } from "./app/modules/Appointment/Appointment.service.js";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "PH Health Care Server...",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
      message: "Requested path is not found",
    },
  });
});

export default app;
