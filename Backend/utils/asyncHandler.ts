// utils/asyncHandler.ts

import { type Request, type Response, type NextFunction } from "express";

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log("Backend Error Issue", err);
      next(err);
    });
  };
