import express, { NextFunction, Response, Request } from "express";
import { SpecialtiesController } from "./Specialties.controller.js";
import { fileUploader } from "../../../helpers/fileUploader.js";

const router = express.Router();

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

export const SpecialtiesRoutes = router;
