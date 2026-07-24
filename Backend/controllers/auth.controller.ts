import { type CookieOptions, type Request, type Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../config/Prisma.js";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SendOTPMail } from "../services/SendMailer.js";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 1000 * 60 * 60 * 24,
};

export const Signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  const existingUser = await prisma.userAuth.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }

  console.log("password", password);
  const hashedPassword = await bcrypt.hash(String(password), 10);
  console.log("password", hashedPassword);

  const newUser = await prisma.userAuth.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // never send password back
  const { password: _pw, ...userWithoutPassword } = newUser;

  const otp = generateOTP();

  if (!otp) {
    throw new ApiError(409, "Unable to generate opt use it later");
  }

  await SendOTPMail(newUser?.name, newUser?.email, Number(otp));

  await prisma.userAuth.update({
    where: {
      id: newUser.id,
    },
    data: {
      otp: Number(otp),
    },
  });
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
    expiresIn: String(JWT_EXPIRY),
  });
  return res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(201, "User registered successfully", userWithoutPassword),
    );
};

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await prisma.userAuth.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(String(password), user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  console.log("JWT_EXPIRY", JWT_EXPIRY);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: String(JWT_EXPIRY),
  });

  const { password: _pw, ...userWithoutPassword } = user;

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, "Login successful", {
        user: userWithoutPassword,
        token,
      }),
    );
};

export const ValidateUserOtp = async (req: Request, res: Response) => {
  const userId = req.id;
  const { otp } = req.body;

  console.log("userIddatacheck",userId) 

  if (!otp) {
    throw new ApiError(400, "Email is Required");
  }

  const isOtpValidate = await prisma.userAuth.findFirst({
    where: {
      otp: Number(otp),
      id: Number(userId),
    },
  });

  if (!isOtpValidate) {
    throw new ApiError(400, "Otp is invalid");
  }

  await prisma.userAuth.update({
    where: {
      id: isOtpValidate.id,
    },
    data: {
      isAuthenticated: true,
      otp: null,
    },
  });

  throw new ApiResponse(200, "Otp is Validate successfully");
};
