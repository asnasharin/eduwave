import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import Requests from "../model/requestModel";
import Teacher from "../model/teacherProfileModel";
import Student from "../model/studentProfileModel";

/**
 * @disc    Create Request
 * @route   POST /api/tutor/createConnection
 * @access  private
 */
export const createConnection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.studentId) {
      const teacherId = req.user?._id;
      const { studentId } = req.body;
      const aleadySent = await Requests.findOne({
        teacherId: teacherId,
        studentId: studentId,
      });
      if (!aleadySent) {
        const creatConnection = await Requests.create({
          studentId,
          teacherId,
          createdBy: teacherId,
        });
        if (creatConnection) {
          res.status(200).json({
            success: true,
            message: "Connection request sent",
          });
        } else {
          next(Error("Somethig went wrong"));
        }
      } else {
        res.status(402);
        next(Error("Request Allready sent!"));
      }
    } else if (req.body.teacherId) {
      const studentId = req.user?._id;
      const { teacherId } = req.body;
      const aleadySent = await Requests.findOne({
        teacherId: teacherId,
        studentId: studentId,
      });
      if (!aleadySent) {
        const creatConnection = await Requests.create({
          studentId,
          teacherId,
          createdBy: studentId,
        });
        if (creatConnection) {
          res.status(200).json({
            success: true,
            message: "Connection request sent",
          });
        } else {
          next(Error("Somethig went wrong"));
        }
      } else {
        res.status(402);
        next(Error("Request Allready sent!"));
      }
    }
  }
);

/**
 * @disc    Cancel Request
 * @route   POST /api/tutor/cancelConnection
 * @access  private
 */
export const CancelConnection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.studentId) {
      const teacherId = req.user?._id;
      const { studentId } = req.body;
      const deleteRequest = await Requests.findOneAndDelete({
        studentId: studentId,
        teacherId: teacherId,
      });

      if (deleteRequest) {
        res.status(200).json({
          success: true,
          message: "Connection request sent",
        });
      } else {
        next(Error("Somethig went wrong"));
      }
    } else if (req.body.teacherId) {
      const studentId = req.user?._id;
      const { teacherId } = req.body;
      const deleteRequest = await Requests.findOneAndDelete({
        studentId: studentId,
        teacherId: teacherId,
      });

      if (deleteRequest) {
        res.status(200).json({
          success: true,
          message: "Connection request sent",
        });
      } else {
        next(Error("Somethig went wrong"));
      }
    }
  }
);

/**
 * @disc    get My requests
 * @route   GET /api/student/request
 * @access  private
 */
export const getAllmyRequests = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user?.role;
    if (user === "STUDENT") {
      const studentId = req.user?._id;
      const requests = await Requests.aggregate([
        {
          $match: {
            studentId: studentId,
            status: "PENDING",
            createdBy: { $ne: studentId },
          },
        },
        {
          $lookup: {
            from: "teachers",
            localField: "teacherId",
            foreignField: "userID",
            as: "teacher",
          },
        },
        { $unwind: "$teacher" },
        {
          $project: {
            "teacher.name": 1,
            "teacher.profile": 1,
            "teacher.bio": 1,
            _id: 1,
            status: 1,
            teacherId: 1,
            studentId: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      if (requests) {
        res.status(200).json({
          success: true,
          requests,
        });
      } else {
        next(Error("No requests found"));
      }
    } else if (user === "TUTOR") {
      const teacherId = req.user?._id;
      const requests = await Requests.aggregate([
        {
          $match: {
            teacherId: teacherId,
            status: "PENDING",
            createdBy: { $ne: teacherId },
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "userID",
            as: "student",
          },
        },
        { $unwind: "$student" },
        {
          $project: {
            "student.name": 1,
            "student.profile": 1,
            "student.intrests": 1,
            "student.subjects": 1,
            _id: 1,
            status: 1,
            teacherId: 1,
            studentId: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      if (requests) {
        res.status(200).json({
          success: true,
          requests,
        });
      } else {
        next(Error("No requests found"));
      }
    }
  }
);

/**
 * @disc    Accept Request
 * @route   POST /api/student/acceptRequest/:id
 * @access  private
 */
export const acceptRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.teacherId) {
      const id = req.params.id;
      const studentId = req.user?._id;
      const { teacherId } = req.body;
      const updateRequest = await Requests.findByIdAndUpdate(
        { _id: id },
        { status: "CONNECTED" },
        { new: true }
      );
      const updateTutor = await Teacher.findOneAndUpdate(
        { userID: teacherId },
        { $push: { connections: studentId } }
      );
      const updateStudent = await Student.findOneAndUpdate(
        { userID: studentId },
        { $push: { connections: teacherId } }
      );
      if (updateRequest && updateStudent && updateTutor) {
        res.status(200).json({
          success: true,
          message: "Request accepted",
        });
      } else {
        next(Error("Some Error Occured"));
      }
    } else if (req.body.studentId) {
      const id = req.params.id;
      const teacherId = req.user?._id;
      const { studentId } = req.body;
      const updateRequest = await Requests.findByIdAndUpdate(
        { _id: id },
        { status: "CONNECTED" },
        { new: true }
      );
      const updateTutor = await Teacher.findOneAndUpdate(
        { userID: teacherId },
        { $push: { connections: studentId } }
      );
      const updateStudent = await Student.findOneAndUpdate(
        { userID: studentId },
        { $push: { connections: teacherId } }
      );
      if (updateRequest && updateStudent && updateTutor) {
        res.status(200).json({
          success: true,
          message: "Request accepted",
        });
      } else {
        next(Error("Some Error Occured"));
      }
    }
  }
);

/**
 * @disc    Delete requests
 * @route   POST /api/student/deleteRequest/:id
 * @access  private
 */
export const deleteRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deleteRequest = await Requests.findOneAndDelete({ _id: id });
    if (deleteRequest) {
      res.status(200).json({
        success: true,
        message: "Request Rejected",
      });
    } else {
      next(Error("Error Deleting the request"));
    }
  }
);

/**
 * @disc    get My tutors
 * @route   POST /api/student/mytutors
 * @access  private
 */
export const getAllMyTutors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.user?._id;
    const student = await Student.findOne(
      { userID: studentId },
      { connections: 1 }
    );
    const connectionsArray = student?.connections;
    const teachers = await Teacher.find(
      { userID: { $in: connectionsArray } },
      {
        name: 1,
        profile: 1,
        userID: 1,
        bio: 1,
      }
    );
    if (teachers) {
      res.status(200).json({
        success: true,
        teachers,
      });
    } else {
      next(Error("you have no tutors yet"));
    }
  }
);
