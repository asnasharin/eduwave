import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Student from "../model/studentProfileModel";
import mongoose from "mongoose";




/**
 * @disc    get studnet profile
 * @route   GET /api/student
 * @access  PROTECTED
 */
export const getProfile = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const userProfile = await Student.findOne({ userID: userId });
      if (userProfile) {
        res.status(200).json({
          success: true,
          userProfile: userProfile,
        });
      } else {
        return next(Error("Somthing went wrong"));
      }
    }
  );


  
/**
 * @disc    Update studnet profile
 * @route   POST /api/student/updateProfile
 * @access  PROTECTED
 */
export const updateStudentProfile = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?._id;
      const {
        name,
        phone,
        dob,
        gender,
        standard,
        subjects,
        intrests,
        preffered_language,
      } = req.body.data;
      const updatedUser = await Student.findOneAndUpdate(
        { userID: userId },
        {
          name: name,
          phone: parseInt(phone, 10),
          dob: dob,
          gender: gender,
          subjects: subjects,
          intrests: intrests,
          standard: standard,
          preffered_language: preffered_language,
        },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
          userProfile: updatedUser,
        });
      } else {
        res.status(400);
        return next(Error("Some Error Occured"));
      }
    }
  );
  

  
/**
 * @disc    Update student profile pitcture
 * @route   PATCH /api/student/updateProfile
 * @access  PROTECTED
 */
export const updateProfile = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userID = req.user?._id;
      const { url } = req.body;
      const updatedUser = await Student.findOneAndUpdate(
        { userID: new mongoose.Types.ObjectId(userID) },
        {
          profile: url,
        },
        {
          new: true,
        }
      );
      if (updatedUser) {
        res.status(200).json({
          success: true,
          message: "Profile Updated Successfully",
          userProfile: updatedUser,
        });
      } else {
        res.status(400);
        return next(Error("Some Error Occured"));
      }
    }
  );