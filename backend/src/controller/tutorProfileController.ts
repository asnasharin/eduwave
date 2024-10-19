import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Teacher from "../model/teacherProfileModel";
import mongoose from "mongoose";
import StudentPosts from "../model/studentPostModel";
import Requests from "../model/requestModel";
import Student from "../model/studentProfileModel";
import User from "../model/userModel";

/**
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const userProfile = await Teacher.findOne({ userID: userId });
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
 * @disc    get tutor profile
 * @route   GET /api/tutor
 * @access  private
 */
export const updateProfilePicture = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.user?._id;
    const { url } = req.body;
    const updatedUser = await Teacher.findOneAndUpdate(
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

/**
 * @disc    Update studnet profile
 * @route   POST /api/student/updateProfile
 * @access  private
 */
export const updateTutorProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const { name, phone, bio, qualification, languages, pricing } =
      req.body.data;
    const updatedUser = await Teacher.findOneAndUpdate(
      { userID: userId },
      {
        name: name,
        phone: parseInt(phone, 10),
        bio: bio,
        qualification: qualification,
        languages: languages,
        pricing: parseInt(pricing, 10),
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
 * @disc    Get Studnets Posts
 * @route   GET /api/tutor/posts
 * @access  private
 */
export const getStudentsPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await StudentPosts.aggregate([
      { $match: { isDelete: false } },
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "userID",
          as: "profile",
        },
      },
      { $unwind: "$profile" },
      {
        $project: {
          isDelete: 0,
          __v: 0,
          "profile._id": 0,
          "profile.userID": 0,
          "profile.phone": 0,
          "profile.dob": 0,
          "profile.gender": 0,
          "profile.standard": 0,
          "profile.subjects": 0,
          "profile.intrests": 0,
          "profile.__v": 0,
          "profile.preffered_language": 0,
        },
      },
    ]);

    const teacherId = req.user?._id;

    for (const post of posts) {
      const connection = await Requests.findOne({
        studentId: post.studentId,
        teacherId,
      });
      if (connection) {
        post.reqStatus = connection.status;
      } else {
        post.reqStatus = "NONE";
      }
    }

    if (posts) {
      res.status(200).json({
        success: true,
        posts: posts,
      });
    } else {
      next(Error("No Student Posts"));
    }
  }
);

/**
 * @disc    Get My students
 * @route   GET /api/tutor/myStudents
 * @access  private
 */
export const getMyStudents = asyncHandler(
  async (req: Request, res: Response) => {
    const teacherId = req.user?._id;
    const posts = [];
    const teacher = await Teacher.findOne(
      { userID: teacherId },
      { connections: 1 }
    );
    const connections = teacher?.connections ? teacher?.connections : [];
    for (const student of connections) {
      const Mystydent = await Student.findOne(
        { userID: student },
        { connections: 0, __v: 0, profile: 0, dob: 0 }
      );
      if (student) {
        posts.push(Mystydent);
      }
    }
    res.status(200).json({
      success: true,
      students: posts,
    });
  }
);

/**
 * @disc    Get all tuttos
 * @route   GET /api/tutor/all
 * @access  public
 */
export const getAllTutors = asyncHandler(
  async (req: Request, res: Response) => {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const pageSize = 8;
    const userId = req.user?._id;
    let tutors = await User.aggregate([
      { $match: { status: true } },
      {
        $project: {
          _id: 1,
        },
      },
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "tutorId",
          as: "ratings",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $gte: ["$rating", 1] }, { $lte: ["$rating", 5] }],
                },
              },
            },
          ],
        },
      },
      {
        $unwind: { path: "$ratings", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          averageRating: { $avg: "$ratings.rating" },
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "userID",
          as: "profile",
        },
      },
      {
        $unwind: {
          path: "$profile",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          profile: 1,
          isInConnection: {
            $cond: {
              if: {
                $and: [
                  { $isArray: "$profile.connections" },
                  { $in: [{ $toString: userId }, "$profile.connections"] },
                ],
              },
              then: true,
              else: false,
            },
          },
          averageRating: 1,
        },
      },
      {
        $match: {
          profile: { $exists: true },
        },
      },
      {
        $lookup: {
          from: "requests",
          let: { teacherId: "$profile.userID", studentId: userId },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $and: [
                        { $eq: ["$studentId", "$$studentId"] },
                        { $eq: ["$teacherId", "$$teacherId"] },
                      ],
                    },
                    { $eq: ["$status", "PENDING"] },
                  ],
                },
              },
            },
          ],
          as: "requests",
        },
      },
      {
        $project: {
          profile: 1,
          isInConnection: 1,
          averageRating: {
            $cond: {
              if: { $eq: ["$averageRating", null] },
              then: 0,
              else: "$averageRating",
            },
          },
          isRequested: {
            $cond: {
              if: { $gt: [{ $size: "$requests" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    if (req.query.search) {
      const query = (req.query.search as string)
        .toLowerCase()
        .replace(/\s/g, "");
      tutors = tutors.filter((e) => {
        const language = e.profile.languages
          .join(",")
          .toLowerCase()
          .replace(/\s/g, "");
        if (language.includes(query)) {
          return true;
        } else if (query.includes(language)) {
          return true;
        }

        const qualification = e.profile.qualification
          .join(",")
          .toLowerCase()
          .replace(/\s/g, "");
        if (qualification.includes(query)) {
          return true;
        } else if (query.includes(qualification)) {
          return true;
        }
        const name = e.profile.name.toLowerCase().replace(/\s/g, "");
        if (name.includes(query)) {
          return true;
        } else if (query.includes(name)) {
          return true;
        }
      });
    }

    if (req.query.language) {
      const query = req.query.language as string;
      tutors = tutors.filter((e) => {
        const language = e.profile.languages;
        if (language.includes(query)) {
          return true;
        } else if (query.includes(language)) {
          return true;
        }
      });
    }

    if (req.query.qualification) {
      const query = req.query.qualification as string;
      tutors = tutors.filter((e) => {
        const qualification = e.profile.qualification;
        if (qualification.includes(query)) {
          return true;
        } else if (query.includes(qualification)) {
          return true;
        }
      });
    }

    const sortQuery = req.query.sort;
    switch (sortQuery) {
      case "low-high":
        tutors.sort((a, b) => {
          const priceA = parseInt(a.profile.pricing, 10);
          const priceB = parseInt(b.profile.pricing, 10);
          return priceA - priceB;
        });
        break;
      case "high-low":
        tutors.sort((a, b) => {
          const priceA = parseInt(a.profile.pricing, 10);
          const priceB = parseInt(b.profile.pricing, 10);
          return priceB - priceA;
        });
        break;
      case "popular":
        tutors.sort((a, b) => {
          const ratingA = parseInt(a.averageRating, 10);
          const ratingB = parseInt(b.averageRating, 10);
          return ratingB - ratingA;
        });
        break;
      default:
        break;
    }
    tutors = tutors.slice(
      (page - 1) * pageSize,
      Math.min((page - 1) * pageSize + pageSize, tutors.length)
    );
    let count = await Teacher.countDocuments();
    count = Math.ceil(count / 8);
    if (tutors) {
      res.status(200).json({
        success: true,
        tutors,
        count,
      });
    }
  }
);
