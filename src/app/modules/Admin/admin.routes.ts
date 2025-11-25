import express from "express";
import { AdminController } from "./admin.controller.js";

import validateRequest from "../../middlewares/validateReq.js";
import { adminValidateSchemas } from "./admin.validation.js";

const router = express.Router();

router.get("/", AdminController.getAllFromDB);
router.get("/:id", AdminController.getIdByDb);
router.patch(
  "/:id",
  validateRequest(adminValidateSchemas.update),
  AdminController.updateIntoDB
);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.softDeleteFromDb);
export const AdminRoutes = router;
