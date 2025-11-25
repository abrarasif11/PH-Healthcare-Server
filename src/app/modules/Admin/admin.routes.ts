import express, { Response, Request, NextFunction } from "express";
import { AdminController } from "./admin.controller.js";

import { z } from "zod";
import { AnyZodObject } from "zod/v3";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getIdByDb);
router.patch("/:id", validateRequest(update), AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.softDeleteFromDb);
export const AdminRoutes = router;
