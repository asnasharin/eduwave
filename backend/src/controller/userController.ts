import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User, { IUser} from "../model/userModel";
import Otp, { IOtp } from "../model/otpModel";
import bcrypt from "bcryptjs"
import { transporter } from "../utils/mailConfig";
import Student from "../model/studentProfileModel";
import Teacher from "../model/teacherProfileModel";
import { generateToken } from "../utils/generateToken";
import admin from "../model/adminProfileModel";
import axios from "axios";

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


/**
 * @disc    user signup
 * @route   POST /api/signup
 * @access  PUBLIC
 */
export const userSignup = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role, phone } = req.body;
  const isExist = await User.findOne({ email: email });
  if (!isExist) {
    const createUser = await User.create({
      email: email,
      password: password,
      role: role,
    });
    const tocken = generateToken(createUser._id);
    if (createUser) {
      if (createUser.role === "STUDENT") {
        await Student.create({
          userID: createUser._id,
          phone: phone,
          name: name,
        });
      } else if (createUser.role === "TUTOR") {
        await Teacher.create({
          userID: createUser._id,
          phone: phone,
          name: name,
        });
      } else if (createUser.role === "ADMIN") {
        await admin.create({
          userID: createUser._id,
          phone: phone,
          name: name,
        });
      }

      res.status(200).json({
        success: true,
        message: "User creatred successfully",
        user: {
          _id: createUser._id,
          email: createUser.email,
          role: createUser.role,
        },
        tocken: tocken,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(401);
    throw new Error("Email Already Exist");
  }
});


/**
 * @disc    user login
 * @route   POST /api/login
 * @access  PUBLIC
 */
export const userLogin = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne<IUser>({ email: email });
    if (user) {
      if (user.status) {
        if (user.password && (await user.matchPassword(password))) {
          const tocken = generateToken(user._id);
          res.status(200).json({
            success: true,
            tocken: tocken,
            user: {
              _id: user._id,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          res.status(401);
          return next(Error("Invalid Credentials"));
        }
      } else {
        res.status(401);
        return next(Error("this account has been blocked!"));
      }
    } else {
      res.status(401);
      return next(Error("User Not Found!"));
    }
  }
);


/**
 * @disc    Google Auth
 * @route   POST /api/googleAuth
 * @access  PUBLIC
 */
export const googleAuth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, role } = req.body;

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const {
      name,
      email,
      picture,
    }: { name: string; email: string; picture?: string } = response.data;

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      if (isExist.password) {
        res.status(400);
        return next(Error("Cannot Login without password"));
      } else {
        if (!isExist.status) {
          next(Error("This account has been blocked!"));
        }
        const tocken = generateToken(isExist._id);
        res.status(200).json({
          success: true,
          user: {
            _id: isExist._id,
            email: isExist.email,
            role: isExist.role,
          },
          tocken: tocken,
        });
      }
    } else {
      if (role !== "PUBLIC") {
        const user = await User.create({
          email: email,
          role: role,
        });

        if (user.role === "STUDENT") {
          await Student.create({
            name: name,
            userID: user._id,
            profile: picture,
          });
        } else if (user.role === "TUTOR") {
          await Teacher.create({
            name: name,
            userID: user._id,
            profile: picture,
          });
        }
        const tocken = generateToken(user._id);
        res.status(200).json({
          success: true,
          user: {
            _id: user._id,
            email: user.email,
            role: user.role,
          },
          tocken: tocken,
        });
      } else {
        res.status(400);
        return next(Error("Signup as Tutor/student"));
      }
    }
  }
);


/**
 * @disc    Check current Password
 * @route   POST /api/resetPassword
 * @access  PROTECTED
 */
export const checkPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.user?._id;
    const { currentPassword } = req.body;
    const user = await User.findById({ _id: id });
    if (user && (await user.matchPassword(currentPassword))) {
      res.status(200).json({
        success: true,
        message: "password matching",
      });
    } else {
      res.status(401);
      next(Error("Invalid Password"));
    }
  }
);


/**
 * @disc    Check current Password
 * @route   PAST /api/resetPassword
 * @access  PROTECTED
 */
export const resetPassword = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req?.user?._id;
    const { newPassworrd } = req.body;
    const user = await User.findById({ _id: id });
    if (user) {
      user.password = newPassworrd;
      const updated = await user.save();
      if (updated) {
        res.status(200).json({
          success: true,
          message: "password updated Successfully!",
        });
      } else {
        next(Error("some Error occured"));
      }
    }
  }
);


/**
 * @disc    Check current Password
 * @route   PAST /api/userProfile/:id
 * @access  PROTECTED
 */
export const getUserProfile = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = await User.findById(id);
    let userProfile;
    if (user?.role === "TUTOR") {
      userProfile = await Teacher.findOne(
        { userID: id },
        { name: 1, profile: 1, _id: 0, userID: 1 }
      );
    } else if (user?.role === "STUDENT") {
      userProfile = await Student.findOne(
        { userID: id },
        { name: 1, profile: 1, _id: 0, userID: 1 }
      );
    }
    if (userProfile) {
      res.status(200).json({ success: true, userProfile });
    } else {
      next(Error("Internal server error"));
    }
  }
);
