import jwt from "jsonwebtoken";
import { env } from "./envvalid";
import { ObjectId } from "mongodb";

export const generateToken = (userId: ObjectId) => {
  try {
    const token = jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
