import asynchandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Admin from "../model/adminProfileModel";
import mongoose from "mongoose";

/**
 * @desc    Get Admin Profile
 * @route   GET api/admin
 * @access  private
 */
export const getAdminProfile = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const userProfile = await Admin.findOne({ userID: userId });
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
 * @disc    Update Profile Picture
 * @route   GET /api/admin/updateProfilePicture
 * @access  private
 */
export const updateProfilePicture = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userID = req.user?._id;
      const { url } = req.body;
      const updatedUser = await Admin.findOneAndUpdate(
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
  