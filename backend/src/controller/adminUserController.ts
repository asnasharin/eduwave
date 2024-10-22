import asynchandler from "express-async-handler";
import Teacher from "../model/teacherProfileModel";
import Student from "../model/studentProfileModel";
import { Request, Response, NextFunction } from "express";
import User from "../model/userModel";
import Document from "../model/documentModel";

/**
 * @disc    Get all tutors
 * @route   GET /api/admin/tutors
 * @access  private
 */
export const getAllTutors = asynchandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query: { name?: { $regex: RegExp } } = {};
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 5;
    if (req.query.search)
      [(query.name = { $regex: new RegExp(req.query.search as string, "i") })];
    const tachers = await Teacher.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "users",
          localField: "userID",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user._id": 0,
          "user.role": 0,
          "user.password": 0,
          __v: 0,
          "user.__v": 0,
          profile: 0,
          bio: 0,
          pricing: 0,
        },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      },
    ]);
    let count = await Teacher.countDocuments();
    count = ~~(count / 5);

    if (tachers) {
      res.status(200).json({
        success: true,
        teachers: tachers,
        count: count,
      });
    } else {
      next(Error("No teachers Registered"));
    }
  }
);


/**
 * @disc    Get all students
 * @route   GET /api/admin/students
 * @access  private
 */
export const getAllstudnets = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const query: { name?: { $regex: RegExp } } = {};
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const pageSize = 5;
      if (req.query.search)
        [(query.name = { $regex: new RegExp(req.query.search as string, "i") })];
  
      const students = await Student.aggregate([
        {
          $match: query,
        },
        {
          $lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            "user._id": 0,
            "user.role": 0,
            "user.password": 0,
            __v: 0,
            "user.__v": 0,
            profile: 0,
            gender: 0,
            preffered_language: 0,
            dob: 0,
          },
        },
        {
          $skip: (page - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]);
      let count = await Student.countDocuments();
      count = ~~(count / 5);
      if (students) {
        res.status(200).json({
          success: true,
          students: students,
          count: count,
        });
      } else {
        next(Error("No teachers Registered"));
      }
    }
  );
  
  
/**
 * @disc    Block user
 * @route   PATCH /api/admin/user-block/:id
 * @access  private
 */
export const blockUser = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.id;
      const blockUser = await User.findByIdAndUpdate(
        { _id: userId },
        { status: false },
        { new: true }
      );
      if (blockUser) {
        res.status(200).json({
          success: true,
          message: "user Blocked!",
        });
      } else {
        next(Error("something went wrong!"));
      }
    }
  );
  
  /**
   * @disc    Unblock user
   * @route   PATCH /api/admin/user-unblock/:id
   * @access  private
   */
  export const unblockUser = asynchandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.params.id;
      const blockUser = await User.findByIdAndUpdate(
        { _id: userId },
        { status: true },
        { new: true }
      );
      if (blockUser) {
        res.status(200).json({
          success: true,
          message: "user unblocked!",
        });
      } else {
        next(Error("something went wrong!"));
      }
    }
  );