import jwt, { type JwtPayload } from "jsonwebtoken";
import { type Response, type Request, type NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token; // cookie name — adjust if yours is different

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token provided.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;






    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
