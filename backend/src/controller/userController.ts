import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User, { IUser} from "../model/userModel";
import Otp, { IOtp } from "../model/otpModel";
import bcrypt from "bcryptjs"
import { transporter } from "../utils/mailConfig";

/**
 * @disc    Sending OTP through mail
 * @route   POST /api/verify-email
 * @access  PUBLIC
 */
export const verifyMail = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const isExist = await User.findOne({ email: email });
      if (isExist) {
        res.status(401);
        return next(Error("Email Already Exist"));
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log("OTP", otp);

      const salt = await bcrypt.genSalt(10);
      await Otp.findOneAndUpdate(
        { email: email },
        { $set: { email, otp: await bcrypt.hash(otp.toString(), salt) } },
        { upsert: true, new: true }
      );
  
      const mailOptions = {
        from: "eduwave@gmail.com",
        to: email,
        subject: "Welcome to eduwave",
        text: `This is your OTP for verification ${otp}`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
  
      res.status(200).json({
        success: true,
        message: "OTP sent",
      });
    }
  );

  /**
 * @disc    Verifying OTP
 * @route   POST /api/verify-otp
 * @access  PUBLIC
 */
export const verifyOTP = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const OTP = await Otp.findOne<IOtp>({ email: email });
  if (OTP && (await OTP.matchOTP(otp))) {
    res.status(200).json({
      success: true,
      message: "Email verified Successfully",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid OTP",
    });
  }
});