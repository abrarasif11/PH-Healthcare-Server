import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import httpStatus from "http-status";

const app: Application = express();
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "PH Health Care Server...",
  });
});

app.use("/api/v1", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.name || "Something Went Wrong",
    error: err,
  });
});

export default app;
