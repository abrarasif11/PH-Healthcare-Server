import { Response, Request, NextFunction } from "express";
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

export default validateRequest;
