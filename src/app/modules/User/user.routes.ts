import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller.js";
import { jwtHelpers } from "../../../helpers/jwtHelpers.js";
import config from "../../../config/index.js";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );
      console.log(verifiedUser);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("You are authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post("/", auth("ADMIN", "SUPER_ADMIN"), userController.createAdmin);

export const useRoutes = router;
