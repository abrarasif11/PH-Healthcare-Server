import express, { Application, Request, Response } from "express";
import cors from "cors";
import { useRoutes } from "./app/modules/User/user.routes.js";
import { AdminRoutes } from "./app/modules/Admin/admin.controller.js";

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
app.use("/api/v1/user", useRoutes);
app.use("/api/v1/admin", AdminRoutes);

export default app;
