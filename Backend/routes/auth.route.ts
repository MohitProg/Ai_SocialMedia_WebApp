import express from "express";
import {
  Login,
  Signup,
  ValidateUserOtp,
} from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isAuthenticated } from "../middleware/isAuth.middleware.js";

const router = express();

router.post("/login", asyncHandler(Login));
router.post("/signup", asyncHandler(Signup));
router.post("/validate-otp", isAuthenticated, asyncHandler(ValidateUserOtp));

export default router;
